import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API_BASE=import.meta.env.VITE_API_URI

const ProfileSection = () => {
    const [profile,setProfile]=useState()
    const navigate=useNavigate()
    const [updateProfile,setUpdateProfile]=useState()
    const [isUpdate,setIsUpdate]=useState(false)
    useEffect(()=>{
        const token=localStorage.getItem("token")
        if (!token){
            navigate("/login")
        }

        async function fetchProfile() {
            try{
                const response=await axios.get(`${API_BASE}/user/getuser`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                    }
                })          
                console.log(response.data)
                setProfile(response.data.user)
                setUpdateProfile(response.data.user)
            }
            catch(e){
                console.log("User profile fetch error ->",e)
            }            
        }

        fetchProfile()
    },[])

    async function updateData(e) {
        e.preventDefault()
        console.log(updateProfile)
        try{
            const response=await axios.patch(`${API_BASE}/user/update`,{payload:updateProfile},{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            console.log(response.data)
            alert("User Profile updated Successfully")

        }
        catch(e){
            console.log("User profile update error ->",e)
        }
        
        
    }

    async function logoutFunction() {
        alert("Logged out successfully")
        localStorage.clear()        
        navigate("/login")
    }

  return (
    <section className="py-20 my-auto">
    <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[88%] sm:w-[88%] w-full mx-auto border-1 border-amber-300 shadow-2xl p-10 rounded-xl h-fit self-center bg-black/40">
            
            <div className="">
                <h1
                    className="lg:text-4xl flex w-full justify-center items-center md:text-2xl text-xl font-serif font-extrabold mb-2 dark:text-white">
                    Profile
                </h1>
                {/* <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2> */}
                <form>
                    {profile ? <>
                    <div>
                        <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                            <div className="w-full  mb-4 mt-6">
                                <label htmlFor='' className="mb-2 dark:text-gray-300">First Name</label>
                                <input type="text"
                                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                        defaultValue={updateProfile.name} onChange={isUpdate?(e)=>updateProfile.name=e.target.value:undefined} disabled={!isUpdate} placeholder="First Name " />
                            </div>
                            <div className="w-full  mb-4 lg:mt-6">
                                <label htmlFor='' className=" dark:text-gray-300">Email</label>
                                <input type="text" 
                                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                        defaultValue={updateProfile.email} onChange={isUpdate?(e)=>updateProfile.email=e.target.value:undefined} disabled={!isUpdate} placeholder="Email" />
                            </div>
                        </div>

                        <div className="flex  gap-2 justify-center w-full">
                            <div className="w-full">
                                <h3 className="dark:text-gray-300 mb-2">Phone Number</h3>
                                <input type="text"
                                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                        defaultValue={updateProfile.phone} onChange={isUpdate?(e)=>updateProfile.phone=e.target.value:undefined} disabled={!isUpdate} placeholder="Phone Number" />
                            </div>
                            <div className="w-full">
                                <h3 className="dark:text-gray-300 mb-2">Address</h3>
                                <input type="text"
                                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                        defaultValue={updateProfile.address} onChange={isUpdate?(e)=>updateProfile.address=e.target.value:undefined} disabled={!isUpdate} placeholder="Address" />
                            </div>
                        </div>
                        <div className='flex gap-2 justify-center items-around'>
                            <div className="w-full flex justify-center items-center rounded-lg mt-4 text-white text-lg font-semibold">
                                { isUpdate ? <button onClick={(e)=>{updateData(e);setIsUpdate(!isUpdate)}} className="w-[50%]  bg-green-500 p-4">Submit</button>:
                                <button onClick={(e)=>{e.preventDefault();setIsUpdate(!isUpdate)}} className="w-[50%]  bg-yellow-500 p-4">Edit</button>}
                            </div>
                            <div className="w-full flex justify-center items-center rounded-lg mt-4 text-white text-lg font-semibold">
                                <button onClick={()=>logoutFunction()} className='w-[50%]  bg-red-500 p-4'>Logout</button>
                            </div>
                            </div>
                        </div>
                    </> : <div className='flex w-full py-8 h-full justify-center items-center text-4xl'>Loading...</div>}
                </form>
            </div>
        </div>
    </div>
</section>
  )
}

export default ProfileSection