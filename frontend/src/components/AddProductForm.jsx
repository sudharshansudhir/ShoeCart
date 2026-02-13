import React, { useState, useEffect } from "react"
import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URI

const AddProductForm = ({ closeForm, refresh, productData }) => {

  const isEdit = !!productData // ⭐ true if editing

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    color: "",
    brand: "",
    material: "",
    inStock: 1,
    image: "",
    ratings: 0,
    modelNo: "",
  })

  // ⭐ Fill form when editing
  useEffect(() => {
    if (productData) {
      setFormData(productData)
    }
  }, [productData])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ⭐ MAIN FUNCTION
  async function handleSubmit(e) {
    e.preventDefault()

    try {

      if (isEdit) {

        // ⭐ UPDATE API
        await axios.patch(
          `${API_BASE}/products/update/${productData._id}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              isAdmin:localStorage.getItem("isAdmin")
            }
          }
        )

        alert("Product Updated ✅")

      } else {

        // ⭐ CREATE API
        await axios.post(
          `${API_BASE}/products/add`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              isAdmin:localStorage.getItem("isAdmin")
            }
          }
        )

        alert("Product Added ✅")
      }

      refresh()
      closeForm()

    } catch (err) {
      console.log(err)
      alert("Something went wrong")
    }
  }

  return (

    <div className="fixed m-4 inset-0 z-50 bg-black/70 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] md:p-8 p-4 rounded-xl md:w-[500px] w-[400px] md:space-y-4 space-y-3">

        <h2 className="md:text-2xl text-[20px] text-yellow-400 font-bold">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        <input name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" className="w-full md:p-3 p-2 rounded bg-black border" />

        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full md:p-3 p-2 rounded bg-black border" />

        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full md:p-3 p-2 rounded bg-black border" />

        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full md:p-3 p-2 rounded bg-black border" />

        <input name="color" value={formData.color} onChange={handleChange} placeholder="Color" className="w-full md:p-3 p-2 rounded bg-black border" />

        <input name="material" value={formData.material} onChange={handleChange} placeholder="Material" className="w-full md:p-3 p-2 rounded bg-black border" />

        <input name="modelNo" value={formData.modelNo} onChange={handleChange} placeholder="Model No" className="w-full md:p-3 p-2 rounded bg-black border" />

        <button className="w-full bg-yellow-400 text-black py-3 rounded font-bold hover:scale-105 transition">
          {isEdit ? "Update Product" : "Add Product"}
        </button>

        <button
          type="button"
          onClick={closeForm}
          className="w-full border border-yellow-400 text-yellow-400 py-3 rounded">
          Cancel
        </button>

      </form>
    </div>
  )
}

export default AddProductForm
