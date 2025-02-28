import React from 'react';
import ReactDOM from 'react-dom/client';
import './lib/amplifyConfig'; // Import Amplify configuration
import App from './App';
import './index.css';
import { DataProvider } from './context/context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
