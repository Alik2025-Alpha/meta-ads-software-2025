import React from 'react'
import { Link } from 'react-router-dom'
import { FiAlertTriangle, FiHome } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <FiAlertTriangle className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Page Not Found</h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center"
          >
            <FiHome className="mr-2" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
