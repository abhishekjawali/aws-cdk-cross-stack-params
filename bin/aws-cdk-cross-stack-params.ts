#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkCrossStackParamsStack, S3BucketStack } from '../lib/aws-cdk-cross-stack-params-stack';

const app = new cdk.App();
new AwsCdkCrossStackParamsStack(app, 'AwsCdkCrossStackParamsStack');

new S3BucketStack(app, "SampleS3Stack");
