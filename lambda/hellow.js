// write a lambda function which reads number of files from s3 bucket
// and returns the count of files
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
exports.handler = async (event) => {
    const bucketParams = {
        Bucket: event.BUCKET_NAME
    };
    const data = await s3.listObjectsV2(bucketParams).promise();
    const count = data.Contents.length;
    return {
        statusCode: 200,
        body: JSON.stringify(count)
    }

}