import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const CTA = () => {
  return (
    <div className='w-screen py-20 bg-blue-700 flex flex-col justify-center items-center space-y-8 text-white'>
        <div className='flex justify-center items-center px-6 md:px-8 py-2 rounded-full bg-blue-400/50 gap-2 shadow-lg'>
            <Sparkles className='h-5 w-5'/>
            <h1 className='md:text-xl text-lg font-bold font-mono'>Start your journey today.</h1>
        </div>
        <h1 className='md:text-5xl text-2xl font-bold font-mono'>Start taking smarter notes today</h1>
        <h1 className='w-full max-w-2xl text-lg font-mono text-center'>Join thousands of users who have transformed their note-taking with Scriblio. Sign up and get organized in minutes.</h1>
        <Button className='flex justify-center items-center font-mono text-xl cursor-pointer'>Get Started Free <ArrowRight /></Button>
        <div className='flex flex-col md:flex-row justify-center items center md:gap-10'>
            <h1 className='flex items-center gap-2'>
                <p className='text-green-500 text-3xl font-bold'>•</p>
                <span className='font-mono font-bold text-lg text-gray-300'>Free forever plan</span>
            </h1>
            <h1 className='flex items-center gap-2'>
                <p className='text-green-500 text-3xl font-bold'>•</p>
                <span className='font-mono font-bold text-lg text-gray-300'>No credit card required</span>
            </h1>
            <h1 className='flex items-center gap-2'>
                <p className='text-green-500 text-3xl font-bold'>•</p>
                <span className='font-mono font-bold text-lg text-gray-300'>Setup in under 2 minutes</span>
            </h1>
        </div>
    </div>
  )
}

export default CTA