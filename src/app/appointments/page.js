"use client"

import { useState } from 'react'
import DoctorList from '@/components/appointments/DoctorList'
import AppointmentForm from '@/components/appointments/AppointmentForm'
import AppointmentList from '@/components/appointments/AppointmentList'

export default function AppointmentsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const handleBookAppointment = (appointment) => {
    setSelectedDoctor(null)
    // The appointment list will refresh automatically
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
        <p className="mt-2 text-gray-600">Schedule, reschedule, and manage patient appointments.</p>
      </div>
      
      {selectedDoctor ? (
        <AppointmentForm 
          doctor={selectedDoctor} 
          onSave={handleBookAppointment}
          onCancel={() => setSelectedDoctor(null)}
        />
      ) : (
        <DoctorList onSelectDoctor={setSelectedDoctor} />
      )}
      
      <div className="mt-8">
        <AppointmentList />
      </div>
    </div>
  )
}
