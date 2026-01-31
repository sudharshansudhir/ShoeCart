import React from 'react'
import hero_video from "/Hero-section.mp4"
import { Link } from 'react-router-dom'
import useNewCon from '../Context'

const Hero = () => {
    return (
    <div className='relative w-full h-screen'>
        {/* <img src="" alt="" /> */}
        <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"> <source src={hero_video} type="video/mp4" />Your browser does not support the video tag.</video>
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Step Into The Future</h1>
          <p className="text-lg md:text-xl max-w-xl mb-6">
            Discover the next generation of footwear. Unrivaled comfort, cutting-edge design, and sustainable innovation.
          </p>
          <Link to="/products" className="bg-black hover:bg-black/90 hover:scale-110 text-yellow-500 border-1 border-yellow-500 px-6 py-3 rounded-full font-semibold">
            Explore Collection
          </Link>
  </div>
    </div>
  )
}

export default Hero