import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/footer'
import Productslist from '../productslist/productslist'

const Homepage = () => {
  return (
    <div>
    <Navbar/>
     <Productslist />
    <Footer/>
   
    </div>
  
  )
}

export default Homepage