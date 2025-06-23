'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://pblcmlabs.duckdns.org/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const avatarUrl = data.avatar?.startsWith('http')
          ? data.avatar
          : data.avatar
            ? `https://pblcmlabs.duckdns.org/storage/${data.avatar}`
            : null;

        setUser({ ...data, avatar: avatarUrl });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  return (
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <h2 className="text-xl font-semibold">Add Checkclock</h2>

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            )}
            <div className="text-sm text-right leading-tight">
              <p className="font-medium">{user?.name || 'Loading...'}</p>
              <p className="text-xs text-gray-500">
                {user?.role === 'admin' ? 'ADM' : user?.employee_id || 'User'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 p-4 rounded-md shadow-lg border border-gray-200 bg-white space-y-3">
          {/* Avatar & Info */}
          <div className="flex flex-col items-center space-y-2">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300" />
            )}
            <div className="text-lg font-semibold">{user?.name}</div>
            <div className="text-sm text-gray-600">
              {user?.role === 'admin' ? 'ADM' : user?.employee_id}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => {
                setDropdownOpen(false);
                router.push('/view-profile');
              }}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A10.956 10.956 0 0112 15c2.21 0 4.26.637 5.879 1.804M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-sm font-medium text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1" />
              </svg>
              Logout
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
