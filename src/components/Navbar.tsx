"use client"

import { GitFork, Home, Info, LibraryBig, NotebookPen } from 'lucide-react'
import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

const links = [
    { label: 'Home', href: '/home', icon: (<Home className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Notes', href: '/notes', icon: (<NotebookPen className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Library', href: '/library', icon: (<LibraryBig className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Graph', href: '/graph', icon: (<GitFork className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Help', href: 'help', icon: (<Info className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) }
]

const Navbar = () => {
    const pathname = usePathname()
  return (
    <>
    {/* Mobile menu */}
    <div className='w-screen sticky top-0 bg-blue-100/60 dark:bg-gray-900/60 backdrop-blur-sm py-2 mt-0 shadow-sm px-2 flex justify-between md:hidden z-50'>
        <NavigationMenu>
            <NavigationMenuList>
                    <div>
                        <NavigationMenuItem>
                            <img src="/Scriblio.png" alt="Logo" className='h-8 w-8 rounded-full' />
                        </NavigationMenuItem>
                    </div>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList>
                <div className='flex space-x-3'>
                    {links.map((link) => (
                        <Link key={link.label} href={link.href} className={`hover:scale-110 hover:duration-300 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer link ${pathname === link.label ? 'active' : ''}`}>
                            {link.icon}
                        </Link>
                    ))}
                </div>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList>
                <div className='flex items-center space-x-2 pr-2 lg:space-x-5'>
                    <ThemeToggle />
                    <Button className='font-semibold cursor-pointer'>Sign in</Button>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
    
    {/* Desktop menu */}
    <div className='w-screen md:sticky top-0 bg-blue-100/60 dark:bg-gray-900/60 z-50 backdrop-blur-sm py-2 mt-0 shadow-sm px-4 md:flex justify-between hidden'>
        <NavigationMenu>
            <NavigationMenuList>
                    <div>
                        <NavigationMenuItem>
                            <h1 className='text-2xl font-bold'>Scriblio</h1>
                        </NavigationMenuItem>
                    </div>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList>
                <div className='flex space-x-8 lg:space-x-12'>
                    {links.map((link) => (
                        <Link key={link.label} href={link.href} className={`hover:scale-110 hover:duration-300 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer link ${pathname === link.label ? 'active' : ''}`}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList>
                <div className='flex items-center space-x-2 pr-2 lg:space-x-5'>
                    <ThemeToggle />
                    <Button className='font-semibold cursor-pointer'>Sign in</Button>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
    </>
  )
}

export default Navbar
