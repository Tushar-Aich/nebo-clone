import { FileText, Tags, Search, Cloud, Palette, Zap, Shield, Bot, Sparkles,  } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { BorderBeam } from './magicui/border-beam'

const features = [
    {
        id: 1,
        title: 'Rich Text Editing',
        description: 'Write with style using our powerful editor with formatting, tables, and media support.',
        icon: <FileText />
    },
    {
        id: 2,
        title: 'Smart Organization',
        description: 'Organize notes with tags, folders, and collections that make sense to you.',
        icon: <Tags />
    },
    {
        id: 3,
        title: 'Instant Search',
        description: 'Find any note in milliseconds with our lightning-fast full-text search.',
        icon: <Search />
    },
    {
        id: 4,
        title: 'Cloud Sync',
        description: 'Access your notes anywhere with seamless cloud synchronization.',
        icon: <Cloud />
    },
    {
        id: 5,
        title: 'Personalization',
        description: 'Customize your workspace with themes, layouts, and personal preferences.',
        icon: <Palette />
    },
    {
        id: 6,
        title: 'Quick Capture',
        description: 'Capture ideas instantly with keyboard shortcuts and mobile quick add features.',
        icon: <Zap />
    },
    {
        id: 7,
        title: 'AI Assistance',
        description: 'Enhance your notes with AI - circle to get solutions, search concepts, or turn scribbles into clean text.',
        icon: <Sparkles />
    },
    {
        id: 8,
        title: 'Security',
        description: 'Your notes are encrypted and secured. We never read or share your content.',
        icon: <Shield />
    }
]

const Features = () => {
  return (
    <div className='bg-blue-100 dark:bg-gray-900 py-20 w-screen px-2'>
        <h2 className='md:text-5xl text-xl font-bold font-mono text-center'>Everything you need to think clearly</h2>
        <p className='w-full text-sm md:text-lg text-neutral-600 dark:text-gray-400 text-center mt-2'>Powerful features designed to enhance your note-taking experience without getting in your way.</p>
        <div className='grid md:grid-cols-2 max-w-4xl mx-auto md:gap-10 px-8'>
            {features.map((feature) => (
                <div key={feature.id}>
                    <Card className='hover:shadow-lg mt-5 bg-gray-300/10 backdrop-blur-md overflow-hidden'>
                        <CardHeader>
                            <div className='w-fit p-4 bg-blue-500/30 rounded-lg text-blue-600 dark:text-gray-300'>
                                {feature.icon}
                            </div>
                        </CardHeader>
                        <CardContent className='text-2xl font-bold font-mono -mt-2'>
                            {feature.title}
                        </CardContent>
                        <CardDescription className='text-md text-neutral-600 dark:text-gray-400 font-mono px-6'>
                            {feature.description}
                        </CardDescription>
                        <BorderBeam 
                            duration={10}
                            size={200}
                            borderWidth={2}
                            className='from-transparent via-red-500 to-transparent'
                        />
                        <BorderBeam 
                            duration={10}
                            delay={5}
                            size={200}
                            borderWidth={2}
                            className='from-transparent via-blue-500 to-transparent'
                        />
                    </Card>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Features