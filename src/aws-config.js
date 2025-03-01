import { Amplify } from 'aws-amplify';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'main',
        endpoint: import.meta.env.VITE_API_ENDPOINT ,
        region: import.meta.env.VITE_AWS_REGION,
      }
    ]
  }
}); 