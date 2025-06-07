'use client';

import React from 'react';
import SidebarUser from '@/components/sidebar-user'; // Import the existing Sidebar
import CheckclockHeader from '@/components/checkclock-user/header';
import AttendanceTable from '@/components/checkclock-user/attendance-table';
import Title from '@/components/checkclock-user/title';

const attendanceData = [
  { date: "March 01, 2025", clockIn: "09:28 AM", clockOut: "04:00 PM", workHours: "10h 5m", status: "On Time" },
  { date: "March 02, 2025", clockIn: "09:30 AM", clockOut: "04:30 PM", workHours: "9h 50m", status: "Late" },
  // ... additional records
];

export default function CheckclockUser() {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarUser />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <CheckclockHeader />
        <Title />
        <AttendanceTable data={attendanceData} />
      </div>
    </div>
  );
}