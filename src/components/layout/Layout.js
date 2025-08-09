"use client"

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const auth = useAuth();
  const pathname = usePathname();

  if (!auth.user) {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Queue Management', href: '/queue' },
    { name: 'Appointments', href: '/appointments' },
    { name: 'Doctors', href: '/doctors' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Clinic Front Desk</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {auth.user.name}</span>
            <button
              onClick={auth.logout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
