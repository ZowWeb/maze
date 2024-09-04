import React from 'react'

import { type Theme, themes, useTheme } from '../contexts/ThemeContext'

const ACTIVE_CLASS = 'bg-blue-500 text-white'
const INACTIVE_CLASS =
  'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'

const ThemeToggle: React.FC = () => {
  const { theme: currentTheme, setTheme } = useTheme()

  const handleThemeToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('handleThemeToggle', e)
    const target = e.target as HTMLButtonElement
    setTheme(target.id as Theme)
  }

  return (
    <div className="flex space-x-2 mb-4" onClick={handleThemeToggle}>
      {themes.map((theme) => (
        <button
          key={theme}
          id={theme}
          className={`px-3 py-1 rounded transition-colors' ${
            theme === currentTheme ? ACTIVE_CLASS : INACTIVE_CLASS
          }`}
        >
          {theme}
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle
