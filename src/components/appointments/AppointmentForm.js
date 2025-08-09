"use client"

import { useState } from 'react'

export default function AppointmentForm({ doctor, onSave, onCancel }) {
  const [patientName, setPatientName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!patientName || !date || !time) {
      setError('Please fill in all required fields')
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      const timer = setTimeout(() => {
        const newAppointment = {
          id: Date.now(),
          doctorId: doctor.id,
          doctorName: doctor.name,
          patientName,
          date,
          time,
          reason,
          status: 'booked'
        }
        
        onSave(newAppointment)
        setLoading(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    } catch (err) {
      setError('Failed to book appointment')
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Book Appointment with {doctor.name}</h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="card-body">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                className="form-input"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                className="form-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </span>
              ) : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
