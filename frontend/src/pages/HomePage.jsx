import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Testimonial from '../components/Testimonial'
import Latest from '../components/Latest'
import Review from '../components/Review'
import Footer from '../components/Footer'
import HomeProducts from '../components/HomeProducts'

const HomePage = () => {
  return (
    <div className='relative mx-3'>
      {/* <Navbar/> */}
      <Hero/>
      <HomeProducts/>
      <Testimonial/>
      <Review/>
      {/* <Footer/> */}
    </div>
  )
}

export default HomePage