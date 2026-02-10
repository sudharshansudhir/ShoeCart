import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import AddProductForm from './AddProductForm'
const API_BASE=import.meta.env.VITE_API_URI


const AdminProducts = () => {
    const [products,setProducts]=useState()
    const [showForm,setShowForm]=useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
 async function fetchProducts() {
            try{
                const products=await axios.get(`${API_BASE}/products/all`)
                console.log(products)
                setProducts(products.data.allProducts)
            }
            catch(e){
                console.log(e)
            }
            
        }
    useEffect(()=>{       
        fetchProducts()
    },[])

    async function deleteProduct(id) {
        const response=await axios.delete(`${API_BASE}/products/delete/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token"),
              isAdmin:localStorage.getItem("isAdmin")
            }
        })
        fetchProducts()
        
    }

    
  return (
    <div>
        <div className='flex justify-between mx-4 items-center'>
        <h2 className='text-3xl my-4 '>All Products</h2>
        <button onClick={()=>{setSelectedProduct(null);setShowForm(true)}} className='py-2 px-4 text-[20px] text-yellow-400 bg-black border-2 hover:scale-105 duration-300  hover:bg-yellow-400 hover:text-black rounded-md border-amber-300'>New Product</button>
        </div>
{showForm && (
  <AddProductForm
    closeForm={() => setShowForm(false)}
    refresh={fetchProducts}
     productData={selectedProduct} 
  />
)}


        <div className="flex flex-wrap items-center gap-6">
  {products ? products.map((item) => (
    <div
      key={item._id}
      className="group w-[380px] overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#0b0b0b] shadow-lg transition hover:shadow-yellow-500/20"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.productName}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Remove badge */}
        <button onClick={()=>deleteProduct(item._id)} className="absolute right-4 top-4 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-400 cursor-pointer hover:bg-yellow-400 hover:text-black transition">
          Delete
        </button>

        <h3 className="mt-6 text-xl font-semibold text-white tracking-wide">
          {item.productName}
        </h3>

        <p className="mt-2 text-lg font-medium text-yellow-400">
          ₹ {item.price}
        </p>

        {/* Actions */}
        <button onClick={() => {
                                    setSelectedProduct(item)
                                    setShowForm(true)
                                }}
          className="mt-6 w-full rounded-xl border border-yellow-400 bg-yellow-400/90 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
        >
          Edit Product
        </button>
      </div>
    </div>
  )) : (
    <h2 className="text-yellow-400">No products in the Database</h2>
  )}
</div>



    </div>
  )
}

export default AdminProducts