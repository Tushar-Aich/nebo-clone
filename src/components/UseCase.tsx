import { BookOpen, Briefcase, GraduationCap, PenTool } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BorderBeam } from './magicui/border-beam'

const usecases = [
    {
        id: 1,
        title: 'Students',
        subtitle: 'Taking lecture notes',
        description: 'Captures lectures, organize study materials, and sync across devices for seamless learning.',
        icon: <GraduationCap />
    },
    {
        id: 2,
        title: 'Professionals',
        subtitle: 'Taking tasks and meetings',
        description: 'Boost productivity with organized notes, making work seamless and efficient.',
        icon: <Briefcase />
    },
    {
        id: 3,
        title: 'Writers',
        subtitle: 'Brainstorming ideas',
        description: 'Collect inspiration, outline stories, and develop creative concepts in one organized space.',
        icon: <PenTool />
    },
    {
        id: 4,
        title: 'Personal',
        subtitle: 'Journaling',
        description: 'Record daily thoughts, track goals, and maintain a private digital diary with ease.',
        icon: <BookOpen />
    }
]

const UseCase = () => {
  return (
    <div className='bg-blue-100 dark:bg-gray-900 py-20 w-screen px-2' id='usecase'>
        <div className='space-y-4'>
            <h1 className='md:text-5xl text-xl font-bold font-mono text-center'>Perfect for every note-taker</h1>
            <h1 className='w-full text-sm md:text-lg text-neutral-600 dark:text-gray-400 text-center mt-2'>Whether you're studying, working, or creating. Scriblio adapts to your unique note-taking style.</h1>
            <div className='grid md:grid-cols-2 max-w-4xl h-full w-full mx-auto md:gap-10 px-8'>
                {usecases.map((usecase) => (
                    <div key={usecase.id}>
                        <Card className='hover:shadow-lg mt-5 bg-gray-300/10 backdrop-blur-md overflow-hidden '>
                            <CardHeader>
                                <div className='w-fit p-4 mx-auto bg-blue-500/30 rounded-lg text-blue-600 dark:text-gray-300'>
                                    {usecase.icon}
                                </div>
                            </CardHeader>
                            <CardTitle className='text-2xl font-bold font-mono text-center -mt-2'>
                                {usecase.title}
                            </CardTitle>
                            <CardTitle className='text-lg font-bold font-mono -mt-2 text-center'>
                                {usecase.subtitle}
                            </CardTitle>
                            <CardDescription className='text-md text-neutral-600 dark:text-gray-400 font-mono px-2 text-center -mt-2'>
                                {usecase.description}
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
    </div>
  )
}

export default UseCase