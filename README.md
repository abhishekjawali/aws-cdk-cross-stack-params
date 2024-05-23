# Sample project to showcase sharing output from one stack to another stack

## Pre-requisite
 - AWS CDK
 - Node
 - Docker running

## Deploy the stacks. 
First SampleS3Stack will be deployed, that will output the name of S3 bucket. Second stack will then be deployed which will create the Lambda function that will output the name of S3 bucket. Second stack will pick the name of S3 bucket from output variable of SampleS3Stack 

```
cdk synth
cdk deploy SampleS3Stack
cdk deploy AwsCdkCrossStackParamsStack
```

