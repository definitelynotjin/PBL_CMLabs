'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const CheckclockHeader = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://pblcmlabs.duckdns.org/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const avatarUrl = data.avatar?.startsWith("http")
          ? data.avatar
          : data.avatar
            ? `https://pblcmlabs.duckdns.org/storage/${data.avatar}`
            : null;

        setUser({ ...data, avatar: avatarUrl });

      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

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
    <div className="flex justify-between items-center mb-6 relative z-40" ref={dropdownRef}>
      {/* Left section */}
      <h1 className="text-2xl font-bold">Checkclock Overview</h1>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">Export</Button>
        <Button variant="outline">Import</Button>
        <Link href="/add-checkclock">
          <Button>+ Tambah Data</Button>
        </Link>

        {/* Notification bell */}
        <button className="p-2 rounded-xl bg-gray-200">
          <Bell className="w-5 h-5 text-gray-700" />
        </button>

        {/* User dropdown */}
        <button
          className="flex items-center gap-2"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-sm text-right leading-tight">
            <p className="font-medium">{user?.name || 'Loading...'}</p>
            <p className="text-gray-500 text-xs">
              {user?.role === 'admin' ? 'ADM' : user?.employee_id || ''}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4">
            <div className="flex flex-col items-center space-y-2 mb-4">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-sm text-gray-600">{user?.role === 'admin' ? 'ADM' : user?.employee_id}</div>
            </div>
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
        )}
      </div>
    </div>
  );
};

export default CheckclockHeader;
