import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiMenu, FiX, FiSun, FiMoon, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'

export default function Header() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  // Check for dark mode preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [])
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Campaign Approved',
      message: 'Your "Summer Sale" campaign has been approved and is now running.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Budget Alert',
      message: 'Your "New Product Launch" campaign has reached 80% of its budget.',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Performance Update',
      message: 'Your campaigns have generated 24 conversions in the last 24 hours.',
      time: '1 day ago',
      read: true
    }
  ]

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center md:hidden">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Meta Ads Manager</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            
            {/* Notifications */}
            <div className="relative ml-3">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen)
                  setUserMenuOpen(false)
                }}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none relative"
              >
                <FiBell className="h-5 w-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                              notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'
                            }`}
                          >
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View all notifications
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* User menu */}
            <div className="relative ml-3">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen)
                  setNotificationsOpen(false)
                }}
                className="flex items-center max-w-xs text-sm rounded-full focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm font-medium uppercase">
                  {currentUser?.email?.charAt(0) || 'U'}
                </div>
              </button>
              
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {currentUser?.email || 'User'}
                      </p>
                    </div>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <FiSettings className="mr-2 h-4 w-4" />
                        Settings
                      </div>
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <FiUser className="mr-2 h-4 w-4" />
                        Profile
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center">
                        <FiLogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/connect-account"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connect Account
            </Link>
            <Link
              to="/website-analysis"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Website Analysis
            </Link>
            <Link
              to="/ad-library"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ad Library
            </Link>
            <Link
              to="/ad-generator"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ad Generator
            </Link>
            <Link
              to="/campaigns"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Campaigns
            </Link>
            <Link
              to="/settings"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
