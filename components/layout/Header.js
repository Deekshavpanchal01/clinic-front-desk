import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Clinic Front Desk</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, Staff</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}