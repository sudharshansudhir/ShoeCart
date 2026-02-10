import React from 'react'
import logo from "/ShoeCart-logo.jpg"
import { Link, useNavigate } from 'react-router-dom'


const AdminNavbar = () => {
    const navigate=useNavigate()
  return (
    <div>
        <div className='flex w-full bg-gray-900 text-yellow-400 text-3xl m-0 p-4 z-10 flex-row justify-between'>
        <div className='shoecart-logo'>
            <Link to="/">
            <img src={logo} alt="ShoeCart" className='mt-4 md:mt-0 h-6 md:h-10' /></Link>
        </div>
        <div>
            Admin Dashboard
        </div>
        <div>
            <button onClick={()=>{localStorage.clear(),navigate("/login")}} className='px-4 py-2 text-[18px] bg-yellow-400 border-1 text-black border-black rounded-md hover:scale-105 hover:bg-yellow-500'>Logout</button>
        </div>
        </div>
    </div>
  )
}

export default AdminNavbar