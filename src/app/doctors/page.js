import DoctorsList from '@/components/doctors/DoctorsList'

export default function DoctorsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
        <p className="mt-2 text-gray-600">View and manage clinic doctors and their schedules.</p>
      </div>
      <DoctorsList />
    </div>
  )
}
