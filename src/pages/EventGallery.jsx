import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MapPin, Calendar, Users, CheckCircle, Image, X, Check, Camera, Trash2 } from 'lucide-react'

const EventGallery = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const isAdmin = true // Set based on user role

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

  const getEventStatus = (event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    eventDate.setHours(0, 0, 0, 0)
    
    if (eventDate < today) return 'completed'
    return 'upcoming'
  }

  const handleDeletePhoto = async (eventId, photoIndex) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}/photos/${photoIndex}`)
      fetchEvents()
      // Update selectedEvent to reflect changes
      const updatedEvent = events.find(e => e._id === eventId)
      if (updatedEvent) {
        setSelectedEvent({...updatedEvent, photos: updatedEvent.photos.filter((_, i) => i !== photoIndex)})
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
    }
  }

  // Filter only completed events with photos for gallery
  const pastEvents = events.filter(event => 
    (event.status === 'completed' || getEventStatus(event) === 'completed') && 
    event.photos && event.photos.length > 0
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">Event Gallery</h1>
        <p className="text-white">Memories from our completed events</p>
      </div>
      
      {pastEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pastEvents.map(event => (
            <div 
              key={event._id} 
              onClick={() => setSelectedEvent(event)}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={`http://localhost:5000${event.photos[0]}`} 
                  alt={event.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                    <Check className="w-3 h-3" /> Completed
                  </span>
                </div>
                {event.photos.length > 1 && (
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 text-white px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
                      <Camera className="w-3 h-3" /> {event.photos.length} Photos
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">{event.name}</h3>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-orange-500">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-semibold">{event.registeredUsers.length} Participants</span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    Click to view gallery
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Photos Available</h3>
            <p className="text-gray-400">Gallery will show completed events with uploaded photos</p>
          </div>
        </div>
      )}
      
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">{selectedEvent.name}</h2>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedEvent.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={`http://localhost:5000${photo}`}
                      alt={`${selectedEvent.name} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePhoto(selectedEvent._id, index)
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventGallery