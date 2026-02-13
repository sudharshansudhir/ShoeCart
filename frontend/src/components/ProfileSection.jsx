import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URI

const ProfileSection = () => {

    const [profile, setProfile] = useState()
    const [updateProfile, setUpdateProfile] = useState()
    const [isUpdate, setIsUpdate] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/login")
        }

        async function fetchProfile() {

            try {

                const response = await axios.get(`${API_BASE}/user/getuser`, {
                    headers: {
                        Authorization: token
                    }
                })

                setProfile(response.data.user)
                setUpdateProfile(response.data.user)

            } catch (e) {

                console.log("User profile fetch error ->", e)

            }
        }

        fetchProfile()

    }, [])



    async function updateData(e) {

        e.preventDefault()

        try {

            await axios.patch(
                `${API_BASE}/user/update`,
                { payload: updateProfile },
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            )

            alert("User Profile updated Successfully")

        } catch (e) {

            console.log("User profile update error ->", e)

        }
    }



    function logoutFunction() {

        alert("Logged out successfully")
        localStorage.clear()
        navigate("/login")

    }



    return (

        <section className="py-10 sm:py-16">

            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                <div className="
                w-full
                border border-amber-300
                shadow-2xl
                p-5 sm:p-8
                rounded-xl
                bg-black/40
                ">

                    <h1 className="
                    text-2xl sm:text-3xl lg:text-4xl
                    flex justify-center items-center
                    font-serif font-extrabold
                    mb-6
                    text-white
                    ">
                        Profile
                    </h1>

                    <form>

                        {profile ? (

                            <div>

                                {/* NAME + EMAIL */}

                                <div className="
                                flex flex-col
                                lg:flex-row
                                gap-4
                                ">

                                    <div className="w-full">
                                        <label className="mb-2 text-gray-300">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            defaultValue={updateProfile.name}
                                            onChange={
                                                isUpdate
                                                    ? (e) => updateProfile.name = e.target.value
                                                    : undefined
                                            }
                                            disabled={!isUpdate}
                                            className="
                                            mt-2 p-3 sm:p-4
                                            w-full
                                            border-2
                                            rounded-lg
                                            text-gray-200
                                            border-gray-600
                                            bg-gray-800
                                            "
                                            placeholder="First Name"
                                        />
                                    </div>


                                    <div className="w-full">
                                        <label className="mb-2 text-gray-300">
                                            Email
                                        </label>

                                        <input
                                            type="text"
                                            defaultValue={updateProfile.email}
                                            onChange={
                                                isUpdate
                                                    ? (e) => updateProfile.email = e.target.value
                                                    : undefined
                                            }
                                            disabled={!isUpdate}
                                            className="
                                            mt-2 p-3 sm:p-4
                                            w-full
                                            border-2
                                            rounded-lg
                                            text-gray-200
                                            border-gray-600
                                            bg-gray-800
                                            "
                                            placeholder="Email"
                                        />
                                    </div>

                                </div>



                                {/* PHONE + ADDRESS */}

                                <div className="
                                flex flex-col
                                lg:flex-row
                                gap-4
                                mt-4
                                ">

                                    <div className="w-full">
                                        <label className="mb-2 text-gray-300">
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            defaultValue={updateProfile.phone}
                                            onChange={
                                                isUpdate
                                                    ? (e) => updateProfile.phone = e.target.value
                                                    : undefined
                                            }
                                            disabled={!isUpdate}
                                            className="
                                            mt-2 p-3 sm:p-4
                                            w-full
                                            border-2
                                            rounded-lg
                                            text-gray-200
                                            border-gray-600
                                            bg-gray-800
                                            "
                                            placeholder="Phone Number"
                                        />
                                    </div>


                                    <div className="w-full">
                                        <label className="mb-2 text-gray-300">
                                            Address
                                        </label>

                                        <input
                                            type="text"
                                            defaultValue={updateProfile.address}
                                            onChange={
                                                isUpdate
                                                    ? (e) => updateProfile.address = e.target.value
                                                    : undefined
                                            }
                                            disabled={!isUpdate}
                                            className="
                                            mt-2 p-3 sm:p-4
                                            w-full
                                            border-2
                                            rounded-lg
                                            text-gray-200
                                            border-gray-600
                                            bg-gray-800
                                            "
                                            placeholder="Address"
                                        />
                                    </div>

                                </div>



                                {/* BUTTONS */}

                                <div className="
                                flex flex-col sm:flex-row
                                gap-3
                                mt-6
                                ">

                                    <div className="w-full flex justify-center">

                                        {isUpdate ? (

                                            <button
                                                onClick={(e) => {
                                                    updateData(e)
                                                    setIsUpdate(!isUpdate)
                                                }}
                                                className="
                                                w-full sm:w-[60%]
                                                bg-green-500
                                                p-3 sm:p-4
                                                rounded-lg
                                                text-white
                                                font-semibold
                                                ">
                                                Submit
                                            </button>

                                        ) : (

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setIsUpdate(!isUpdate)
                                                }}
                                                className="
                                                w-full sm:w-[60%]
                                                bg-yellow-500
                                                p-3 sm:p-4
                                                rounded-lg
                                                text-white
                                                font-semibold
                                                ">
                                                Edit
                                            </button>

                                        )}

                                    </div>



                                    <div className="w-full flex justify-center">

                                        <button
                                            onClick={logoutFunction}
                                            className="
                                            w-full sm:w-[60%]
                                            bg-red-500
                                            p-3 sm:p-4
                                            rounded-lg
                                            text-white
                                            font-semibold
                                            ">
                                            Logout
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            <div className='flex w-full py-10 justify-center items-center text-2xl sm:text-3xl'>
                                Loading...
                            </div>

                        )}

                    </form>

                </div>

            </div>

        </section>
    )
}

export default ProfileSection
