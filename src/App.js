// src/App.js
import React from 'react';
import AppRouter from './router/index'; // หรือเส้นทางที่ถูกต้องตามโครงสร้างของคุณ

const App = () => {
  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App; // ต้องส่งออก App เป็น default
