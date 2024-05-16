import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import App from './App.jsx';
import './index.css';
import './output.css';
import AuthProvider from './providers/AuthProvider';
import ProfileProvider from './providers/ProfileProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
