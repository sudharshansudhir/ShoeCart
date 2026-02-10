import React, { useEffect, useState } from 'react'
import whyus from "/WhyUs.png"
import useNewCon from '../Context'
// import AllProducts from './AllProducts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API_BASE=import.meta.env.VITE_API_URI
const Products = () => {

    const[allprods,setAllprods]=useState([])
    const[search,setsearch]=useState("")
    const[backup,setbackup]=useState([])
    const[no,setNo]=useState(false)
    const [userCart,setUserCart]=useState()
    const {addtocart,Mycart}=useNewCon()
    // const [qty,setqty]=useState(0)
        const isLoggedIn=localStorage.getItem("token")
const navigate=useNavigate()
    useEffect(()=>{
        async function fetchProducts(params) {
            try{
                // console.log(API_BASE)
                
                const res=await axios.get(`${API_BASE}/products/all`)
                console.log(res.data.allProducts)
                setAllprods(res.data.allProducts)
                setbackup(res.data.allProducts)
                const userProfile=await axios.get(`${API_BASE}/user/getuser`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                // console.log(userProfile.data.user.cart)
                setUserCart(userProfile.data.user.cart)
2
        }
        catch(e){
            console.log(e)
        }
        }
        
        fetchProducts()

    //     fetch("/AllProductsdata.json")
    //     .then((data)=>data.json())
    //     .then((data)=>{setAllprods(data),setbackup(data)})
    },[])

    function sortprice(){
        const sorted=[...allprods].sort((x,y)=>x.price-y.price)
        setAllprods(sorted)
    }
    function sortrprice(){
        const rsorted=[...allprods].sort((x,y)=>y.price-x.price)
        setAllprods(rsorted)
    }
    function sortrate(){
       const ratesorted= [...allprods].sort((x,y)=>y.rating-x.rating)
       setAllprods(ratesorted)
    }
    function sortdef(){
        const defsort=[...allprods].sort((x,y)=>x._id-y._id)
        setAllprods(defsort)
    }

    function searched(value){    
        const filtered=[...backup].filter((item)=>item.productName.toLowerCase().includes(value.toLowerCase()))
        setAllprods(filtered)        
    }

    async function increment(id){
         if(!isLoggedIn){
            alert("Login required !")
            navigate("/login")
        }
        try{
            const incremented=await axios.post(`${API_BASE}/products/add/cart/${id}`,{},{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            console.log(incremented)
            setUserCart(incremented.data.cart)
        }
        catch(e){
            console.log("Increment in cart error",e)
        }

    }

    async function decrement(id){
         try{
            const decremented=await axios.post(`${API_BASE}/products/remove/cart/${id}`,{},{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            console.log(decremented)
            
            setUserCart(decremented.data.cart)
        }
        catch(e){
            console.log("Decrement in cart error",e)
        }        
    }


  return (
    <div className='my-16 bg-cover pb-8 ' style={{backgroundImage:`url(${whyus})`}} id='allprod'>
        <div className='flex items-center my-16 justify-center'>
            <h1 className='text-3xl md:text-7xl'>All Products</h1>
        </div>

        <div className='md:flex justify-between md:mx-24 items-center'>
            <div className="flex items-center border mx-4 px-4 py-6 gap-2 bg-[#262A33FF] hover:border-amber-300 hover:border-2 border-gray-500/30 h-[25px] rounded-full      
                overflow-hidden  w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">
                    <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
                </svg>
                <input type="text" placeholder="Search" onChange={(e)=>{setsearch(e.target.value);searched(e.target.value) }} className="w-full  h-10 outline-none text-white  placeholder-gray-500 text-sm"/>
            </div>
            
            <div className='flex  md:flex-row  justify-between gap-2 mt-2 md:mt-0'>
                <button type="button" onClick={()=>sortprice()} className="w-40 m-1  py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">Low to High</p></button>
                <button type="button" onClick={()=>sortrprice()} className="w-40 m-1 py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">High to Low</p></button>
                <button type="button" onClick={()=>sortrate()} className="w-40 m-1 py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">High Rating</p></button>
                <button type="button" onClick={()=>sortdef()} className="w-40 m-1 py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">Latest Collections</p></button> 
            </div>

        </div>
    {allprods.length!=0 ?
        (
            <div className="flex my-16 flex-wrap gap-x-20 gap-y-6 mx-24 justify-center md:justify-start">
  {allprods.map((product, index) => {
    const qty =
      userCart?.find((c) => c.productId === product._id)?.quantity || 0

    return (
      <div
        key={index}
        className="group transition hover:scale-105"
      >
        <div className="w-72 rounded-2xl border border-yellow-500/20 bg-[#0b0b0b] p-4 text-yellow-400 shadow-lg transition hover:shadow-yellow-500/20">

          {/* Image */}
          <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-yellow-400/10">
            <img
              src={product.image}
              alt={product.productName}
              className="h-full object-contain transition duration-500 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="mt-4 text-sm">
            <p className="text-yellow-400/60">{product.modelNo}</p>

            <p className="mt-1 truncate text-lg font-semibold text-white">
              {product.productName}
            </p>

            {/* Ratings */}
            <div className="mt-2 flex items-center gap-1 text-yellow-400">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  product.ratings > i ? (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 18 17"
                      fill="currentColor"
                    >
                      <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                    </svg>
                  ) : (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 18 17"
                      fill="currentColor"
                      className="opacity-30"
                    >
                      <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                    </svg>
                  )
                )}
              <span className="ml-1 text-xs text-yellow-400/60">
                ({product.ratings})
              </span>
            </div>

            {/* Price + Cart */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-yellow-400">
                ₹{product.price}
                <span className="ml-2 text-xs text-yellow-400/40 line-through">
                  ₹{product.price}
                </span>
              </p>

              {/* Cart Controls */}
              {qty === 0 ? (
                <button
                  onClick={() => increment(product._id)}
                  className="flex items-center gap-1 rounded-lg border border-yellow-400 bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black transition hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                >
                  + Add
                </button>
              ) : (
                <div className="flex items-center rounded-lg border border-yellow-400 bg-yellow-400 text-black">
                  <button
                    onClick={() => decrement(product._id)}
                    className="px-2 font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold">{qty}</span>
                  <button
                    onClick={() => {
                      increment(product._id)
                      addtocart(product)
                    }}
                    className="px-2 font-bold"
                  >
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

        ):(<div className='flex items-center my-16 justify-center'>
            <h1 className='text-7xl'>Oops ! Couldn't find the match</h1>
        </div>)}

        
    </div>
  )
}

export default Products