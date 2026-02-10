import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const API_BASE=import.meta.env.VITE_API_URI
const AdminUsers = () => {
    const [users,setUsers]=useState()
    async function fetchUsers() {
            const response=await axios.get(`${API_BASE}/admin/getusers`,{
                headers:{
                    Authorization:localStorage.getItem("token"),
              isAdmin:localStorage.getItem("isAdmin")
                }
            })      
            setUsers(response.data.allUser)      
        }
    useEffect(()=>{
        
        fetchUsers()
    },[])

    async function deleteUser(id) {
        const response=await axios.delete(`${API_BASE}/admin/delete/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token"),
              isAdmin:localStorage.getItem("isAdmin")
            }
        })     
        console.log(response)   
        fetchUsers()
    }
    

  return (
    <div>
        <h2 className='text-3xl my-4'>All Users</h2>
        <div className="flex flex-wrap gap-3 p-6">
  {users ? (
    users.map((item) => (
      <div
        key={item._id}
        className="w-[320px] rounded-xl border border-yellow-500/20 bg-[#0b0b0b] p-5 text-white shadow-lg transition hover:shadow-yellow-500/20"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-yellow-400">
            {item.name}
          </h2>

          <button
            onClick={() => deleteUser(item._id)}
            className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Remove
          </button>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-yellow-400/70">Email:</span>{" "}
            <span className="text-gray-300 break-all">{item.email}</span>
          </p>

          <p>
            <span className="text-yellow-400/70">Phone:</span>{" "}
            <span className="text-gray-300">{item.phone}</span>
          </p>

          <p>
            <span className="text-yellow-400/70">Address:</span>{" "}
            <span className="text-gray-300">{item.address}</span>
          </p>
        </div>
      </div>
    ))
  ) : (
    <h2 className="text-yellow-400">No users in the Database</h2>
  )}
</div>

    </div>
  )
}

export default AdminUsers