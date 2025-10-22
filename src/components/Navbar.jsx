import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-orange-500">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            EventHub
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="text-white hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/admin" className="text-white hover:text-orange-500 transition-colors">Admin</Link>
            <Link to="/gallery" className="text-white hover:text-orange-500 transition-colors">Gallery</Link>
            <Link to="/contact" className="text-white hover:text-orange-500 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar