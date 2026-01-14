import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfig transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}>
      <BrowserRouter basename="/tenney-web">
        <App />
      </BrowserRouter>
    </MotionConfig>
  </React.StrictMode>
);
