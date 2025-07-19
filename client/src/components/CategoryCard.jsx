import React from 'react'

const CategoryCard = ({ title, image, count }) => {
  return (
    <div>
      <div className='flex flex-col items-center max-w-[360px]'>
        <img src={image} alt="" />
        <div className='flex flex-col items-center bg-[#f5f5f5] w-full py-5 gap-2'>
          <h1 className='text-[#111111] font-[700] text-[24px]'>{title}</h1>
          <p className='text-[#009603] text-[17px]'>{count}</p>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
