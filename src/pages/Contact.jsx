import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Twitter, Facebook, Linkedin } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">Contact Us</h1>
        <p className="text-white">Get in touch with our team</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-orange-500 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Send Message</h2>
          
          {submitted && (
            <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
                placeholder="What is this about?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded focus:border-orange-500 focus:outline-none"
                placeholder="Tell us more about your inquiry..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-500 text-black py-3 rounded hover:bg-orange-600 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Address</h3>
                <p className="text-gray-400">123 Event Street<br />City, State 12345</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Phone className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Mail className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <p className="text-gray-400">info@eventhub.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Office Hours</h3>
                <p className="text-gray-400">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 text-orange-500" />
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5 text-orange-500" />
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact