import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroAP from '../components/HeroAP'
import Products from '../components/Products'
import Review from '../components/Review'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'


const AllProducts = () => {
  const navigate=useNavigate()
    useEffect(()=>{
      const isAdmin=localStorage.getItem("isAdmin")
      if (isAdmin){
        navigate("/admin")
      }
    },[])
  return (
    <div className='relative mx-3'>
        <Navbar/>
        <HeroAP/>
        <Products/>
        <Review/>
        {/* <Footer/> */}
    </div>
  )
}

export default AllProducts