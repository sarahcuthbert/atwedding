terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-west-2" 
}

resource "aws_route53_zone" "my_domain" {
  name = "amyandtristanswedding.com"
}

resource "aws_lambda_function" "backend" {
  function_name    = "at-express-backend"
  role            = aws_iam_role.lambda_execution_role.arn
  handler         = "index.handler"
  runtime         = "nodejs18.x"
  filename        = "backend.zip"
  source_code_hash = filebase64sha256("backend.zip")

  environment {
    variables = {
      GOOGLE_SERVICE_ACCOUNT_KEY = aws_ssm_parameter.service_account_key.value
      GOOGLE_SPREADSHEET_ID = aws_ssm_parameter.google_spreasdheet_id.value
    }
  }
}

/* API gateway */
resource "aws_api_gateway_rest_api" "express_backend_api" {
  name        = "express-backend-api"
  description = "API Gateway for Express Backend"
}

resource "aws_api_gateway_resource" "api_root" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
  parent_id   = aws_api_gateway_rest_api.express_backend_api.root_resource_id
  path_part   = "api"
}

resource "aws_api_gateway_method" "api_get" {
  rest_api_id   = aws_api_gateway_rest_api.express_backend_api.id
  resource_id   = aws_api_gateway_resource.api_root.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "api_post" {
  rest_api_id   = aws_api_gateway_rest_api.express_backend_api.id
  resource_id   = aws_api_gateway_resource.api_root.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_integration_get" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
  resource_id = aws_api_gateway_resource.api_root.id
  http_method = aws_api_gateway_method.api_get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend.invoke_arn
}
resource "aws_api_gateway_integration" "lambda_integration_post" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
  resource_id = aws_api_gateway_resource.api_root.id
  http_method = aws_api_gateway_method.api_post
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend.invoke_arn
}

resource "aws_api_gateway_deployment" "backend_deploy" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
}

resource "aws_lambda_permission" "allow_apigateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.backend.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.express_backend_api.execution_arn}/*/*"
}

resource "aws_api_gateway_domain_name" "api_custom_domain" {
  domain_name = "api.amyandtristanswedding.com"
  regional_certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/your-cert-id" // need to replace once i have the arn
}

resource "aws_api_gateway_base_path_mapping" "api_mapping" {
  domain_name = aws_api_gateway_domain_name.api_domain.domain_name
  api_id = aws_api_gateway_rest_api.express_backend_api.id
}

resource "aws_route53_record" "api_dns" {
  zone_id = aws_route53_zone.my_domain.zone_id
  name    = "api.amyandtristanswedding.com"
  type    = "A"

  alias {
    name                   = aws_api_gateway_domain_name.api_custom_domain.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.api_custom_domain.cloudfront_zone_id
    evaluate_target_health = false
  }
}
# /* Lambda IAM Permissions */
resource "aws_iam_role" "lambda_execution_role" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.backend.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.express_backend_api.execution_arn}/*/*"
}

resource "aws_iam_policy" "ssm_read" {
  name        = "ssm-read-policy"
  description = "Allows Lambda to read SSM parameters"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["ssm:GetParameter", "ssm:GetParameters", "ssm:GetParametersByPath"]
      Resource = "arn:aws:ssm:*:*:parameter/backend/*"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_ssm" {
  policy_arn = aws_iam_policy.ssm_read.arn
  role       = aws_iam_role.lambda_execution_role.name
}


/*S3 for FE*/
resource "aws_s3_bucket" "frontend" {
  bucket = "at-frontend"

}

data "aws_iam_policy_document" "frontend_policy" {
  statement{

    principals {
      type = "AWS"
      identifiers = ["*"]
    }    

    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:ListBucket"
    ]

    resources = [
      aws_s3_bucket.frontend.arn ,
      "${aws_s3_bucket.frontend.arn}/*"
    ]
  }
}

resource "aws_s3_object" "frontend_object" {
  for_each = fileset("dist", "**/*")

  bucket = aws_s3_bucket.frontend.bucket
  key    = each.value
  source = "dist/${each.value}"
}

resource "aws_s3_bucket_policy" "frontend__bucket_policy" {
  bucket = aws_s3_bucket.frontend.id
  policy = data.aws_iam_policy_document.frontend_policy.json
}

resource "aws_s3_bucket_website_configuration" "frontend_config" {
  bucket = aws_s3_bucket.frontend.id
  index_document {
    suffix = "index.html"
  }
}


resource "aws_route53_record" "frontend_dns" {
  zone_id = aws_route53_zone.my_domain.zone_id
  name    = "amyandtristanswedding.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.b.bucket_regional_domain_name
    origin_id                = frontend.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases = ["amyandtristanswedding.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = frontend.s3_origin_id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:123456789012:certificate/your-cert-id" // need to replace
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"  }
}