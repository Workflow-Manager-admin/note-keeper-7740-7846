import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Components are imported inside App.js; nothing further needed.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
