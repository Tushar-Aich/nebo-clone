"use client"
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle() {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }
  return (
    <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className='rounded-full border-1 border-transparent bg-transparent hove:bg-transparent'
    >
        {theme === 'dark' ? <Sun className='text-white' /> : <Moon className='text-gray-800' />}
    </Button>
  )
}

export default ThemeToggle