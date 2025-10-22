import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventList from './pages/EventList'
import AdminDashboard from './pages/AdminDashboard'
import EventGallery from './pages/EventGallery'
import Contact from './pages/Contact'
import EventRegister from './pages/EventRegister'

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    setIsLoaded(true)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-black">

        <Navbar />
        <main className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/gallery" element={<EventGallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register/:id" element={<EventRegister />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App