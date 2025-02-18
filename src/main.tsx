import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from './context/CartProvider.tsx'
import { AlbumsProvider } from './context/AlbumsProvider.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AlbumsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AlbumsProvider>
    </BrowserRouter>
  </StrictMode>,
)
