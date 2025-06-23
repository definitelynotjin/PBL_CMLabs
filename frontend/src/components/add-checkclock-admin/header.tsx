import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('https://pblcmlabs.duckdns.org/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
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

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center space-x-2 cursor-pointer">
            {user?.avatar ? (
              <img
                src={user.avatar.startsWith('http') ? user.avatar : `https://pblcmlabs.duckdns.org/storage/${user.avatar}`}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            )}
            <span>{user?.name || 'Loading...'}</span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem disabled>
            {user?.role === 'admin' ? 'ADM' : user?.employee_id || 'User'}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              router.push('/view-profile');
            }}
          >
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleLogout} className="text-red-600">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
