#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkCrossStackParamsStack } from '../lib/aws-cdk-cross-stack-params-stack';

const app = new cdk.App();
new AwsCdkCrossStackParamsStack(app, 'AwsCdkCrossStackParamsStack');
