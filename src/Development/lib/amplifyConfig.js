import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  API: {
    endpoints: [
      {
        name: 'main',
        endpoint: 'https://ozmwa310vk.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-1',
       
      }
    ]
  }
};

Amplify.configure(amplifyConfig); 