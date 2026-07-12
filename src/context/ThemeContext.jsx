import { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import { THEME } from '@constants/theme'
import { getInitialTheme, applyTheme } from '@utils/theme'

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((nextTheme) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) =>
      prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
    )
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === THEME.DARK,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
