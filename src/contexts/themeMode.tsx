import React, { useState, createContext } from 'react'

type Theme = 'dark' | 'light'

interface ThemeModeContextProps {
  theme: Theme
  hadleToggleTheme(): void
}

const ThemeModeContext = createContext<ThemeModeContextProps>({} as ThemeModeContextProps)

const ThemeModeProvider: React.FC = ({ children }) => {
  const defaultTheme: Theme = 'light'

  const [theme, setTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('@rentalBucket:theme') as Theme

    return storagedTheme || defaultTheme
  })

  const hadleToggleTheme = () => {
    const toggledTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(toggledTheme)
    
    localStorage.setItem('@rentalBucket:theme', String(toggledTheme))
  }

  return (
    <ThemeModeContext.Provider value={{ hadleToggleTheme, theme }} >
      {children}
    </ThemeModeContext.Provider>
  )
}

export { ThemeModeContext, ThemeModeProvider }