import React from 'react'
import Navbar from '../Home/Navbar'
import HeroAP from './HeroAP'
import Products from './Products'
import Review from '../Home/Review'
import Footer from '../Home/Footer'


const AllProducts = () => {
  return (
    <div className='relative mx-3'>
        <Navbar/>
        <HeroAP/>
        <Products/>
        <Review/>
        <Footer/>
    </div>
  )
}

export default AllProducts