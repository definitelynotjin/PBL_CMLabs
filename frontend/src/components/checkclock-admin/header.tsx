'use client';

import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Search } from "lucide-react";
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/ui/searchbar.tsx';

const CheckclockHeader = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const router = useRouter();

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
        console.error("Failed to fetch user data:", error);
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
    <header className="flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-md shadow-sm mb-4">
      {/* Left - Title */}
      <h1 className="text-2xl font-bold">Checkclock Overview</h1>

      {/* Middle - Search */}
      <div className="flex-1 mx-6 max-w-xl">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search employees..."
            className="pl-10 rounded-md"
          />
        </div>
      </div>


      {/* Right - Bell + Avatar */}
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        <button className="p-2 rounded-xl bg-gray-200">
          <Bell className="h-5 w-5 text-gray-700" />
        </button>

        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          type="button"
        >
          <div className="w-8 h-8 rounded-full bg-gray-400 cursor-pointer">
            {user?.avatar && (
              <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
            )}
          </div>
          <div className="text-sm text-right">
            <div className="font-medium">{user?.name || "Loading..."}</div>
            <div className="text-xs text-gray-500">
              {user?.role === "admin" ? "ADM" : user?.employee_id || ""}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4">
            <div className="flex flex-col items-center space-y-2 mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-400" />
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-sm text-gray-600">{user?.role === "admin" ? "ADM" : user?.employee_id}</div>
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
    </header>
  );
};

export default CheckclockHeader;
