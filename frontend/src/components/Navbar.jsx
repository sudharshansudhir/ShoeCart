import React, { useEffect, useState } from 'react'
import logo from "/ShoeCart-logo.jpg"
import { NavLink, Link } from "react-router-dom"
import useNewCon from '../Context'

const Navbar = () => {

    const [isLogin, setisLogin] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const isLoggedIn = localStorage.getItem("token")

    useEffect(() => {
        if (isLoggedIn) {
            setisLogin(true)
        }
    }, [isLoggedIn])


    return (

        <>
            <div className='flex absolute w-full z-20 flex-row justify-between items-center px-4 md:px-8 my-1 md:my-3'>

                {/* LOGO */}

                <div className='shoecart-logo'>
                    <Link to="/">
                        <img src={logo} alt="ShoeCart"
                            className='h-7 md:h-10 object-contain'
                        />
                    </Link>
                </div>



                {/* DESKTOP NAV */}

                <div className='hidden md:flex text-[16px] md:text-xl justify-between gap-10'>

                    <div className="flex flex-wrap justify-center items-center space-x-2 text-sm text-gray-500 font-medium">

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-500 text-xl md:text-2xl underline"
                                    : 'hover:underline'
                            }
                            to="/"
                        >
                            Home
                        </NavLink>

                        <svg width="20" height="20"><path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/></svg>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-500 text-xl md:text-2xl underline"
                                    : 'hover:underline'
                            }
                            to="/products"
                        >
                            Products
                        </NavLink>

                        <svg width="20" height="20"><path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/></svg>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-500 text-xl md:text-2xl underline"
                                    : 'hover:underline'
                            }
                            to="/cart"
                        >
                            MyCart
                        </NavLink>

                    </div>
                </div>



                {/* DESKTOP BUTTON */}

                <div className='hidden md:block'>
                    {!isLogin ? (
                        <NavLink to="/login"
                            className='bg-yellow-500 p-2 border-2 mx-2 border-black rounded text-black font-bold hover:scale-105'>
                            Login
                        </NavLink>
                    ) : (
                        <NavLink to="/profile"
                            className='bg-yellow-500 p-2 border-2 mx-2 border-black rounded text-black font-bold hover:scale-105'>
                            Profile
                        </NavLink>
                    )}
                </div>



                {/* MOBILE HAMBURGER */}

                <div className='md:hidden'>
                    <button
                        onClick={() => setMenuOpen(true)}
                        className='text-white text-3xl'
                    >
                        ☰
                    </button>
                </div>

            </div>



            {/* MOBILE DRAWER */}

            <div className={`fixed inset-0 z-30 transition ${menuOpen ? "visible" : "invisible"}`}>

                {/* Overlay */}
                <div
                    onClick={() => setMenuOpen(false)}
                    className={`absolute inset-0 bg-black/60 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
                />

                {/* Drawer */}
                <div className={`
                    absolute top-0 right-0
                    h-full w-64
                    bg-black
                    p-6
                    transform transition-transform
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}
                `}>

                    {/* Close */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className='text-white text-2xl mb-8'
                    >
                        ✕
                    </button>


                    {/* Links */}
                    <div className="flex flex-col gap-6 text-gray-300 text-lg">

                        <NavLink onClick={() => setMenuOpen(false)} to="/">
                            Home
                        </NavLink>

                        <NavLink onClick={() => setMenuOpen(false)} to="/products">
                            Products
                        </NavLink>

                        <NavLink onClick={() => setMenuOpen(false)} to="/cart">
                            MyCart
                        </NavLink>

                        {!isLogin ? (
                            <NavLink
                                onClick={() => setMenuOpen(false)}
                                to="/login"
                                className='bg-yellow-500 p-2 rounded text-black font-bold text-center'
                            >
                                Login
                            </NavLink>
                        ) : (
                            <NavLink
                                onClick={() => setMenuOpen(false)}
                                to="/profile"
                                className='bg-yellow-500 p-2 rounded text-black font-bold text-center'
                            >
                                Profile
                            </NavLink>
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar
