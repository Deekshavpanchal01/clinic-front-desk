"use client"

import { useState, useEffect } from 'react'

export default function DoctorList({ onSelectDoctor }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDoctors([
        { 
          id: 1, 
          name: 'Dr. Sarah Johnson', 
          specialization: 'Cardiology', 
          available: true,
          location: 'Room 101',
          nextAvailable: '10:30 AM'
        },
        { 
          id: 2, 
          name: 'Dr. Michael Chen', 
          specialization: 'Dermatology', 
          available: true,
          location: 'Room 102',
          nextAvailable: '11:00 AM'
        },
        { 
          id: 3, 
          name: 'Dr. Lisa Williams', 
          specialization: 'Pediatrics', 
          available: false,
          location: 'Room 103',
          nextAvailable: '2:00 PM'
        },
        { 
          id: 4, 
          name: 'Dr. Robert Brown', 
          specialization: 'Orthopedics', 
          available: true,
          location: 'Room 104',
          nextAvailable: '9:45 AM'
        },
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold text-gray-900">Available Doctors</h2>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map(doctor => (
            <div 
              key={doctor.id} 
              className={`border rounded-lg p-4 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-lg ${
                doctor.available 
                  ? 'border-indigo-200 bg-white hover:border-indigo-300' 
                  : 'bg-gray-100 border-gray-200 opacity-70'
              }`}
              onClick={() => doctor.available && onSelectDoctor(doctor)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{doctor.specialization}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {doctor.location}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doctor.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              {doctor.available && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Next available:</span>
                    <span className="text-sm font-medium text-indigo-600">{doctor.nextAvailable}</span>
                  </div>
                  <button className="mt-3 w-full btn btn-primary text-sm">
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
