import { useState, useEffect } from 'react';
import QueueItem from './QueueItem';

export default function QueueList() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchQueue = async () => {
      // Replace with actual API call
      setTimeout(() => {
        setQueue([
          { id: 1, queueNumber: 101, name: 'John Smith', status: 'waiting', urgent: false },
          { id: 2, queueNumber: 102, name: 'Sarah Johnson', status: 'with-doctor', urgent: true },
          { id: 3, queueNumber: 103, name: 'Mike Williams', status: 'waiting', urgent: false },
          { id: 4, queueNumber: 104, name: 'Emily Davis', status: 'completed', urgent: false },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchQueue();
  }, []);

  const updateStatus = (id, newStatus) => {
    setQueue(queue.map(patient => 
      patient.id === id ? { ...patient, status: newStatus } : patient
    ));
    
    // In a real app, you would send this to your backend
    console.log(`Updated patient ${id} status to ${newStatus}`);
  };

  const toggleUrgent = (id) => {
    setQueue(queue.map(patient => 
      patient.id === id ? { ...patient, urgent: !patient.urgent } : patient
    ));
  };

  const addWalkInPatient = () => {
    const newPatient = {
      id: queue.length + 1,
      queueNumber: 100 + queue.length + 1,
      name: `Walk-in Patient ${queue.length + 1}`,
      status: 'waiting',
      urgent: false
    };
    setQueue([...queue, newPatient]);
  };

  if (loading) {
    return <div className="text-center py-8">Loading queue...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Queue</h2>
        <button
          onClick={addWalkInPatient}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Walk-in Patient
        </button>
      </div>
      
      {queue.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No patients in queue</p>
        </div>
      ) : (
        <div>
          {queue.map(patient => (
            <QueueItem 
              key={patient.id} 
              patient={patient} 
              onUpdateStatus={updateStatus}
              onToggleUrgent={toggleUrgent}
            />
          ))}
        </div>
      )}
    </div>
  );
}