"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Search } from "lucide-react";

export function DashboardHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // or wherever you store it

        const response = await fetch("https://pblcmlabs.duckdns.org/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* Left - Title */}
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Middle - Search */}
      <div className="flex-1 mx-6 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search" className="pl-10 rounded-md border-gray-300" />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center space-x-4">
        {/* Bell Icon */}
        <button className="p-2 rounded-xl bg-gray-200">
          <Bell className="h-5 w-5 text-gray-700" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-400" />

        {/* Username and Role */}
        <div className="text-sm text-right">
          <div className="font-medium">
            {user?.employee
              ? `${user.employee.first_name} ${user.employee.last_name}`
              : "Loading..."}
          </div>
          <div className="text-xs text-gray-500">{user?.employee_id || ""}</div>
        </div>

        {/* Dropdown Icon */}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </header>
  );
}
