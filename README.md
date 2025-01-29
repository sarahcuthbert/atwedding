# Wedding Website

Written in React + TypeScript + Vite

To be hosted on AWS with integration into Google Sheets.

### Running front end locally

`pnpm install`

`pnpm dev`

### Running tests

`pnpm test`

### Running server locally

There is an express server to facilitate a connection with google sheets securely

To run this locally:

`cd server`

`pnpm install`

`pnpm dev`

Note: there are no tests for this due to google integration being the majority

### Deploying and other setup

Build FE ready for S3  
`pnpm build`

Zip backend ready for lambda  
`zip -r backend.zip .server`

Configure aws credentials with AWS CLI  
`aws configure`

Download necessary dependencies  
`terraform init`

Check plan  
`terraform plan`

Apply changes  
`terraform apply`

#### TODO

- check if terraform actually works?
- check path to dist is correct in tf
- get arn for acm ( `aws acm list-certificates --region us-east-1
` )
- upload parameters to AWS
- FAQ page details
- Update Event Details
- Update Schedule
