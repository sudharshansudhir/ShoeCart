import React from 'react'
import bg1 from "/fast-delivery.jpg"
import bg2 from "/return policy.png"
import bg3 from "/quality.jpg"
import bg4 from "/customers.jpg"
import bg5 from "/COD.jpeg"
import whyus from "/WhyUs.png"

const Testimonial = () => {
  return (
    <div className='bg-cover pb-6 md:pb-8 my-8 md:my-16' style={{backgroundImage:`url(${whyus})`}}>
        <div className='flex items-center my-8 justify-center'><h1 className='text-3xl md:text-7xl'>Why Us ?</h1></div>
    <div className='grid grid-row-2 h-[300px] md:h-[700px] gap-3 grid-cols-12'>
        <div className='col-span-5 rounded-2xl hover:scale-95'>
            <div className="relative rounded-2xl w-full h-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bg1})` }}>
                <div className="absolute inset-0 bg-black/65"></div>
                <div className="relative z-10 flex justify-center items-center h-full">
                    <h1 className="text-white text-xl md:text-4xl font-bold">Fast Delivery</h1>
                </div>
            </div>
        </div>



        <div className='col-span-3 bg-gray-500 hover:scale-95 rounded-2xl'>
            <div className="relative rounded-2xl p-2 w-full h-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bg2})` }}>
                <div className="absolute inset-0 bg-black/65"></div>
                <div className="relative z-10 flex justify-center items-center h-full">
                    <h1 className="text-white text-xl md:text-4xl font-bold">7 Return Policy</h1>
                </div>
            </div>
        </div>



        <div className='col-span-4 bg-gray-500 hover:scale-95 row-span-2 rounded-2xl'>
            <div className="relative rounded-2xl w-full h-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bg3})` }}>
                <div className="absolute inset-0 bg-black/65"></div>
                <div className="relative z-10 flex justify-center items-center h-full">
                    <h1 className="text-white text-xl md:text-4xl font-bold">Quality</h1>
                </div>
            </div>
        </div>




        <div className='col-span-4 bg-gray-500 hover:scale-95 rounded-2xl'>
            <div className="relative rounded-2xl w-full h-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bg4})` }}>
                <div className="absolute inset-0 bg-black/65"></div>
                <div className="relative z-10 flex justify-center items-center h-full">
                    <h1 className="text-white text-xl md:text-4xl font-bold">700+ Happy customers</h1>
                </div>
            </div>
        </div>



        <div className='col-span-4 bg-gray-500 hover:scale-95 rounded-2xl'>
            <div className="relative rounded-2xl w-full h-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bg5})` }}>
                <div className="absolute inset-0 bg-black/65"></div>
                <div className="relative z-10 flex justify-center items-center h-full">
                    <h1 className="text-white text-xl md:text-4xl font-bold">Cash On Delivery</h1>
                </div>
            </div>
        </div>

    </div>
  </div>)
}

export default Testimonial