import React, { useEffect } from 'react'
import Cart from '../components/Cart'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const navigate=useNavigate()
      useEffect(()=>{
        const isAdmin=localStorage.getItem("isAdmin")
        if (isAdmin){
          navigate("/admin")
        }
      },[])
  return (
    <div>
      <Navbar/>
      <Cart/>
    </div>
  )
}

export default CartPage