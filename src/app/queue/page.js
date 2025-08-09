import QueueList from '@/components/queue/QueueList'

export default function QueuePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Queue Management</h1>
        <p className="mt-2 text-gray-600">Manage patient queue and prioritize cases.</p>
      </div>
      <QueueList />
    </div>
  )
}
