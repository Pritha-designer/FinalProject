import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
const container = document.getElementById('root');
if (!container._reactRootContainer) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
     <CartProvider>
    <App />
  </CartProvider>
    </React.StrictMode>
  );
}

reportWebVitals();


