import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMetaAccounts } from '../contexts/MetaAccountsContext'
import { 
  FiHome, 
  FiLink, 
  FiSearch, 
  FiDatabase, 
  FiTarget, 
  FiBarChart2, 
  FiSettings,
  FiChevronDown,
  FiExternalLink
} from 'react-icons/fi'

export default function Sidebar() {
  const location = useLocation()
  const { connectedAccounts, selectedAccount, selectAccount } = useMetaAccounts()
  const [accountsDropdownOpen, setAccountsDropdownOpen] = React.useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/connect-account', icon: FiLink, label: 'Connect Account' },
    { path: '/website-analysis', icon: FiSearch, label: 'Website Analysis' },
    { path: '/ad-library', icon: FiDatabase, label: 'Ad Library' },
    { path: '/ad-generator', icon: FiTarget, label: 'Ad Generator' },
    { path: '/campaigns', icon: FiBarChart2, label: 'Campaigns' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ]

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Meta Ads Manager</h1>
            </div>
            
            {/* Account selector */}
            {connectedAccounts.length > 0 && (
              <div className="px-4 mb-6">
                <div 
                  className="flex items-center justify-between p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer"
                  onClick={() => setAccountsDropdownOpen(!accountsDropdownOpen)}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                      {selectedAccount?.name.charAt(0) || 'A'}
                    </div>
                    <div className="ml-2 truncate">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {selectedAccount?.name || 'Select Account'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedAccount?.adAccounts?.length || 0} ad accounts
                      </p>
                    </div>
                  </div>
                  <FiChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${accountsDropdownOpen ? 'transform rotate-180' : ''}`} />
                </div>
                
                {accountsDropdownOpen && (
                  <div className="mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                    {connectedAccounts.map((account) => (
                      <div 
                        key={account.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                          selectedAccount?.id === account.id ? 'bg-gray-100 dark:bg-gray-600' : ''
                        }`}
                        onClick={() => {
                          selectAccount(account.id)
                          setAccountsDropdownOpen(false)
                        }}
                      >
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                            {account.name.charAt(0)}
                          </div>
                          <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {account.name}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-2">
                      <Link 
                        to="/connect-account"
                        className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        onClick={() => setAccountsDropdownOpen(false)}
                      >
                        <FiExternalLink className="mr-2 h-4 w-4" />
                        Connect New Account
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.path)
                      ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.path)
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                    }`}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* User info */}
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <Link to="/settings" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm font-medium uppercase">
                    JD
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    John Doe
                  </p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    View settings
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
