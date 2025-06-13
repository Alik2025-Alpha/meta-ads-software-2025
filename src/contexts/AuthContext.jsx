import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock authentication functions
  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({ email })
        localStorage.setItem('user', JSON.stringify({ email }))
        resolve()
      }, 1000)
    })
  }

  const register = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({ email })
        localStorage.setItem('user', JSON.stringify({ email }))
        resolve()
      }, 1000)
    })
  }

  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null)
        localStorage.removeItem('user')
        resolve()
      }, 500)
    })
  }

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
