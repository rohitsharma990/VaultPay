import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound 