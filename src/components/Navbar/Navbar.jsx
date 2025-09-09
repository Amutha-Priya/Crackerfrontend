import React from 'react'
// import { Search } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <h1>🎆 Crackers</h1>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/offers">Offers</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {/* Right side */}
      <div className="right-section">
        <div className="search-box">
          <input type="text" placeholder="Search crackers..." />
          {/* <Search className="search-icon" /> */}
        </div>
        <div className="cart-icon">
         
          <span className="cart-count">2</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar