'use client';

import React, { useEffect, useState } from 'react';
import SidebarUser from '@/components/sidebar-user';
import CheckclockHeader from '@/components/checkclock-user/header';
import AttendanceTable from '@/components/checkclock-user/attendance-table';
import Title from '@/components/checkclock-user/title';
import { UserCheckClockViewDialog } from '@/components/checkclock-user/view-dialog';

export default function CheckclockUser() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://pblcmlabs.duckdns.org/api/my-checkclocks", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Convert checkClock data to table-compatible format
        const groupedByDate = groupByDate(data);
        setAttendanceData(groupedByDate);
      })
      .catch((err) => console.error("Failed to fetch attendance data", err));
  }, []);

  const groupByDate = (data: any[]) => {
    const grouped: Record<string, any> = {};

    data.forEach((entry) => {
      const key = entry.date;
      if (!grouped[key]) {
        grouped[key] = { date: key, clockIn: "", clockOut: "", workHours: "", status: "" };
      }

      if (entry.check_clock_type === "1") {
        grouped[key].clockIn = entry.check_clock_time;
        grouped[key].status = entry.status;
      }

      if (entry.check_clock_type === "2") {
        grouped[key].clockOut = entry.check_clock_time;
      }

      // Optional: calculate workHours if both in/out are available
      if (grouped[key].clockIn && grouped[key].clockOut) {
        const [h1, m1] = grouped[key].clockIn.split(":").map(Number);
        const [h2, m2] = grouped[key].clockOut.split(":").map(Number);
        const mins = (h2 * 60 + m2) - (h1 * 60 + m1);
        grouped[key].workHours = `${Math.floor(mins / 60)}h ${mins % 60}m`;
      }
    });

    return Object.values(grouped);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarUser />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <CheckclockHeader />
        <Title />
        <AttendanceTable
          data={attendanceData}
          onView={(record) => {
            setSelectedRecord(record);
            setOpenDialog(true);
          }}
        />
        <UserCheckClockViewDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedRecord={selectedRecord}
        />
      </div>
    </div>
  );
}
