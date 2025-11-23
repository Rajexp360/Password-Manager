import React from "react"
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager' 
import Footer from './components/Footer'
   function App() {
  const [count, setCount] = useState(0)

  return (

    <>
    
      <div className='min-h-[85vh] md:px-2 md:p-0'>
              <Navbar/>

      <Manager/>
            <Footer/>



      </div>
 
 
    </>
   
  )
  
}

export default App
