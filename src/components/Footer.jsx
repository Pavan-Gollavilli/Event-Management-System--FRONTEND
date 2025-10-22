import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-orange-500 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">
              EventHub
            </h3>
            <p className="text-gray-400 mb-4">
              Your premier destination for discovering and managing amazing events. Join thousands of event enthusiasts today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="/gallery" className="text-gray-400 hover:text-orange-500 transition-colors">Event Gallery</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact Us</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-orange-500 transition-colors">Admin Portal</a></li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Event Types</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Hackathons</span></li>
              <li><span className="text-gray-400">Workshops</span></li>
              <li><span className="text-gray-400">Codethons</span></li>
              <li><span className="text-gray-400">Cultural Events</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">123 Event Street, City</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-sm">info@eventhub.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Mon-Fri: 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500">
            &copy; 2025 EventHub. All rights reserved. | Built for event enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer