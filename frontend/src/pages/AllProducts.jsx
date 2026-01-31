import React from 'react'
import Navbar from '../components/Navbar'
import HeroAP from '../components/HeroAP'
import Products from '../components/Products'
import Review from '../components/Review'
import Footer from '../components/Footer'


const AllProducts = () => {
  return (
    <div className='relative mx-3'>
        {/* <Navbar/> */}
        <HeroAP/>
        <Products/>
        <Review/>
        {/* <Footer/> */}
    </div>
  )
}

export default AllProducts