import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 h-15 flex  bottom-0  fixed w-full items-center flex-col' >
      <div className='font-bold text-2xl' >
            <span className='text-green-600'>&lt;</span>
            <span className='text-white' >Pass</span>
            <span className='text-green-600'>OP</span>
            <span className='text-green-600' >/&gt;</span>
          </div>
      <div className='flex gap-1    h-15  text-white '>
        <h1 >Created with </h1>
        <img className='size-5 mt-1 ' src="icons/heart.png" alt="" />
        <h1>by Rajesh Pandey</h1>
    </div>


    </div>
    

  
    
  )
}

export default Footer
