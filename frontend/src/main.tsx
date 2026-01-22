/**
 * main.tsx - Application Entry Point
 * 
 * The simplest possible entry file.
 * All logic lives in app/ folder.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
