import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class AwsCdkCrossStackParamsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const importedBucketValue = cdk.Fn.importValue('s3-bucket-name');
    console.log('importedBucketValue 👉', importedBucketValue.toString());

    const myFunction = new NodejsFunction(this, 'my-function', {
      // 👇 Pass the imported bucket name as env var
      environment: {
        BUCKET_NAME: importedBucketValue.toString(),
      },
      runtime: lambda.Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(10),
      handler: 'main',
      entry: path.join(__dirname, `/../src/sample-lambda/index.js`),
    });

  }
}

export class S3BucketStack extends Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const sampleBucket = new s3.Bucket(this, 'sampleBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      enforceSSL: true,
    });

    // 👇 export myBucket for cross-stack reference
    new cdk.CfnOutput(this, 'sampleBucketRef', {
      value: sampleBucket.bucketName,
      description: 'Amazon S3 bucket name',
      exportName: 's3-bucket-name',
    });
  }
}
