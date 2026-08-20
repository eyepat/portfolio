import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles/fonts.css';
import './styles/base.css';
import './styles/animations.css';
import './styles/components.css';
import App from './App';
import { applyTheme, getSavedTheme } from './components/ThemeSwitcher/themes';

applyTheme(getSavedTheme());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
