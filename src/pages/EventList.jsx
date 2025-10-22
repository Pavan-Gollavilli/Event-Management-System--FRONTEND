import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MapPin, Calendar, Clock, Users, CheckCircle } from 'lucide-react'

const EventList = () => {
  const [events, setEvents] = useState([])
  const [selectedEventType, setSelectedEventType] = useState(null)

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
    // Use admin-set status if available, otherwise calculate from date
    if (event.status) {
      if (event.status === 'completed') return 'past'
      if (event.status === 'ongoing') return 'present'
      return 'upcoming'
    }
    
    const eventDate = new Date(event.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    eventDate.setHours(0, 0, 0, 0)
    
    if (eventDate < today) return 'past'
    if (eventDate.getTime() === today.getTime()) return 'present'
    return 'upcoming'
  }

  const getRemainingSlots = (event) => {
    return event.capacity - event.registeredUsers.length
  }

  const eventTypes = ['Hackathon', 'Workshop', 'Codethon', 'Cultural', 'Other']

  const getEventsByType = (type) => {
    return events.filter(event => {
      const name = event.name.toLowerCase()
      if (type === 'Hackathon') return name.includes('hackathon')
      if (type === 'Workshop') return name.includes('workshop')
      if (type === 'Codethon') return name.includes('codethon')
      if (type === 'Cultural') return name.includes('cultural') || name.includes('culture')
      if (type === 'Other') return !name.includes('hackathon') && !name.includes('workshop') && !name.includes('codethon') && !name.includes('cultural') && !name.includes('culture')
      return false
    })
  }

  const groupEventsByStatus = (eventList) => {
    const present = eventList.filter(event => getEventStatus(event) === 'present')
    const upcoming = eventList.filter(event => getEventStatus(event) === 'upcoming')
    const past = eventList.filter(event => getEventStatus(event) === 'past')
    return { present, upcoming, past }
  }

  const renderEventCard = (event) => {
    const status = getEventStatus(event)
    const remainingSlots = getRemainingSlots(event)
    
    return (
      <div key={event._id} className="bg-gradient-to-br from-gray-800 to-gray-900 border-l-4 border-orange-500 rounded-xl p-6 shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white pr-4">{event.name}</h3>
          <span className={`px-4 py-2 text-sm font-semibold rounded-full ${
            status === 'upcoming' ? 'bg-green-500 text-white' :
            status === 'present' ? 'bg-orange-500 text-black' :
            'bg-gray-600 text-white'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-300">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <MapPin className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-sm">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Calendar className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-sm">{event.time}</span>
          </div>
        </div>
        
        <p className="text-gray-400 mb-6 line-clamp-2">{event.description}</p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            {status === 'past' ? (
              <span className="flex items-center gap-2 text-gray-500 bg-gray-700 px-3 py-1 rounded-full text-sm">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            ) : (
              <>
                <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  remainingSlots > 0 ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                }`}>
                  <Users className="w-4 h-4" />
                  {remainingSlots > 0 ? `${remainingSlots} slots left` : 'Fully Booked'}
                </span>
                <span className="text-gray-500 text-sm">{event.registeredUsers.length}/{event.capacity}</span>
              </>
            )}
          </div>
          
          {status !== 'past' && remainingSlots > 0 && (
            <Link
              to={`/register/${event._id}`}
              className="bg-orange-500 text-black px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-orange-500/25"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    )
  }

  const renderEventSection = (title, eventList, bgColor) => {
    if (eventList.length === 0) return null
    
    return (
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${bgColor}`}>{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {eventList.map(renderEventCard)}
        </div>
      </div>
    )
  }

  const allGroupedEvents = groupEventsByStatus(events)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          Discover Events
        </h1>
        <p className="text-white">Find and join amazing events happening around you</p>
      </div>
      
      <div className="mb-8">
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setSelectedEventType(null)}
            className={`px-6 py-2 rounded ${!selectedEventType ? 'bg-orange-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            All Events
          </button>
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedEventType(type)}
              className={`px-6 py-2 rounded ${selectedEventType === type ? 'bg-orange-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {selectedEventType ? (
        <div>
          <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">{selectedEventType} Events</h2>
          {(() => {
            const typeEvents = getEventsByType(selectedEventType)
            const groupedEvents = groupEventsByStatus(typeEvents)
            
            return (
              <>
                {renderEventSection('Present Events', groupedEvents.present, 'text-orange-500')}
                {renderEventSection('Upcoming Events', groupedEvents.upcoming, 'text-green-400')}
                {renderEventSection('Past Events', groupedEvents.past, 'text-gray-400')}
              </>
            )
          })()}
        </div>
      ) : (
        <>
          {renderEventSection('Present Events', allGroupedEvents.present, 'text-orange-500')}
          {renderEventSection('Upcoming Events', allGroupedEvents.upcoming, 'text-green-400')}
          {renderEventSection('Past Events', allGroupedEvents.past, 'text-gray-400')}
        </>
      )}
      
      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found.</p>
        </div>
      )}
    </div>
  )
}

export default EventList