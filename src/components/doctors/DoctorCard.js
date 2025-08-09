"use client"

export default function DoctorCard({ doctor, onViewDetails }) {
  return (
    <div className="card transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{doctor.specialization}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            doctor.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {doctor.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {doctor.location}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {doctor.availability}
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => onViewDetails(doctor)}
            className="btn btn-primary w-full"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
