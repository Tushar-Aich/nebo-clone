import React from 'react'
import SpotlightCard from './ui/SpotlightCard'
import { useTheme } from 'next-themes'
import { CircleCheck, TriangleAlert } from 'lucide-react'

const Problem = () => {
  const {theme} = useTheme()
  return (
    <div className='h-screen lg:h-[70vh] w-screen flex flex-col items-center bg-blue-100 dark:bg-gray-900'>
        <h1 className="text-xl md:text-5xl font-bold font-mono mt-2 ">Stop fighting with your notes.</h1>
        <div className='flex flex-col lg:flex-row animate-in duration-200 w-full justify-around mt-14 space-y-4 space-x-2 px-1'>
            <SpotlightCard
              className='text-black dark:text-white bg-gray-200/40 dark:bg-gray-700/70 backdrop-blur-md shadow-lg'
              spotlightColor={theme === 'dark' ? 'rgba(251, 44, 54, 0.5)' : 'rgba(251, 44, 54, 0.6)'}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-red-200 rounded-full flex justify-center items-center">
                  <TriangleAlert className='text-red-500 h-6 w-6'/>
                </div>
                <h1 className="font-bold font-mono text-3xl">Problem</h1>
              </div>
              <div className='mt-5 space-y-3 md:text-xl font-bold font-mono '>
                <h1>• Scattered notes across multiple apps and platforms</h1>
                <h1>• Can't find what you wrote when you need it most</h1>
                <h1>• Complex interfaces that get in the way of thinking</h1>
                <h1>• No proper organization or tagging system</h1>
                <h1>• Lost ideas due to proper synchronization</h1>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className='text-black dark:text-white bg-gray-200/40 dark:bg-gray-700/70 backdrop-blur-md shadow-lg'
              spotlightColor={theme === 'dark' ? 'rgba(66, 153, 225, 0.5)' : 'rgba(66, 153, 225, 0.6)'}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-blue-200 rounded-full flex justify-center items-center">
                  <CircleCheck className='text-blue-500 h-6 w-6'/>
                </div>
                <h1 className="font-bold font-mono text-3xl">Solution</h1>
              </div>
              <div className='mt-5 space-y-3 md:text-xl font-bold font-mono '>
                <h1>• One unified workspace for all your thoughts</h1>
                <h1>• Powerful search that finds anything istantly</h1>
                <h1>• Clean, distraction-free writing environment</h1>
                <h1>• Smart tagging and folder orgaization</h1>
                <h1>• Keep your notess safe and synced across all your devices</h1>
              </div>
            </SpotlightCard>
        </div>
    </div>
  )
}

export default Problem