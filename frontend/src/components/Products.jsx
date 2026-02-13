import React, { useEffect, useState } from 'react'
import whyus from "/WhyUs.png"
import useNewCon from '../Context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URI

const Products = () => {

    const [allprods, setAllprods] = useState([])
    const [search, setsearch] = useState("")
    const [backup, setbackup] = useState([])
    const [userCart, setUserCart] = useState()

    const { addtocart } = useNewCon()

    const isLoggedIn = localStorage.getItem("token")
    const navigate = useNavigate()


    useEffect(() => {

        async function fetchProducts() {

            try {

                const res = await axios.get(`${API_BASE}/products/all`)

                setAllprods(res.data.allProducts)
                setbackup(res.data.allProducts)

                const userProfile = await axios.get(`${API_BASE}/user/getuser`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })

                setUserCart(userProfile.data.user.cart)

            } catch (e) {

                console.log(e)

            }
        }

        fetchProducts()

    }, [])



    function sortprice() {
        setAllprods([...allprods].sort((x, y) => x.price - y.price))
    }

    function sortrprice() {
        setAllprods([...allprods].sort((x, y) => y.price - x.price))
    }

    function sortrate() {
        setAllprods([...allprods].sort((x, y) => y.rating - x.rating))
    }

    function sortdef() {
        setAllprods([...backup])
    }

    function searched(value) {

        setsearch(value)

        const filtered = backup.filter((item) =>
            item.productName.toLowerCase().includes(value.toLowerCase())
        )

        setAllprods(filtered)
    }



    async function increment(id) {

        if (!isLoggedIn) {
            alert("Login required !")
            navigate("/login")
        }

        try {

            const incremented = await axios.post(
                `${API_BASE}/products/add/cart/${id}`,
                {},
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            )

            setUserCart(incremented.data.cart)

        } catch (e) {

            console.log("Increment in cart error", e)

        }
    }



    async function decrement(id) {

        try {

            const decremented = await axios.post(
                `${API_BASE}/products/remove/cart/${id}`,
                {},
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            )

            setUserCart(decremented.data.cart)

        } catch (e) {

            console.log("Decrement in cart error", e)

        }
    }



    return (

        <div
            className='my-10 sm:my-16 bg-cover pb-10'
            style={{ backgroundImage: `url(${whyus})` }}
        >

            {/* TITLE */}

            <div className='flex items-center justify-center my-10 sm:my-16'>
                <h1 className='text-3xl sm:text-5xl md:text-7xl'>
                    All Products
                </h1>
            </div>



            {/* SEARCH + FILTER */}

            <div className='flex flex-col lg:flex-row gap-4 items-center px-4 sm:px-6 lg:px-16'>

                {/* Search */}

                <div className="
                    flex items-center
                    border
                    px-4 py-3
                    gap-2
                    bg-[#262A33FF]
                    border-gray-500/30
                    rounded-full
                    w-full
                ">
                    <svg width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">
                        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
                    </svg>

                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => searched(e.target.value)}
                        className="w-full outline-none text-white placeholder-gray-500 text-sm bg-transparent"
                    />
                </div>



                {/* FILTER BUTTONS */}

                <div className='flex flex-wrap justify-center gap-2 w-full lg:w-auto'>

                    <button onClick={sortprice}
                        className="px-4 py-2 text-sm text-yellow-500 border border-yellow-500 rounded-lg">
                        Low to High
                    </button>

                    <button onClick={sortrprice}
                        className="px-4 py-2 text-sm text-yellow-500 border border-yellow-500 rounded-lg">
                        High to Low
                    </button>

                    <button onClick={sortrate}
                        className="px-4 py-2 text-sm text-yellow-500 border border-yellow-500 rounded-lg">
                        High Rating
                    </button>

                    <button onClick={sortdef}
                        className="px-4 py-2 text-sm text-yellow-500 border border-yellow-500 rounded-lg">
                        Default
                    </button>

                </div>

            </div>



            {/* PRODUCTS GRID */}

            {allprods.length !== 0 ? (

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-6
                    px-4 sm:px-6 lg:px-16
                    my-12
                ">

                    {allprods.map((product) => {

                        const qty =
                            userCart?.find((c) => c.productId === product._id)?.quantity || 0

                        return (

                            <div key={product._id} className="group transition hover:scale-105">

                                <div className="rounded-2xl border border-yellow-500/20 bg-[#0b0b0b] p-4 text-yellow-400 shadow-lg">

                                    <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-yellow-400/10">
                                        <img
                                            src={product.image}
                                            alt={product.productName}
                                            className="h-full object-contain transition duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="mt-4 text-sm">

                                        <p className="text-yellow-400/60">{product.modelNo}</p>

                                        <p className="mt-1 truncate text-lg font-semibold text-white">
                                            {product.productName}
                                        </p>

                                        {/* PRICE */}

                                        <div className="mt-4 flex items-center justify-between">

                                            <p className="text-lg font-semibold text-yellow-400">
                                                ₹{product.price}
                                            </p>

                                            {qty === 0 ? (

                                                <button
                                                    onClick={() => increment(product._id)}
                                                    className="rounded-lg border border-yellow-400 bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
                                                    + Add
                                                </button>

                                            ) : (

                                                <div className="flex items-center rounded-lg border border-yellow-400 bg-yellow-400 text-black">

                                                    <button
                                                        onClick={() => decrement(product._id)}
                                                        className="px-2 font-bold">
                                                        −
                                                    </button>

                                                    <span className="w-6 text-center font-bold">
                                                        {qty}
                                                    </span>

                                                    <button
                                                        onClick={() => {
                                                            increment(product._id)
                                                            addtocart(product)
                                                        }}
                                                        className="px-2 font-bold">
                                                        +
                                                    </button>

                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                    })}

                </div>

            ) : (

                <div className='flex items-center justify-center my-16'>
                    <h1 className='text-3xl sm:text-5xl'>
                        Oops ! Couldn't find the match
                    </h1>
                </div>

            )}

        </div>
    )
}

export default Products
