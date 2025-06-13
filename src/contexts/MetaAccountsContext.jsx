import React, { createContext, useContext, useState, useEffect } from 'react'

const MetaAccountsContext = createContext()

export function useMetaAccounts() {
  return useContext(MetaAccountsContext)
}

export function MetaAccountsProvider({ children }) {
  const [connectedAccounts, setConnectedAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data for connected accounts
  const mockAccounts = [
    {
      id: '1',
      name: 'Business Manager 1',
      status: 'active',
      adAccounts: [
        { id: '101', name: 'Ad Account 1', status: 'active' },
        { id: '102', name: 'Ad Account 2', status: 'active' }
      ]
    },
    {
      id: '2',
      name: 'Business Manager 2',
      status: 'active',
      adAccounts: [
        { id: '201', name: 'Ad Account 3', status: 'active' }
      ]
    }
  ]

  // Load mock data on initial render
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConnectedAccounts(mockAccounts)
      if (mockAccounts.length > 0) {
        setSelectedAccount(mockAccounts[0])
      }
      setLoading(false)
    }, 1000)
  }, [])

  // Connect a new account
  const connectAccount = (accountDetails) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAccount = {
          id: `${Date.now()}`,
          name: accountDetails.name,
          status: 'active',
          adAccounts: []
        }
        
        setConnectedAccounts(prev => [...prev, newAccount])
        setSelectedAccount(newAccount)
        resolve(newAccount)
      }, 1500)
    })
  }

  // Disconnect an account
  const disconnectAccount = (accountId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setConnectedAccounts(prev => prev.filter(account => account.id !== accountId))
        
        if (selectedAccount && selectedAccount.id === accountId) {
          const remainingAccounts = connectedAccounts.filter(account => account.id !== accountId)
          setSelectedAccount(remainingAccounts.length > 0 ? remainingAccounts[0] : null)
        }
        
        resolve()
      }, 1000)
    })
  }

  // Select an account
  const selectAccount = (accountId) => {
    const account = connectedAccounts.find(acc => acc.id === accountId)
    if (account) {
      setSelectedAccount(account)
    }
  }

  const value = {
    connectedAccounts,
    selectedAccount,
    loading,
    connectAccount,
    disconnectAccount,
    selectAccount
  }

  return (
    <MetaAccountsContext.Provider value={value}>
      {children}
    </MetaAccountsContext.Provider>
  )
}
