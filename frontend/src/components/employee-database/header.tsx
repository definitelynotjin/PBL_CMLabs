'use client';

import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Search } from "lucide-react";
import { useRouter } from 'next/navigation';

type HeaderProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function Header({ search, setSearch }: HeaderProps) {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();


  // Fetch user info and normalize avatar URL
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
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  // Trigger hidden file input for avatar upload
  const onAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Upload avatar
  const uploadAvatar = async (file: File) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("https://pblcmlabs.duckdns.org/api/user/avatar", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload avatar");

      const data = await response.json();
      const avatarUrl = data.avatar?.startsWith("http")
        ? data.avatar
        : `https://pblcmlabs.duckdns.org/storage/${data.avatar}`;

      setUser((prevUser: any) => ({ ...prevUser, avatar: avatarUrl }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar.");
    }
  };

  // Handle file input change
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadAvatar(e.target.files[0]);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-md shadow-sm">
      {/* Left - Title */}
      <h1 className="text-xl font-bold">Employee Database</h1>

      {/* Middle - Search */}
      <div className="flex-1 mx-6 max-w-xl">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search"
            className="pl-10 rounded-md border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        {/* Bell Icon */}
        <button className="p-2 rounded-xl bg-gray-200">
          <Bell className="h-5 w-5 text-gray-700" />
        </button>

        {/* Avatar + Username + Dropdown */}
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          type="button"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onAvatarClick();
            }}
            className="cursor-pointer"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400" />
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

        {/* Hidden File Input for Avatar Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4">
            <div className="flex flex-col items-center space-y-2 mb-4">
              <div onClick={onAvatarClick} className="cursor-pointer">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-400" />
                )}
              </div>
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-sm text-gray-600">
                {user?.role === "admin" ? "ADM" : user?.employee_id}
              </div>
            </div>
            <button
              onClick={() => {
                setDropdownOpen(false);
                router.push('/view-profile');  // navigate to your ViewProfilePage route
              }}
              className="w-full px-4 py-2 mb-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-800 transition"
            >
              View Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-md text-white font-semibold text-center hover:brightness-90 transition"
              style={{ backgroundColor: "#C11106" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
