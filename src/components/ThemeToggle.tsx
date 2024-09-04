import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-3 py-1 rounded transition-colors ${
          theme === 'light'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button
        className={`px-3 py-1 rounded transition-colors ${
          theme === 'dark'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
      <button
        className={`px-3 py-1 rounded transition-colors ${
          theme === 'auto'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}
        onClick={() => setTheme('auto')}
      >
        Auto
      </button>
    </div>
  )
}

export default ThemeToggle
