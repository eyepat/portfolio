import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/fonts.css';
import '../styles/base.css';
import '../styles/animations.css';
import '../styles/components.css';
import { applyTheme, getSavedTheme } from '../components/ThemeSwitcher/themes';
import { Archivon } from './Archivon';

applyTheme(getSavedTheme());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Archivon />
  </StrictMode>
);
