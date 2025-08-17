"use client"

import { Home, Info, LayoutTemplate, LibraryBig, Navigation, NotebookPen, User } from 'lucide-react'
import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

const links = [
    { label: 'Home', href: '/', icon: (<Home className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Notes', href: '/notes', icon: (<NotebookPen className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Library', href: '/library', icon: (<LibraryBig className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Templates', href: '/templates', icon: (<LayoutTemplate className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) },
    { label: 'Help', href: 'help', icon: (<Info className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />) }
]

const Navbar = () => {
    const pathname = usePathname()
  return (
    <>
    {/* Mobile menu */}
    <div className='flex justify-center mt-2 z-20 md:hidden'>
        <NavigationMenu>
            <NavigationMenuList>
                <div className="flex items-center justify-between border-1 border-black dark:border-gray-300 space-x-10 rounded-full bg-transparent backdrop-blur-md">
                    <div>
                        <NavigationMenuItem>
                            <img src="/Scriblio.png" alt="Logo" className='h-10 w-10 rounded-full' />
                        </NavigationMenuItem>
                    </div>
                    <div className='flex space-x-5'>
                        {links.map((link) => (
                            <Link key={link.label} href={link.href}>
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                    <div className='flex items-center space-x-2 pr-2'>
                        <ThemeToggle />
                        <User className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer' />
                    </div>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
    
    {/* Desktop menu */}
    <div className='w-screen bg-transparent backdrop-blur-md py-2 mt-0 shadow-sm px-4 md:flex justify-between hidden'>
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
