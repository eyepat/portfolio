export const THEMES = [
  { name: 'Teal',   accent: '0, 229, 204',   accent2: '99, 102, 241'  },
  { name: 'Violet', accent: '167, 139, 250', accent2: '34, 211, 238'  },
  { name: 'Amber',  accent: '251, 191, 36',  accent2: '251, 113, 133' },
  { name: 'Rose',   accent: '251, 113, 133', accent2: '167, 139, 250' },
];

export function applyTheme(index) {
  const t = THEMES[index] ?? THEMES[0];
  const root = document.documentElement;
  root.style.setProperty('--accent-rgb', t.accent);
  root.style.setProperty('--accent2-rgb', t.accent2);
  window.dispatchEvent(new CustomEvent('themechange'));
}

export function getSavedTheme() {
  const i = parseInt(localStorage.getItem('accent-theme') ?? '0', 10);
  return Number.isInteger(i) && i >= 0 && i < THEMES.length ? i : 0;
}
