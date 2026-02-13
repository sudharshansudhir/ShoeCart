import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import whyus from "/WhyUs.png"
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URI

const Cart = () => {

    const [showAddress, setShowAddress] = useState(false)
    const [Mycart, setMycart] = useState()
    const [address, setAddress] = useState("No address found")
    const [addrs, setAddrs] = useState("No address found")
    const [usersCart, setUserscart] = useState()

    const isLoggedIn = localStorage.getItem("token")
    const navigate = useNavigate()

    let amt = 0


    function addr(val) {
        setAddrs(val)
    }


    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/login")
        }

        async function fetchCart() {

            try {

                const userCart = await axios.get(`${API_BASE}/user/getuser`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })

                const allProducts = await axios.get(`${API_BASE}/products/all`)

                const filtered = allProducts.data.allProducts.filter((item) =>
                    userCart.data.user.cart.some(it => it.productId == item._id)
                )

                setMycart(filtered)
                setUserscart(userCart.data.user.cart)

            }
            catch (e) {
                console.log("Cart page error", e)
            }
        }

        fetchCart()

    }, [])



    async function decrement(id) {
        try {

            const decremented = await axios.post(
                `${API_BASE}/products/remove/cart/${id}`, {},
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })

            setUserscart(decremented.data.cart)

        } catch (e) {
            console.log("Decrement in cart error", e)
        }
    }


    async function increment(id) {
        try {

            const incremented = await axios.post(
                `${API_BASE}/products/add/cart/${id}`, {},
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })

            setUserscart(incremented.data.cart)

        } catch (e) {
            console.log("increment in cart error", e)
        }
    }


    function setadd() {
        setAddress(addrs)
    }

    function order() {
        alert("Order Successfully placed")
    }



    return (

        <div
            className='bg-cover pb-6 md:pb-8 mb-8 md:mb-16'
            style={{ backgroundImage: `url(${whyus})` }}
        >

            <div className="flex flex-col md:flex-row py-20 md:py-36 max-w-6xl w-full px-4 sm:px-6 mx-auto gap-10">

                {/* LEFT SIDE */}

                <div className='flex-1 max-w-4xl'>

                    <h1 className="text-2xl md:text-3xl font-medium mb-6">
                        Shopping Cart
                        <span className="text-sm text-yellow-500"> Items</span>
                    </h1>


                    {/* HEADERS — hide on mobile */}

                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-base font-medium pb-3">
                        <p className="text-left">Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>



                    {Mycart ? (

    Mycart.map((product, index) => {

        const qty =
            usersCart?.find(item => item.productId == product._id)?.quantity || 0

        amt = Number(amt + (qty * product.price))

        return (

            <div
                key={index}
                className="
                border border-gray-500/20
                rounded-lg
                p-4
                mb-4

                md:border-0
                md:rounded-none
                md:p-0
                md:mb-0
                md:py-4
                md:grid md:grid-cols-[2fr_1fr_1fr]
                md:items-center
                "
            >

                {/* TOP SECTION */}

                <div className="flex gap-4 items-center">

                    <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center border rounded">
                        <img
                            className="max-w-full h-full object-cover"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>

                    <div className="flex flex-col">

                        <p className="font-semibold">
                            {product.productName}
                        </p>

                        <p className="text-sm text-gray-400">
                            Size: {product.size || "N/A"}
                        </p>

                        <p className="text-sm">
                            Qty: {qty}
                        </p>

                    </div>

                </div>



                {/* MOBILE — subtotal + buttons */}

                <div className="flex justify-between items-center mt-4 md:hidden">

                    <p className="font-semibold">
                        ${product.price * qty}
                    </p>

                    <div className='flex items-center gap-4'>

                        <button
                            className="text-lg"
                            onClick={() => decrement(product._id)}
                        >
                            ➖
                        </button>

                        <button
                            className="text-lg"
                            onClick={() => increment(product._id)}
                        >
                            ➕
                        </button>

                    </div>

                </div>



                {/* DESKTOP */}

                <p className="hidden md:block text-center">
                    ${product.price * qty}
                </p>

                <div className='hidden md:flex justify-center items-center gap-4'>

                    <button
                        className="scale-110"
                        onClick={() => decrement(product._id)}
                    >
                        ➖
                    </button>

                    <button
                        className="scale-110"
                        onClick={() => increment(product._id)}
                    >
                        ➕
                    </button>

                </div>

            </div>
        )
    })

) : (

    <div>Your Cart is empty</div>

)}




                    <button className="flex items-center mt-8 gap-2 text-yellow-500 font-medium">
                        <Link to="/products">Continue Shopping</Link>
                    </button>

                </div>



                {/* ORDER SUMMARY */}

                <div className="
                    w-full
                    md:max-w-[360px]
                    p-5
                    border
                    border-black-300/70
                    bg-black/40
                    h-fit
                ">

                    <h2 className="text-xl font-medium">Order Summary</h2>

                    <hr className="border-black-300 my-5" />

                    <div className="mb-6">

                        <p className="text-sm font-medium uppercase">
                            Delivery Address
                        </p>

                        <div className="relative flex justify-between items-start mt-2">

                            <p>{address}</p>

                            <button
                                onClick={() => setShowAddress(!showAddress)}
                                className="text-yellow-500 hover:underline"
                            >
                                Change
                            </button>

                            {showAddress && (
                                <div className="absolute top-12 py-1 bg-black border text-sm w-full">
                                    <input
                                        autoFocus
                                        onChange={(e) => addr(e.target.value)}
                                        className='p-2 w-full text-black'
                                        type='text'
                                    />

                                    <p
                                        onClick={() => {
                                            setadd()
                                            setShowAddress(!showAddress)
                                        }}
                                        className="text-yellow-500 text-center cursor-pointer p-2"
                                    >
                                        Add address
                                    </p>
                                </div>
                            )}

                        </div>


                        <p className="text-sm font-medium uppercase mt-6">
                            Payment Method
                        </p>

                        <select className="w-full border bg-black px-3 py-2 mt-2 outline-none">
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment</option>
                        </select>

                    </div>



                    <hr />

                    <div className="mt-4 space-y-2">

                        <p className="flex justify-between">
                            <span>Price</span>
                            <span>${amt}</span>
                        </p>

                        <p className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span className="text-green-600">Free</span>
                        </p>

                        <p className="flex justify-between">
                            <span>Tax (2%)</span>
                            <span>${Math.floor(amt - amt * (1 - 2 / 100))}</span>
                        </p>

                        <p className="flex justify-between text-lg font-medium mt-3">
                            <span>Total Amount:</span>
                            <span>${Math.floor(amt * (1 - 2 / 100))}.00</span>
                        </p>

                    </div>

                    <button
                        onClick={() => order()}
                        className="w-full py-3 mt-6 bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition"
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Cart
