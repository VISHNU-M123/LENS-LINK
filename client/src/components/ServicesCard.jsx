import React from 'react'

const ServicesCard = ({title, description, image}) => {
  return (
    <div className='p-2.5 max-w-md shadow-lg bg-[#151414]'>
      <div className='flex flex-col justify-center'>
        <img src={image} alt="" />
        <div className='py-6'>
            <h1 className='text-center text-[30px] font-[700] text-white'>{title}</h1>
            <p className='text-center text-zinc-500 text-[15px] font-[400] leading-7 mt-1'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ServicesCard
