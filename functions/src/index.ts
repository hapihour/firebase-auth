import * as functions from 'firebase-functions';
import * as AWS from 'aws-sdk';

const aws = functions.config().aws;
const accessKeyId = aws.access_key_id;
const secretAccessKey = aws.secret_access_key;
const region = aws.region;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions
  .region('asia-east2')
  .https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
  });

export const userCreated = functions
  .region('asia-east2')
  .auth.user()
  .onCreate(async user => {
    const message = {
      id: user.uid,
      email: user.providerData[0].email,
      photoUrl: user.photoURL
    }

    const params = {
      Message: JSON.stringify(message),
      TopicArn: aws.sns_test_sns_arn,
    };

    const publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'})
      .publish(params)
      .promise();

    try {
      await publishTextPromise;
      console.log('success!');
    } catch {
      console.log('publishing to sns failed!');
    }
  });
