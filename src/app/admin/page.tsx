"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { AdminLogin } from "@/components/admin/AdminLogin"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/me', {
          credentials: 'include'
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setIsAuthenticated(false)
      router.push('/admin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-offWhiteBlue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-deepBlue mx-auto mb-4"></div>
          <p className="text-neutral-bodyText">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-offWhiteBlue">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
} 