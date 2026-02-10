import React, { useEffect } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AdminProducts from '../components/AdminProducts'
import AdminUsers from '../components/AdminUsers'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    const isAdmin=localStorage.getItem("isAdmin")
    if (!isAdmin){
      navigate("/")
    }
  },[])
  return (
    <div>
        <AdminNavbar/>
        <AdminProducts/>
        <AdminUsers/>
    </div>
  )
}

export default AdminDashboard