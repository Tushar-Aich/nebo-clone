import { Heart } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-screen py-3 bg-gray-950 flex justify-center items-center gap-2 font-serif text-gray-200'>
        <h1 className='font-bold text-xl'>Made with</h1>
        <Heart className='text-red-500 h-5 w-5' fill='#fb2c36'/>
        <h1 className='font-bold text-xl'>for community by Tushar.</h1>
    </div>
  )
}

export default Footer