import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './NewLeafOasis' // or your root component

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/NewLeafOasis">
    <App />
  </BrowserRouter>
)
