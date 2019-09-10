import * as functions from 'firebase-functions';
import fetch from 'node-fetch';

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
    await fetch('https://api-dev.hapihourapp.com/healthcheck');
  });
