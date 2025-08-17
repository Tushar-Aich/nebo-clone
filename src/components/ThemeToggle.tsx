"use client"

import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle() {
    const {theme, setTheme} = useTheme()
  return (
    <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className='rounded-full border-1 border-transparent bg-white dark:bg-black'
    >
        {theme === 'dark' ? <Sun className='text-yellow-500' /> : <Moon className='text-gray-500' />}
    </Button>
  )
}

export default ThemeToggle