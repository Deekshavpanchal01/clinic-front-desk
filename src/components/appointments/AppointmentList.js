"use client"

import { useState, useEffect } from 'react'

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setAppointments([
        { 
          id: 1, 
          doctorId: 1, 
          doctorName: 'Dr. Sarah Johnson', 
          patientName: 'John Smith', 
          date: '2023-06-15', 
          time: '10:30', 
          reason: 'Regular checkup', 
          status: 'booked' 
        },
        { 
          id: 2, 
          doctorId: 4, 
          doctorName: 'Dr. Robert Brown', 
          patientName: 'Emily Davis', 
          date: '2023-06-16', 
          time: '14:00', 
          reason: 'Knee pain', 
          status: 'booked' 
        },
        { 
          id: 3, 
          doctorId: 2, 
          doctorName: 'Dr. Michael Chen', 
          patientName: 'Michael Wilson', 
          date: '2023-06-14', 
          time: '11:15', 
          reason: 'Skin rash', 
          status: 'completed' 
        },
        { 
          id: 4, 
          doctorId: 3, 
          doctorName: 'Dr. Lisa Williams', 
          patientName: 'Sarah Johnson', 
          date: '2023-06-13', 
          time: '09:30', 
          reason: 'Fever', 
          status: 'canceled' 
        },
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleReschedule = (appointmentId) => {
    const newDate = prompt('Enter new date (YYYY-MM-DD):')
    if (!newDate) return
    
    const newTime = prompt('Enter new time (HH:MM):')
    if (!newTime) return
    
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, date: newDate, time: newTime } : apt
    ))
  }

  const handleCancel = (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'canceled' } : apt
    ))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked': return 'badge badge-primary'
      case 'completed': return 'badge badge-success'
      case 'canceled': return 'badge badge-danger'
      default: return 'badge badge-secondary'
    }
  }

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
        <h3 className="text-xl font-semibold text-gray-900">Scheduled Appointments</h3>
      </div>
      
      {appointments.length === 0 ? (
        <div className="card-body">
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments scheduled</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by booking a new appointment.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map(appt => (
                <tr key={appt.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appt.patientName}</div>
                    <div className="text-sm text-gray-500">{appt.reason || 'No reason provided'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appt.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appt.date} at {appt.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusColor(appt.status)}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {appt.status !== 'canceled' && (
                      <>
                        <button
                          onClick={() => handleReschedule(appt.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(appt.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
