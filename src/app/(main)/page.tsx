"use client"

import CTA from '@/components/CTA'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Problem from '@/components/Problem'
import { Button } from '@/components/ui/button'
import RotatingText from '@/components/ui/RotatingText'
import SplitText from '@/components/ui/SplitText'
import UseCase from '@/components/UseCase'
import { MoveRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const {theme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) {
    return <h1 className="text-8xl font-bold text-center">Scriblio</h1>;
  }

  return (
    <div>
      <div className='h-screen w-screen flex flex-col items-center justify-center bg-blue-100 dark:bg-gray-900 space-y-4 md:space-y-6'>
          <div className="flex items-center gap-6">
            <img
              src='Scriblio.png'
              alt='logo'
              className='h-16 md:h-32 w-16 md:w-32 object-contain rounded-lg'
            />
            <SplitText
              text="Scriblio"
              className={`md:text-8xl text-6xl font-bold text-center font-serif ${theme === 'dark' ? 'text-cyan-500' : 'text-cyan-700'}`}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center" 
            />
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-bold font-mono md:text-6xl text-4xl text-center">Take notes</h1>
            <RotatingText
              texts={["effortlessly", "seamlessly", "beautifully", "smartly"]}
              mainClassName={`md:text-6xl text-4xl font-bold text-center font-mono text-white px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-700'}`}
              staggerFrom={'last'}
              initial={{y: '100%'}}
              animate={{y: 0}}
              exit={{y: '-120%'}}
              staggerDuration={0.025}
              splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
              transition={{type: 'spring', damping: 30, stiffness: 400}}
              rotationInterval={2500}
            />
          </div>
          <h1 className='text-center px-5 md:text-2xl max-w-3xl text-lg text-accent-foreground font-mono font-medium'>Capture, organize, and find your thoughts instantly. The note-taking app designed for modern thinkers who value clarity and efficiency.</h1>
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
            <Button className='text-xl font-semibold font-mono px-4 py-3 bg-sky-600 text-white hover:bg-sky-700 hover:text-gray-200'>
              <Link
                href="/sign-in"
                className='flex gap-2 items-center'
              >
                Get Started Free <MoveRight />
              </Link>
            </Button>
            <Button className='text-xl font-semibold font-mono px-4 py-3'>
              <Link
                href="#usecase"
                className='flex gap-2 items-center'
                scroll={true}
              >
                Know Use Cases <MoveRight />
              </Link>
            </Button>
          </div>
          <h1 className='text-muted-foreground font-mono'>No credit card required. Free forever plan available.</h1>
      </div>
      <Problem />
      <Features />
      <UseCase />
      <CTA />
      <Footer />
    </div>
  )
}

export default Home