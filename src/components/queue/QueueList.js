"use client"

import { useState, useEffect } from 'react'

export default function QueueList() {
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setQueue([
        { id: 1, queueNumber: 101, name: 'Mary Johnson', status: 'waiting', urgent: false, waitTime: 15 },
        { id: 2, queueNumber: 102, name: 'David Wilson', status: 'with-doctor', urgent: false, waitTime: 0 },
        { id: 3, queueNumber: 103, name: 'James Taylor', status: 'waiting', urgent: true, waitTime: 5 },
        { id: 4, queueNumber: 104, name: 'Emily Davis', status: 'completed', urgent: false, waitTime: 0 },
        { id: 5, queueNumber: 105, name: 'Michael Brown', status: 'waiting', urgent: false, waitTime: 25 },
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const updateStatus = (patientId, status) => {
    setQueue(queue.map(patient => 
      patient.id === patientId ? { ...patient, status } : patient
    ))
  }

  const toggleUrgent = (patientId) => {
    setQueue(queue.map(patient => 
      patient.id === patientId ? { ...patient, urgent: !patient.urgent } : patient
    ))
  }

  const addWalkInPatient = () => {
    const name = prompt('Enter patient name:')
    if (!name) return
    
    const newPatient = {
      id: queue.length + 1,
      queueNumber: 100 + queue.length + 1,
      name,
      status: 'waiting',
      urgent: false,
      waitTime: 0
    }
    setQueue([...queue, newPatient])
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'badge badge-warning'
      case 'with-doctor': return 'badge badge-primary'
      case 'completed': return 'badge badge-success'
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
      <div className="card-header flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Patient Queue</h2>
        <button
          onClick={addWalkInPatient}
          className="btn btn-primary flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Walk-in Patient
        </button>
      </div>
      
      {queue.length === 0 ? (
        <div className="card-body">
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No patients in queue</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new patient to the queue.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Queue #</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {queue.map(patient => (
                <tr key={patient.id} className={patient.urgent ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{patient.queueNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.name}</div>
                    {patient.urgent && (
                      <span className="badge badge-danger mt-1">Urgent</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.waitTime > 0 ? `${patient.waitTime} min` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusColor(patient.status)}>
                      {patient.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={patient.status}
                      onChange={(e) => updateStatus(patient.id, e.target.value)}
                      className="mr-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="waiting">Waiting</option>
                      <option value="with-doctor">With Doctor</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => toggleUrgent(patient.id)}
                      className={`px-2 py-1 text-xs rounded ${
                        patient.urgent 
                          ? 'bg-gray-200 text-gray-700' 
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {patient.urgent ? 'Remove Urgency' : 'Mark Urgent'}
                    </button>
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
