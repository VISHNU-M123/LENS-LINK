import React from 'react'

const CategoryCard = ({ title, image, count }) => {
  return (
    <div>
      <div className='flex flex-col items-center max-w-[360px]'>
        <img src={image} alt="" />
        <div className='flex flex-col items-center bg-[#151414] w-full py-5 gap-2'>
          <h1 className='text-white font-[700] text-[24px]'>{title}</h1>
          <p className='text-[#ec0a30] text-[17px]'>{count}</p>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
