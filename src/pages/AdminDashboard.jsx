import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MapPin, Calendar, Clock, Users } from 'lucide-react'

const AdminDashboard = () => {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [viewingRegistrations, setViewingRegistrations] = useState(null)
  const [uploadingPhotos, setUploadingPhotos] = useState(null)
  const [formData, setFormData] = useState({
    name: '', venue: '', date: '', time: '', capacity: '', description: '', status: 'upcoming'
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events')
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingEvent) {
        await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, formData)
      } else {
        await axios.post('http://localhost:5000/api/events', formData)
      }
      fetchEvents()
      resetForm()
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`)
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      name: event.name,
      venue: event.venue,
      date: event.date.split('T')[0],
      time: event.time,
      capacity: event.capacity,
      description: event.description,
      status: event.status || 'upcoming'
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({ name: '', venue: '', date: '', time: '', capacity: '', description: '', status: 'upcoming' })
    setEditingEvent(null)
    setShowForm(false)
  }

  const handlePhotoUpload = async (eventId, files) => {
    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('photos', file)
    })
    
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      fetchEvents()
      setUploadingPhotos(null)
    } catch (error) {
      console.error('Error uploading photos:', error)
    }
  }

  const handleDeletePhoto = async (eventId, photoIndex) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}/photos/${photoIndex}`)
      fetchEvents()
    } catch (error) {
      console.error('Error deleting photo:', error)
    }
  }



  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-orange-500 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white">Manage your events efficiently</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-black px-6 py-3 rounded hover:bg-orange-600 transition-colors font-medium"
        >
          Add Event
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={formData.venue}
              onChange={(e) => setFormData({...formData, venue: e.target.value})}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
              required
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded col-span-2 focus:border-orange-500 focus:outline-none"
              rows="3"
              required
            />
            <div className="col-span-2 flex gap-4">
              <button type="submit" className="bg-orange-500 text-black px-6 py-3 rounded hover:bg-orange-600 transition-colors font-medium">
                {editingEvent ? 'Update' : 'Create'} Event
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {uploadingPhotos && (
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              Upload Photos - {uploadingPhotos.name}
            </h2>
            <button
              onClick={() => setUploadingPhotos(null)}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
          
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handlePhotoUpload(uploadingPhotos._id, e.target.files)}
              className="bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none w-full"
            />
          </div>
          
          {uploadingPhotos.photos && uploadingPhotos.photos.length > 0 && (
            <div>
              <h3 className="text-white mb-3">Current Photos:</h3>
              <div className="grid grid-cols-3 gap-4">
                {uploadingPhotos.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`http://localhost:5000${photo}`}
                      alt={`Event photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => handleDeletePhoto(uploadingPhotos._id, index)}
                      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {viewingRegistrations && (
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              Registered Users - {viewingRegistrations.name}
            </h2>
            <button
              onClick={() => setViewingRegistrations(null)}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
          
          {viewingRegistrations.registeredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">S.No</th>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingRegistrations.registeredUsers.map((user, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{user.name || user}</td>
                      <td className="py-2">{user.email || 'N/A'}</td>
                      <td className="py-2">{user.phone || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No registrations yet.</p>
          )}
        </div>
      )}

      <div className="grid gap-4">
        {events.map(event => (
          <div key={event._id} className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:border-orange-500 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                <div className="flex flex-wrap gap-4 text-gray-300 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    {event.venue}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-orange-500" />
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-sm text-orange-400 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Registered: {event.registeredUsers.length}/{event.capacity}
                  </p>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                    event.status === 'ongoing' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
                  </span>
                </div>
                <p className="text-gray-400">{event.description}</p>
              </div>
              <div className="flex flex-col gap-3 ml-4">
                {event.status !== 'completed' && (
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition-colors font-medium"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => setViewingRegistrations(event)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  View Users
                </button>
                {event.status === 'completed' && (
                  <button
                    onClick={() => setUploadingPhotos(event)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors font-medium"
                  >
                    Add Photos
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard