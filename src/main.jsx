import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Amplify } from "aws-amplify";
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: import.meta.env.REACT_APP_STAGE === "PROD" ? "us-east-1" : "us-east-2",
    userPoolId:
      import.meta.env.REACT_APP_STAGE === "PROD"
        ? import.meta.env.REACT_APP_PROD_USER_POOL_ID
        : import.meta.env.REACT_APP_DEV_USER_POOL_ID,
    identityPoolId:
      import.meta.env.REACT_APP_STAGE === "PROD"
        ? import.meta.env.REACT_APP_PROD_IDENTITY_POOL_ID
        : import.meta.env.REACT_APP_DEV_IDENTITY_POOL_ID,
    userPoolWebClientId:
      import.meta.env.REACT_APP_STAGE === "PROD"
        ? import.meta.env.REACT_APP_PROD_CLIENT_ID
        : import.meta.env.REACT_APP_DEV_CLIENT_ID,
    oauth: {
      responseType: "token",
    },
  },
  Storage: {
    region: "us-east-1",
    bucket: "institution-utils",
    identityPoolId:
      import.meta.env.REACT_APP_STAGE === "PROD"
        ? "us-east-1:a68cac30-d7f7-4f73-9b1f-ca6a4f86eba6"
        : "us-east-1:a68cac30-d7f7-4f73-9b1f-ca6a4f86eba6",
    additionalIdentityPoolId: "us-east-2:9b1fda39-3231-4606-b32f-7ba24edcb53d",
  },
  API: {
    endpoints: [
      {
        name: "main",
        endpoint:
          import.meta.env.REACT_APP_STAGE === "PROD"
            ? "https://ozmwa310vk.execute-api.us-east-1.amazonaws.com/dev"
            : "https://ikticbkaxh.execute-api.us-east-2.amazonaws.com/dev",
        region:
          import.meta.env.REACT_APP_STAGE === "PROD" ? "us-east-1" : "us-east-2",
      },
    ],
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
