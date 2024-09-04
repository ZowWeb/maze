import React from 'react'
import Maze from './components/Maze'
import ThemeToggle from './components/ThemeToggle'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4 transition-colors">
        <h1 className="text-3xl font-bold mb-8">Maze Drawer</h1>
        <ThemeToggle />
        <Maze />
      </div>
    </ThemeProvider>
  )
}

export default App
