import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/Theme/ThemeContext.tsx'; // Importer le provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider> {/* Englober App avec le ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);