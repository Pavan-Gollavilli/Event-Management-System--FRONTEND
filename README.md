# Event Management System

A full-stack event management application built with React, Node.js, Express, and MongoDB.

## Features

- **Navbar**: Event Management logo, Home, Admin, Event Gallery, Contact
- **Admin Dashboard**: Add, edit, delete events
- **Event Management**: Name, venue, date, time, capacity, description
- **User Registration**: Join events with remaining slots display
- **Event Categories**: Upcoming, Present, Past events
- **MongoDB Integration**: All events stored in database

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system

4. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Usage

1. **Home Page**: View all events with filtering options (All, Upcoming, Present, Past)
2. **Admin Dashboard**: Access at `/admin` to manage events
3. **Event Registration**: Click "Register" on any available event
4. **Event Gallery**: View all events in a gallery format
5. **Contact**: Contact form and information

## API Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/register` - Register for event

## Technologies Used

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Development**: Vite, Nodemon
