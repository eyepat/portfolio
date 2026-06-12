/* photoHue: hue-rotate offset that shifts the photo's baked-in teal grade
   (~173deg) to this theme's accent hue */
export const THEMES = [
  { name: 'Teal',   accent: '0, 229, 204',   accent2: '99, 102, 241',  photoHue: '0deg'    },
  { name: 'Violet', accent: '167, 139, 250', accent2: '34, 211, 238',  photoHue: '82deg'   },
  { name: 'Amber',  accent: '251, 191, 36',  accent2: '251, 113, 133', photoHue: '-130deg' },
  { name: 'Rose',   accent: '251, 113, 133', accent2: '167, 139, 250', photoHue: '178deg'  },
];

export function applyTheme(index) {
  const t = THEMES[index] ?? THEMES[0];
  const root = document.documentElement;
  root.style.setProperty('--accent-rgb', t.accent);
  root.style.setProperty('--accent2-rgb', t.accent2);
  root.style.setProperty('--photo-hue', t.photoHue);
  window.dispatchEvent(new CustomEvent('themechange'));
}

export function getSavedTheme() {
  const i = parseInt(localStorage.getItem('accent-theme') ?? '0', 10);
  return Number.isInteger(i) && i >= 0 && i < THEMES.length ? i : 0;
}
