import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Queue Management', path: '/queue' },
    { name: 'Appointments', path: '/appointments' },
  ];

  return (
    <div className="bg-clinic-700 text-white w-64 min-h-screen">
      <div className="p-4 text-xl font-semibold">Clinic System</div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => router.push(item.path)}
                className={`w-full text-left px-4 py-3 hover:bg-clinic-600 transition duration-300 ${
                  router.pathname === item.path ? 'bg-clinic-800' : ''
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}