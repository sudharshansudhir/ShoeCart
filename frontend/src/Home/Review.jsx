import React from 'react'
import whyus from "/WhyUs.png"
const Review = () => {
  return (
    <div className='bg-cover pb-6 md:pb-8 my-8 md:my-16' style={{backgroundImage:`url(${whyus})`}}>
            <div className='flex items-center my-8 justify-center'>
                <h1 className=' text-3xl md:text-7xl'>For Queries</h1>
            </div>

            <div>
                <div className="flex flex-col items-center justify-center text-center space-y-2">
            <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
            <p className="md:text-lg text-yellow-500/70 pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-yellow-500 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-yellow-500"
                    type="text"
                    placeholder="Enter your email id"
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-black bg-yellow-500 hover:bg-yellow-600 transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </form>
        </div>
            </div>
    </div>
  )
}

export default Review