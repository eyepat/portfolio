import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import './styles/fonts.css';
import './styles/base.css';
import './styles/animations.css';
import './styles/components.css';
import App from './App';
import { applyTheme, getSavedTheme } from './components/ThemeSwitcher/themes';

applyTheme(getSavedTheme());
inject();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
