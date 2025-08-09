"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Mock user data for demo
      setUser({
        id: 1,
        name: 'John Doe',
        email: 'john@clinic.com',
        role: 'admin'
      })
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    // Mock login for demo
    setUser({
      id: 1,
      name: 'John Doe',
      email: 'john@clinic.com',
      role: 'admin'
    })
    localStorage.setItem('token', 'mock-token')
    return { success: true }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      user: null,
      login: async () => ({ success: false }),
      logout: async () => {},
      loading: true,
    }
  }
  return context
}
