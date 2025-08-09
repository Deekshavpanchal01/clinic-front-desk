import { useState } from 'react';

export default function DoctorList({ onSelectDoctor }) {
  const [doctors] = useState([
    { id: 1, name: 'Dr. James Wilson', specialization: 'Cardiology', available: true },
    { id: 2, name: 'Dr. Patricia Brown', specialization: 'Dermatology', available: true },
    { id: 3, name: 'Dr. Robert Taylor', specialization: 'Pediatrics', available: false },
    { id: 4, name: 'Dr. Jennifer Davis', specialization: 'Orthopedics', available: true },
  ]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map(doctor => (
          <div 
            key={doctor.id} 
            className={`border rounded-lg p-4 cursor-pointer transition duration-300 ${
              doctor.available 
                ? 'hover:border-blue-500 hover:shadow-md' 
                : 'bg-gray-100 opacity-70'
            }`}
            onClick={() => doctor.available && onSelectDoctor(doctor)}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{doctor.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                doctor.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {doctor.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{doctor.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
}