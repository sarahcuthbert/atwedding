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

data "aws_route53_zone" "my_domain" {
  zone_id = "Z0725098TGCDDUYPXRXR"
}

data "aws_ssm_parameter" "google_client_id" {
  name = "google_client_id"
}

data "aws_ssm_parameter" "google_client_key" {
  name = "google_client_key"
}

data "aws_ssm_parameter" "google_spreadsheet_id" {
  name = "google_spreadsheet_id"
}

data "archive_file" "backend_zip" {
  type        = "zip"
  source_dir  = "../server/dist"
  output_path = "../server/backend.zip"
}

resource "aws_lambda_function" "backend" {
  function_name    = "at-express-backend"
  role             = aws_iam_role.lambda_execution_role.arn
  handler          = "server.handler"
  runtime          = "nodejs18.x"
  filename         = data.archive_file.backend_zip.output_path
  source_code_hash = data.archive_file.backend_zip.output_base64sha256

  environment {
    variables = {
      GOOGLE_CLIENT_ID      = data.aws_ssm_parameter.google_client_id.value
      GOOGLE_CLIENT_KEY     = data.aws_ssm_parameter.google_client_key.value
      GOOGLE_SPREADSHEET_ID = data.aws_ssm_parameter.google_spreadsheet_id.value
    }
  }
}

/* API gateway */
resource "aws_api_gateway_rest_api" "express_backend_api" {
  name        = "express-backend-api"
  description = "API Gateway for Express Backend"
}

resource "aws_api_gateway_resource" "invitees_root" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
  parent_id   = aws_api_gateway_rest_api.express_backend_api.root_resource_id
  path_part   = "invitees"
}

resource "aws_api_gateway_resource" "rsvp_root" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
  parent_id   = aws_api_gateway_rest_api.express_backend_api.root_resource_id
  path_part   = "rsvp"
}

resource "aws_api_gateway_method" "api_get" {
  rest_api_id   = aws_api_gateway_rest_api.express_backend_api.id
  resource_id   = aws_api_gateway_resource.invitees_root.id
  http_method   = "GET"
  authorization = "NONE"

  request_parameters = {
    "method.request.querystring.email" = true
  }
}

resource "aws_api_gateway_method" "api_post" {
  rest_api_id   = aws_api_gateway_rest_api.express_backend_api.id
  resource_id   = aws_api_gateway_resource.rsvp_root.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_integration_get" {
  rest_api_id             = aws_api_gateway_rest_api.express_backend_api.id
  resource_id             = aws_api_gateway_resource.invitees_root.id
  http_method             = aws_api_gateway_method.api_get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend.invoke_arn
}

resource "aws_api_gateway_integration" "lambda_integration_post" {
  rest_api_id             = aws_api_gateway_rest_api.express_backend_api.id
  resource_id             = aws_api_gateway_resource.rsvp_root.id
  http_method             = aws_api_gateway_method.api_post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend.invoke_arn
}

resource "aws_api_gateway_deployment" "backend_deploy" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id

  depends_on = [
    aws_api_gateway_method.api_get,
    aws_api_gateway_method.api_post,
    aws_api_gateway_integration.lambda_integration_get,
    aws_api_gateway_integration.lambda_integration_post
  ]

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_method.api_get,
      aws_api_gateway_method.api_post,
      aws_api_gateway_integration.lambda_integration_get,
      aws_api_gateway_integration.lambda_integration_post
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api_stage" {
  deployment_id = aws_api_gateway_deployment.backend_deploy.id
  rest_api_id   = aws_api_gateway_rest_api.express_backend_api.id
  stage_name    = "api"
}

# /* Lambda IAM Permissions */
resource "aws_iam_role" "lambda_execution_role" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = [
            "lambda.amazonaws.com",
            "apigateway.amazonaws.com"
          ]
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
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action = ["ssm:GetParameter", "ssm:GetParameters", "ssm:GetParametersByPath"]
        Resource = "arn:aws:ssm:*:*:parameter/backend/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_ssm" {
  policy_arn = aws_iam_policy.ssm_read.arn
  role       = aws_iam_role.lambda_execution_role.name
}

resource "aws_iam_policy_attachment" "lambda_AWSLambdaBasicExecutionRole_attachment" {
  name       = "lambda_AWSLambdaBasicExecutionRole_attachment"
  roles = [aws_iam_role.lambda_execution_role.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

/*S3 for FE*/
resource "aws_s3_bucket" "amy-tristan-wedding-frontend" {
  bucket = "amy-tristan-wedding-frontend"
}

resource "aws_s3_bucket_public_access_block" "fe_public_access" {
  bucket = aws_s3_bucket.amy-tristan-wedding-frontend.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "frontend_policy" {
  statement {

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
      aws_s3_bucket.amy-tristan-wedding-frontend.arn,
      "${aws_s3_bucket.amy-tristan-wedding-frontend.arn}/*"
    ]
  }
}

module "template_files" {
  source   = "hashicorp/dir/template"
  base_dir = "../dist"
}

resource "aws_s3_object" "frontend_object" {
  bucket   = aws_s3_bucket.amy-tristan-wedding-frontend.bucket
  for_each = module.template_files.files

  key          = each.key
  content_type = each.value.content_type

  source  = each.value.source_path
  content = each.value.content
  etag    = each.value.digests.md5
}

resource "aws_s3_bucket_policy" "frontend__bucket_policy" {
  bucket = aws_s3_bucket.amy-tristan-wedding-frontend.id
  policy = data.aws_iam_policy_document.frontend_policy.json
}

resource "aws_s3_bucket_website_configuration" "frontend_config" {
  bucket = aws_s3_bucket.amy-tristan-wedding-frontend.id
  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.amy-tristan-wedding-frontend.bucket_domain_name
    origin_id   = "primaryS3"
  }

  origin {
    domain_name = "${aws_api_gateway_rest_api.express_backend_api.id}.execute-api.eu-west-2.amazonaws.com"
    origin_id   = "apiGateway"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }


  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases = ["www.amyandtristanswedding.com", "amyandtristanswedding.com"]

  default_cache_behavior {
    allowed_methods = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "primaryS3"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:829426453615:certificate/15b71d99-9a2f-4d51-8ca3-4e93207e54c4"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }


  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods = ["HEAD", "GET", "OPTIONS"]
    target_origin_id = "apiGateway"

    forwarded_values {
      query_string = true
      headers = ["Origin"]
      cookies {
        forward = "all"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_100"

  custom_error_response {
    error_code         = "404"
    response_page_path = "/index.html"
    response_code      = 200
  }
}

resource "aws_route53_record" "frontend_dns" {
  zone_id = data.aws_route53_zone.my_domain.zone_id
  name    = "amyandtristanswedding.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_frontend_dns" {
  zone_id = data.aws_route53_zone.my_domain.zone_id
  name    = "www.amyandtristanswedding.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}