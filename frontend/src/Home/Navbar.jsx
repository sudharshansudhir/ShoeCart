import React from 'react'
import logo from "/ShoeCart-logo.jpg"
import {NavLink,Link} from "react-router-dom"
import useNewCon from '../Context'

const Navbar = () => {
    const {Login,setLogin}=useNewCon()
  return (
    <div className='flex absolute w-full z-10 flex-row justify-between my-1 md:my-3'>
        <div className='shoecart-logo'>
            <Link to="/">
            <img src={logo} alt="ShoeCart" className='mt-4 md:mt-0 h-6 md:h-10' /></Link>
        </div>
        {/* <div className="flex items-center border p-4 gap-2 bg-[#262A33FF] hover:border-white hover:border-2 border-gray-500/30 h-[25px] rounded-full overflow-hidden max-w-md w-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">
        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
    </svg>
    <input type="text" placeholder="Search" className="w-full h-10 outline-none text-white  placeholder-gray-500 text-sm"/>
</div> */}

<div className='flex text-[16px] md:text-xl justify-between gap-10 md:gap-30'>
    {/* 
    <NavLink className={({isActive})=>isActive?"text-yellow-500 text-xl md:text-2xl underline":'hover:underline'} to="/products">Products</NavLink> */}
    <div className="flex flex-wrap justify-center items-center space-x-2 text-sm text-gray-500 font-medium">
    <NavLink className={({isActive})=>isActive?"text-yellow-500 text-xl md:text-2xl underline":'hover:underline'} to="/">Home</NavLink>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <NavLink className={({isActive})=>isActive?"text-yellow-500 text-xl md:text-2xl underline":'hover:underline'} to="/products">Products</NavLink>
    
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <NavLink className={({isActive})=>isActive?"text-yellow-500 text-xl md:text-2xl underline":'hover:underline'} to="/mycart">MyCart</NavLink>
</div>
</div>
        <div className='m-2'>
            {/* <a className='mx-2'><i className="fa-solid fa-heart hover:scale-120"></i></a> */}
            {Login?(
                <button onClick={()=>setLogin(false)} className='bg-yellow-500 p-2 border border-2  border-black rounded text-black font-bold hover:scale-105'>LOGIN</button>
            ):(<button onClick={()=>setLogin(true)} className='bg-yellow-500 p-2 border border-2  border-black rounded text-black font-bold hover:scale-105'>LOGOUT</button>)}
            
        </div>
    </div>
  )
}

export default Navbar