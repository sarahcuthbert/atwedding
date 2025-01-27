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
  region = "eu-west-2"  # Adjust to your preferred region
}

/* Lambda for backend */
resource "aws_lambda_function" "express_backend" {
  filename         = "lambda/express-backend.zip"  # Path to your packaged Lambda code
  function_name    = "express-backend"
  role             = aws_iam_role.lambda_execution_role.arn
  handler          = "app.handler"  # The handler defined in your Lambda function
  runtime          = "nodejs16.x"   # Adjust Node.js version as needed
  timeout          = 10
  memory_size      = 128
  environment {
    variables = {
      MY_SECRET = var.my_secret  # Set secret here (or use Secrets Manager)
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

resource "aws_api_gateway_resource" "secret" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
  parent_id   = aws_api_gateway_resource.api_root.id
  path_part   = "secret"
}

resource "aws_api_gateway_method" "secret_get" {
  rest_api_id   = aws_api_gateway_rest_api.express_backend_api.id
  resource_id   = aws_api_gateway_resource.secret.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "secret_lambda" {
  rest_api_id = aws_api_gateway_rest_api.express_backend_api.id
  resource_id = aws_api_gateway_resource.secret.id
  http_method = aws_api_gateway_method.secret_get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${aws_lambda_function.express_backend.arn}/invocations"
}

resource "aws_lambda_permission" "allow_apigateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.express_backend.function_name
  principal     = "apigateway.amazonaws.com"
}

/* Lambda IAM Permissions */
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

resource "aws_iam_policy" "lambda_secrets_manager_policy" {
  name        = "LambdaSecretsManagerPolicy"
  description = "Policy for Lambda to read secrets from Secrets Manager"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "secretsmanager:GetSecretValue"
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = aws_iam_policy.lambda_secrets_manager_policy.arn
}


/*S3 for FE*/
resource "aws_s3_bucket" "react_frontend" {
  bucket = "my-react-frontend-bucket"
  acl    = "public-read"

  website {
    index_document = "index.html"
    # error_document = "error.html" # Optional, if you have an error page
  }
}