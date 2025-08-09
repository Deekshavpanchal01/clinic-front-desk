import { useState } from 'react';

export default function AppointmentForm({ doctor, onSave, onCancel }) {
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!patientName || !date || !time) {
      alert('Please fill in all required fields');
      return;
    }
    
    const appointment = {
      id: Date.now(), // Temporary ID
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName,
      date,
      time,
      reason,
      status: 'booked'
    };
    
    onSave(appointment);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Book Appointment with {doctor.name}</h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}