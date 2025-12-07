'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      <Sun className="w-5 h-5 absolute inset-0 m-auto transition-opacity duration-300 dark:opacity-0 dark:rotate-90" />
      <Moon className="w-5 h-5 absolute inset-0 m-auto transition-opacity duration-300 opacity-0 dark:opacity-100 dark:rotate-0 rotate-90" />
    </button>
  )
}

