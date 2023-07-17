import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {aws_s3 as s3} from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DemoCdkStack extends cdk.Stack {

   /** allows accessing the counter function */
   public readonly handler: lambda.Function;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // write a function to create a bucket
    const bucket = new s3.Bucket(this, 'DemoCdkBucket', {
     // bucketName: 'demo-cdk-bucket-06072023-2022',
      //versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
      
    });

    //function to create a vpc
    const vpc = new cdk.aws_ec2.Vpc(this, 'DemoCdkVpc', {
      natGateways: 1,
    });

    // function for AWS Lambda
    const hellow = new lambda.Function(this, 'DemoCdkLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hellow.handler',
      environment: {
        BUCKET_NAME: bucket.bucketName,
        VPC_ID: vpc.vpcId
      }
    });

    bucket.grantRead(hellow);
    

  }
}
