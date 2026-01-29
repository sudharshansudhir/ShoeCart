import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Testimonial from './Testimonial'
import Latest from './Latest'
import Review from './Review'
import Footer from './Footer'

const HomePage = () => {
  return (
    <div className='relative mx-3'>
      <Navbar/>
      <Hero/>
      <Testimonial/>
      <Latest/>
      <Review/>
      <Footer/>
    </div>
  )
}

export default HomePage