"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { H2, Body16 } from "@/components/common/Typography"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        onLoginSuccess()
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-2 border-primary-deepBlue flex items-center justify-center bg-white mx-auto mb-6">
            <div className="text-center">
              <div className="text-body-12 font-dm-sans font-semibold text-primary-deepBlue leading-tight">
                AADU<br />
                ADMIN
              </div>
            </div>
          </div>
          <H2 className="text-primary-deepBlue mb-2">
            Admin Login
          </H2>
          <Body16 className="text-neutral-bodyText">
            Sign in to access the admin dashboard
          </Body16>
        </div>

        <div className="bg-white rounded-[25px] shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-bodyText mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-bodyText mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-lightGray rounded-2xl focus:ring-2 focus:ring-primary-dodgerBlue focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary-deepBlue hover:bg-primary-deepBlue/90 text-white"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 