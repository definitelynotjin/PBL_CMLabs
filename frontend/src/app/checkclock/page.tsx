'use client';

import React, { useEffect, useState } from 'react';
import SidebarUser from '@/components/sidebar-user';
import CheckclockHeader from '@/components/checkclock-user/header';
import AttendanceTable from '@/components/checkclock-user/attendance-table';
import Title from '@/components/checkclock-user/title';
import { UserCheckClockViewDialog } from '@/components/checkclock-user/view-dialog';

interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
}

export default function CheckclockUser() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('https://pblcmlabs.duckdns.org/api/checkclocks/me', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const groupedByDate = groupByDate(data.data);
          setAttendanceData(groupedByDate);
        } else {
          console.error('API response missing data:', data);
        }
      })
      .catch((err) => console.error('Failed to fetch attendance data', err));
  }, []);

  const groupByDate = (data: any[]): AttendanceRecord[] => {
    const grouped: Record<string, AttendanceRecord> = {};

    data.forEach((entry) => {
      // Extract date from created_at
      const key = entry.created_at ? entry.created_at.split('T')[0] : 'Unknown Date';

      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          clockIn: '',
          clockOut: '',
          workHours: '',
          status: 'Awaiting Approval',
        };
      }

      // Note: check_clock_type may be string or number, so use == for loose equality
      if (entry.check_clock_type == 1) {
        grouped[key].clockIn = entry.check_clock_time;
        // Use status from entry if available, else default
        grouped[key].status = entry.status || 'Awaiting Approval';
      }

      if (entry.check_clock_type == 2) {
        grouped[key].clockOut = entry.check_clock_time;
      }

      // Calculate workHours if both clockIn and clockOut are set
      if (grouped[key].clockIn && grouped[key].clockOut) {
        const [h1, m1] = grouped[key].clockIn.split(':').map(Number);
        const [h2, m2] = grouped[key].clockOut.split(':').map(Number);
        const mins = h2 * 60 + m2 - (h1 * 60 + m1);
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
          onView={(record: AttendanceRecord) => {
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
