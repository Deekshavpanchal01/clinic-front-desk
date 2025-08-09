export default function QueueItem({ patient, onUpdateStatus, onToggleUrgent }) {
  const statusColors = {
    waiting: 'bg-yellow-100 text-yellow-800',
    'with-doctor': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
      <div>
        <div className="font-medium">Queue #{patient.queueNumber}</div>
        <div className="text-gray-600">{patient.name}</div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
          {patient.status.replace('-', ' ')}
        </span>
        <select
          value={patient.status}
          onChange={(e) => onUpdateStatus(patient.id, e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="waiting">Waiting</option>
          <option value="with-doctor">With Doctor</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={() => onToggleUrgent(patient.id)}
          className={`px-2 py-1 text-xs rounded ${
            patient.urgent 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {patient.urgent ? 'Urgent' : 'Mark Urgent'}
        </button>
      </div>
    </div>
  );
}