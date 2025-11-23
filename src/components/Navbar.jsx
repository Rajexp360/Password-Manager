import React from 'react'

export const Navbar = () => {
  return (
    
       <nav className='bg-slate-800  w-full  h-15' >
        <div className=' flex  justify-between items-center py-3 '>

          <div className='font-bold ml-2 text-2xl' >
            <span className='text-green-600'>&lt;</span>
            <span className='text-white' >Pass</span>
            <span className='text-green-600'>OP</span>
            <span className='text-green-600' >/&gt;</span>
          </div>
          {/* <ul>
            <li className='flex gap-4 text-white'>
              <a href="" className='hover:font-bold'>Home</a>
              <a href="" className='hover:font-bold'>About</a>
              <a href="" className='hover:font-bold'>Contact</a>
            </li>
          </ul> */}
             

            
          <button className='bg-green-600 mr-4  rounded-full py-1  flex'>
            <img  className='w-13 invert' src="/icons/github.png" alt="" />
            <span className='font-bold pr-4 text-white '>Github</span>
          </button>
          </div>
 
      </nav>



   )
}
export default Navbar

