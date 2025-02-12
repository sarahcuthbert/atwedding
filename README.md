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

Build FE ready for S3 without dev deps
`pnpm build` 
Push code change to S3 without infra change:
`aws s3 sync dist/ s3://amy-tristan-wedding-frontend --delete`

Build backend ready for lambda (terraform codes zips it up)
`pnpm build`

Configure aws credentials with AWS CLI  
`aws configure`

Download necessary dependencies  
`terraform init`

Check plan  
`terraform plan`

Apply changes  
`terraform apply`

If changes aren't reflecting on distribution:  
`aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"`

