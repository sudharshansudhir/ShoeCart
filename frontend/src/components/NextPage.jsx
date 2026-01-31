import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import whyus from "/WhyUs.png"
import useNewCon from '../Context'
import Navbar from './Navbar'

const NextPage = () => {
    const [showAddress, setShowAddress] = React.useState(false)
    const {Mycart,setMycart} = useNewCon()
    const [address,setAddress]=useState("No address found")
    const [addrs,setAddrs]=useState("No address found")

    const total=Mycart?.reduce((acc,item)=>acc+item.offerPrice*item.defaultQuantity,0)
    const discount=total-total*0.02
   
    function addr(val){
      setAddrs(val)
    }

    function cleared(id){
      const clr=Mycart.filter((item)=>item._id!=id)
      setMycart(clr)
    }

    function setadd(){
      setAddress(addrs)
    }
    return (
      <div className='bg-cover pb-6 md:pb-8 mb-8 md:mb-16' style={{backgroundImage:`url(${whyus})`}}>
      <Navbar/>
        <div className="flex flex-col md:flex-row py-36 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-yellow-500">{Mycart.length} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-black-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>
                {Mycart.length>0?(Mycart.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-black-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-black-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-black-500/70">
                                    <p>Size: <span>{product._id || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:{product.defaultQuantity}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * product.defaultQuantity}</p>
                        <button className="cursor-pointer mx-auto" onClick={()=>{cleared(product._id)}}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )):<div>Your Cart is empty</div>}
                
                

                <button className="group cursor-pointer flex items-center mt-8 gap-2 text-yellow-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <Link to="/products">Continue Shopping</Link>
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-black-100/40 p-5 max-md:mt-16 border border-black-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-black-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-black-500">{address}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-yellow-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-black border border-black-300 text-sm w-full">
                              <input autoFocus onChange={(e)=>addr(e.target.value)} className='bg-white-200 p-2 w-full' type='text'></input>
                                <p onClick={()=>{setadd();setShowAddress(!showAddress)}} className="text-yellow-500 text-center cursor-pointer p-2 hover:bg-yellow-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select className="md:w-full border border-black-300 bg-black px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-black-300" />

                <div className="text-black-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>${total}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>${discount}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>${discount}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition">
                    Place Order
                </button>
            </div>
        </div>
    </div>)
}

export default NextPage



