import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMetaAccounts } from '../contexts/MetaAccountsContext'
import { useAdAccount } from '../contexts/AdAccountContext'
import { 
  FiHome, FiLink, FiSearch, FiImage, FiPlusCircle, 
  FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX, 
  FiMoon, FiSun, FiChevronDown
} from 'react-icons/fi'

export default function Layout({ children }) {
  const { currentUser, logout } = useAuth()
  const { connectedAccounts, selectedAccount, selectAccount } = useMetaAccounts()
  const { adAccounts, selectedAdAccount, selectAdAccount } = useAdAccount()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Connect Account', href: '/connect-account', icon: FiLink },
    { name: 'Website Analysis', href: '/website-analysis', icon: FiSearch },
    { name: 'Ad Library', href: '/ad-library', icon: FiImage },
    { name: 'Ad Generator', href: '/ad-generator', icon: FiPlusCircle },
    { name: 'Campaigns', href: '/campaigns', icon: FiBarChart2 },
    { name: 'Settings', href: '/settings', icon: FiSettings }
  ]

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Mobile sidebar */}
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 flex">
            {/* Sidebar overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}
            
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Meta Ads Manager</span>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        location.pathname === item.href
                          ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          location.pathname === item.href
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                        }`}
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm font-medium uppercase">
                        {currentUser?.email?.charAt(0) || 'U'}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentUser?.email || 'User'}
                      </p>
                      <button
                        onClick={handleLogout}
                        className="text-xs font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center mt-1"
                      >
                        <FiLogOut className="mr-1 h-3 w-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow">
            <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Meta Ads Manager</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        location.pathname === item.href
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm font-medium uppercase">
                      {currentUser?.email?.charAt(0) || 'U'}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {currentUser?.email || 'User'}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center mt-1"
                    >
                      <FiLogOut className="mr-1 h-3 w-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Top navigation */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
            <button
              type="button"
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FiMenu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex items-center">
                {/* Account selector */}
                {connectedAccounts.length > 0 && (
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                    >
                      <span className="mr-1">Account:</span>
                      <span className="font-medium">{selectedAccount?.name || 'Select Account'}</span>
                      <FiChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    
                    {accountDropdownOpen && (
                      <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          {connectedAccounts.map((account) => (
                            <button
                              key={account.id}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                selectedAccount?.id === account.id
                                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => {
                                selectAccount(account.id)
                                setAccountDropdownOpen(false)
                              }}
                            >
                              {account.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="ml-4 flex items-center md:ml-6">
                {/* Dark mode toggle */}
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <FiSun className="h-6 w-6" />
                  ) : (
                    <FiMoon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
