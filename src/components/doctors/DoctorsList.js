"use client"

import { useState, useEffect } from 'react'
import DoctorCard from './DoctorCard'
import DoctorDetails from './DoctorDetails'

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    available: false,
  })

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
          availability: 'Mon-Fri, 9AM-5PM',
          gender: 'Female',
          bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience. She specializes in interventional cardiology and has published numerous research papers in the field.'
        },
        { 
          id: 2, 
          name: 'Dr. Michael Chen', 
          specialization: 'Dermatology', 
          available: true,
          location: 'Room 102',
          availability: 'Mon-Thu, 10AM-6PM',
          gender: 'Male',
          bio: 'Dr. Michael Chen is a dermatologist specializing in both medical and cosmetic dermatology. He has expertise in treating skin cancer, acne, and other skin conditions.'
        },
        { 
          id: 3, 
          name: 'Dr. Lisa Williams', 
          specialization: 'Pediatrics', 
          available: false,
          location: 'Room 103',
          availability: 'Tue-Fri, 8AM-4PM',
          gender: 'Female',
          bio: 'Dr. Lisa Williams is a pediatrician with a passion for working with children. She has been in practice for over 10 years and is known for her compassionate care.'
        },
        { 
          id: 4, 
          name: 'Dr. Robert Brown', 
          specialization: 'Orthopedics', 
          available: true,
          location: 'Room 104',
          availability: 'Mon-Fri, 8AM-4PM',
          gender: 'Male',
          bio: 'Dr. Robert Brown is an orthopedic surgeon specializing in sports medicine and joint replacement. He has helped numerous athletes recover from injuries and return to their sport.'
        },
        { 
          id: 5, 
          name: 'Dr. Emily Davis', 
          specialization: 'Gynecology', 
          available: true,
          location: 'Room 105',
          availability: 'Mon, Wed, Fri, 9AM-5PM',
          gender: 'Female',
          bio: 'Dr. Emily Davis is a gynecologist with expertise in women health. She provides comprehensive care for women of all ages.'
        },
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const filteredDoctors = doctors.filter(doctor => {
    return (
      (!filters.specialization || doctor.specialization.toLowerCase().includes(filters.specialization.toLowerCase())) &&
      (!filters.location || doctor.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.available || doctor.available)
    )
  })

  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))]
  const locations = [...new Set(doctors.map(doctor => doctor.location))]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="card mb-8">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">Filter Doctors</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <select
                name="specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={filters.available}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                  Available Only
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            onViewDetails={setSelectedDoctor} 
          />
        ))}
      </div>
      
      {filteredDoctors.length === 0 && (
        <div className="card mt-8">
          <div className="card-body">
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors match your filters</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to find what you are looking for.</p>
            </div>
          </div>
        </div>
      )}
      
      {selectedDoctor && (
        <DoctorDetails 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      )}
    </div>
  )
}
