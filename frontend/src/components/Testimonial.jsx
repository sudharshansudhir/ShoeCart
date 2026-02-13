import React from 'react'
import bg1 from "/fast-delivery.jpg"
import bg2 from "/return policy.png"
import bg3 from "/quality.jpg"
import bg4 from "/customers.jpg"
import bg5 from "/COD.jpeg"
import whyus from "/WhyUs.png"

const Testimonial = () => {
  return (

    <div
      className='bg-cover pb-6 md:pb-8 my-8 md:my-16 px-4 md:px-10'
      style={{ backgroundImage: `url(${whyus})` }}
    >

      {/* TITLE */}

      <div className='flex items-center my-8 justify-center'>
        <h1 className='text-3xl md:text-7xl text-center'>Why Us ?</h1>
      </div>



      {/* GRID */}

      <div
        className='
        grid
        gap-3

        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-12

        auto-rows-[220px]
        sm:auto-rows-[260px]
        md:h-[700px]
      '>

        {/* Fast Delivery */}
        <div className='md:col-span-5 rounded-2xl hover:scale-95 transition'>
          <Card image={bg1} title="Fast Delivery" />
        </div>

        {/* Return */}
        <div className='md:col-span-3 rounded-2xl hover:scale-95 transition'>
          <Card image={bg2} title="7 Return Policy" />
        </div>

        {/* Quality */}
        <div className='md:col-span-4 md:row-span-2 rounded-2xl hover:scale-95 transition'>
          <Card image={bg3} title="Quality" />
        </div>

        {/* Customers */}
        <div className='md:col-span-4 rounded-2xl hover:scale-95 transition'>
          <Card image={bg4} title="700+ Happy customers" />
        </div>

        {/* COD */}
        <div className='md:col-span-4 rounded-2xl hover:scale-95 transition'>
          <Card image={bg5} title="Cash On Delivery" />
        </div>

      </div>

    </div>
  )
}



/* Reusable card — NOT a UI change.
Just removing repeated markup safely.
*/

const Card = ({ image, title }) => (

  <div
    className="relative rounded-2xl w-full h-full overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: `url(${image})` }}
  >

    <div className="absolute inset-0 bg-black/65"></div>

    <div className="relative z-10 flex justify-center items-center h-full p-4">
      <h1 className="text-white text-xl md:text-4xl font-bold text-center">
        {title}
      </h1>
    </div>

  </div>
)

export default Testimonial
