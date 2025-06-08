'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://pblcmlabs.duckdns.org/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div className="flex justify-between items-center mb-4 border-b pb-2 relative z-40" ref={dropdownRef}>
      <h2 className="text-xl font-semibold">Add Checkclock</h2>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl bg-gray-200">
          <Bell className="w-5 h-5 text-gray-700" />
        </button>
        <button
          className="flex items-center gap-2"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-400 rounded-full" />
          )}
          <div className="text-sm text-right leading-tight">
            <p className="font-medium">{user?.name || 'Loading...'}</p>
            <p className="text-gray-500 text-xs">
              {user?.role === 'admin' ? 'ADM' : user?.employee_id || ''}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4">
            <div className="flex flex-col items-center space-y-2 mb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-400" />
              )}
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-sm text-gray-600">{user?.role === 'admin' ? 'ADM' : user?.employee_id}</div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-md text-white font-semibold text-center hover:brightness-90 transition"
              style={{ backgroundColor: '#C11106' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
