import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MapPin, Calendar, Clock, Users } from 'lucide-react'

const EventRegister = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events')
      const foundEvent = response.data.find(e => e._id === id)
      setEvent(foundEvent)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching event:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:5000/api/events/${id}/register`, formData)
      setMessage('Successfully registered for the event!')
      setTimeout(() => navigate('/'), 2000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed')
    }
  }

  if (loading) return <div className="text-center py-12 text-white">Loading...</div>
  if (!event) return <div className="text-center py-12 text-white">Event not found</div>

  const remainingSlots = event.capacity - event.registeredUsers.length

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-orange-500 transition-all duration-300">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Register for Event</h1>
        
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h2 className="text-xl font-bold text-white mb-2">{event.name}</h2>
          <div className="text-gray-300 space-y-1">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <strong>Time:</strong> {event.time}
            </p>
            <p className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" />
              <strong>Available Slots:</strong> {remainingSlots}/{event.capacity}
            </p>
          </div>
          <p className="mt-3 text-gray-400">{event.description}</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-4 ${
            message.includes('Successfully') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {message}
          </div>
        )}

        {remainingSlots > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-orange-500 text-black px-6 py-3 rounded hover:bg-orange-600 transition-colors font-medium"
              >
                Register Now
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-400 text-lg font-semibold">This event is fully booked!</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors font-medium"
            >
              Back to Events
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventRegister