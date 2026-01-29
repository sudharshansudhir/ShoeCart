import React, { useEffect, useState } from 'react'
import whyus from "/WhyUs.png"
import useNewCon from '../Context'
import AllProducts from './AllProducts'


const Products = () => {

    const[allprods,setAllprods]=useState([])
    const[search,setsearch]=useState("")
    const[backup,setbackup]=useState([])
    const[no,setNo]=useState(false)
    const {addtocart,Mycart}=useNewCon()

    useEffect(()=>{
        fetch("/AllProductsdata.json")
        .then((data)=>data.json())
        .then((data)=>{setAllprods(data),setbackup(data)})
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
        const filtered=[...backup].filter((item)=>item.name.toLowerCase().includes(value.toLowerCase()))
        setAllprods(filtered)        
    }

    function increment(id){
        const inc=allprods.map((prod)=>{
            if(prod._id===id){
                const up = {...prod,defaultQuantity:prod.defaultQuantity+1}
                addtocart(up)
                return up
            }
            else{
                return prod
            }
        })
        setAllprods(inc)
    }

    function decrement(id){
        const dec=allprods.map((prod)=>{
            if(prod._id===id){
                return {...prod,defaultQuantity:prod.defaultQuantity-1}
            }
            else{
                return prod
            }
        })
        setAllprods(dec)
        
    }


  return (
    <div className='my-16 bg-cover pb-8 my-16' style={{backgroundImage:`url(${whyus})`}} id='allprod'>
        <div className='flex items-center my-16 justify-center'>
            <h1 className='text-3xl md:text-7xl'>All Products</h1>
        </div>

        <div className='md:flex justify-between md:mx-24 items-center'>
            <div className="flex items-center border p-4 gap-2 bg-[#262A33FF] hover:border-white hover:border-2 border-gray-500/30 h-[25px] rounded-full      
                overflow-hidden  w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">
                    <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
                </svg>
                <input type="text" placeholder="Search" onChange={(e)=>{setsearch(e.target.value);searched(e.target.value) }} className="w-full h-10 outline-none text-white  placeholder-gray-500 text-sm"/>
            </div>
            
            <div className='flex  md:flex-row  justify-between gap-2 mt-2 md:mt-0'>
                <button type="button" onClick={()=>sortprice()} className="w-40 m-1  py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">Low to High</p></button>
                <button type="button" onClick={()=>sortrprice()} className="w-40 m-1 py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">High to Low</p></button>
                <button type="button" onClick={()=>sortrate()} className="w-40 m-1 py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">High Rating</p></button>
                <button type="button" onClick={()=>sortdef()} className="w-40 m-1 py-3 active:scale-95 transition text-[16px] md:text-sm text-yellow-500 border border-yellow-500 rounded-lg bg-transparent"><p className="mb-0.5">Latest Collections</p></button> 
            </div>

        </div>
    {allprods.length!=0 ?
        (<div className='flex my-16 flex-wrap gap-x-[80px] gap-y-[20px] mx-24 justify-center md:justify-start'>
            { allprods.map((product,index)=>{return <div className='hover:scale-105' key={index}>
        <div className="border border-yellow-600 text-yellow-400 rounded-md md:px-4 px-3 py-2 bg-black w-100 min-h-80 max-h-80 md:min-w-60 md:max-w-60 ">
            <div className="group cursor-pointer bg-yellow-100 flex rounded-md items-center justify-center px-2">
                <img className="transition w-full min-h-36 max-h-46" src={product.image} alt={product.name} />
            </div>
            <div className=" text-sm">
                <p>{product.category}</p>
                <p className=" font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        product.rating > i ? (
                            <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="currentColor" />
                            </svg>
                        ) : (
                            <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="currentColor" fillOpacity="0.35" />
                            </svg>
                        )
                    ))}
                    <p>({product.rating})</p>
                </div>

                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium ">
                        ${product.offerPrice} <span className=" md:text-sm text-xs line-through">${product.price}</span>
                    </p>
                    <div className="font-bold">
                        {product.defaultQuantity === 0 ? (
                            <button  className="flex items-center justify-center gap-1 bg-yellow-200 border border-black md:w-[80px] w-[64px] h-[34px] rounded text-black" onClick={() =>  {increment(product._id);}} >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-yellow-200 rounded select-none">
                                <button onClick={() =>decrement(product._id) } className="cursor-pointer text-black text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-black font-bold text-center">{product.defaultQuantity}</span>
                                <button onClick={() => {increment(product._id);addtocart(product)}} className="cursor-pointer text-black text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    </div>})}</div>):(<div className='flex items-center my-16 justify-center'>
            <h1 className='text-7xl'>Oops ! Couldn't find the match</h1>
        </div>)}

        
    </div>
  )
}

export default Products