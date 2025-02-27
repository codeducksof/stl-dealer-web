// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // ใช้ react-dom/client สำหรับ React 18
import App from './App'; 
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // สร้าง root
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
