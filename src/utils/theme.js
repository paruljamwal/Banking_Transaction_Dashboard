import { THEME } from '@constants/theme'

/**
 * @returns {'light' | 'dark'}
 */
export function getInitialTheme() {
  const stored = localStorage.getItem(THEME.STORAGE_KEY)
  if (stored === THEME.LIGHT || stored === THEME.DARK) {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME.DARK
    : THEME.LIGHT
}

/**
 * @param {'light' | 'dark'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME.STORAGE_KEY, theme)
}
