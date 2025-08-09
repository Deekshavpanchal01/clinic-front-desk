"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const auth = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    patientsInQueue: 12,
    todayAppointments: 24,
    availableDoctors: 8,
  })
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    if (!auth.user) {
      router.push('/login')
      return;
    }

    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [auth.user, isClient, router])

  if (!isClient || auth.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!auth.user) {
    return null // Will redirect in useEffect
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {auth.user.name}! Here's what's happening today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Patients in Queue</h3>
                <p className="text-3xl font-bold mt-1">{stats.patientsInQueue}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Today's Appointments</h3>
                <p className="text-3xl font-bold mt-1">{stats.todayAppointments}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-cyan-100 text-cyan-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86-.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Available Doctors</h3>
                <p className="text-3xl font-bold mt-1">{stats.availableDoctors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mb-8">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/queue" className="btn btn-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Manage Queue
            </a>
            <a href="/appointments" className="btn btn-secondary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Book Appointment
            </a>
            <a href="/doctors" className="btn btn-success flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              View Doctors
            </a>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
          </div>
          <div className="card-body">
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-indigo-600 truncate">Dr. Sarah Johnson</p>
                      <p className="text-sm text-gray-500 truncate">John Smith - 10:30 AM</p>
                    </div>
                    <div>
                      <span className="badge badge-primary">Confirmed</span>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-indigo-600 truncate">Dr. Michael Chen</p>
                      <p className="text-sm text-gray-500 truncate">Emily Davis - 11:45 AM</p>
                    </div>
                    <div>
                      <span className="badge badge-warning">Pending</span>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-indigo-600 truncate">Dr. Lisa Williams</p>
                      <p className="text-sm text-gray-500 truncate">Robert Brown - 2:15 PM</p>
                    </div>
                    <div>
                      <span className="badge badge-success">Completed</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <a href="/appointments" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all appointments
            </a>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900">Queue Status</h2>
          </div>
          <div className="card-body">
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">#101 - Mary Johnson</p>
                      <p className="text-sm text-gray-500 truncate">Waiting for 15 min</p>
                    </div>
                    <div>
                      <span className="badge badge-warning">Waiting</span>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">#102 - David Wilson</p>
                      <p className="text-sm text-gray-500 truncate">With Dr. Sarah Johnson</p>
                    </div>
                    <div>
                      <span className="badge badge-primary">In Progress</span>
                    </div>
                  </div>
                </li>
                <li className="py-4 bg-red-50">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">#103 - James Taylor</p>
                      <p className="text-sm text-gray-500 truncate">Urgent case</p>
                    </div>
                    <div>
                      <span className="badge badge-danger">Urgent</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <a href="/queue" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Manage queue
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
