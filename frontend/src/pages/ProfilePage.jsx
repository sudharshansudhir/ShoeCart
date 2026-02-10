import React, { useEffect } from 'react'
import ProfileSection from '../components/ProfileSection'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const navigate=useNavigate()
      useEffect(()=>{
        const isAdmin=localStorage.getItem("isAdmin")
        if (isAdmin){
          navigate("/admin")
        }
      },[])
  return (
    <div>
      <Navbar/>
      <ProfileSection/>
    </div>
  )
}

export default ProfilePage