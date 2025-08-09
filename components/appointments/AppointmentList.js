export default function AppointmentList({ appointments, onReschedule, onCancel }) {
  const statusColors = {
    booked: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Scheduled Appointments</h3>
      
      {appointments.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No appointments scheduled</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[appt.status]}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onReschedule(appt)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => onCancel(appt.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}