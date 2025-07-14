'use client';

import React, { useEffect, useState } from 'react';
import SidebarUser from '@/components/sidebar-user';
import CheckclockHeader from '@/components/checkclock-user/header';
import CheckClockTable from '@/components/checkclock-user/attendance-table';
import Title from '@/components/checkclock-user/title';
import { UserCheckClockViewDialog } from '@/components/checkclock-user/view-dialog';

interface AttendanceRecord {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  absenceType?: string;
  startDate?: string;
  endDate?: string;
}

// ✅ Converts absence entries into displayable records
const convertAbsencesToRecords = (absences: any[]): AttendanceRecord[] => {
  const absenceRecords: AttendanceRecord[] = [];

  absences.forEach((absence) => {
    const start = new Date(absence.start_date);
    const end = new Date(absence.end_date);
    const absenceType = absence.absence_type || 'Other';
    const status = absence.status || 'Pending';

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      absenceRecords.push({
        id: `${absence.id}-${dateStr}`,
        date: dateStr,
        clockIn: '—',
        clockOut: '—',
        workHours: '—',
        status: status,
        absenceType: absenceType,
        startDate: absence.start_date,
        endDate: absence.end_date,
      });
    }
  });

  return absenceRecords;
};


// ✅ Groups check clock entries by date and calculates work hours
const groupByDate = (data: any[]): AttendanceRecord[] => {
  const grouped: Record<string, AttendanceRecord> = {};

  data.forEach((entry) => {
    const key = entry.created_at?.split('T')[0] ?? 'Unknown Date';

    if (!grouped[key]) {
      grouped[key] = {
        id: entry.id,
        date: key,
        clockIn: '',
        clockOut: '',
        workHours: '',
        status: 'Waiting Approval',
      };
    }

    if (entry.check_clock_type == 1) {
      grouped[key].clockIn = entry.check_clock_time;
      grouped[key].status = entry.status || 'Waiting Approval';
    }

    if (entry.check_clock_type == 2) {
      grouped[key].clockOut = entry.check_clock_time;
    }

    if (grouped[key].clockIn && grouped[key].clockOut) {
      const [h1, m1] = grouped[key].clockIn.split(':').map(Number);
      const [h2, m2] = grouped[key].clockOut.split(':').map(Number);
      const mins = h2 * 60 + m2 - (h1 * 60 + m1);
      grouped[key].workHours = `${Math.floor(mins / 60)}h ${mins % 60}m`;
    }
  });

  return Object.values(grouped);
};

export default function CheckclockUser() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);

    const fetchCheckClocks = fetch('https://pblcmlabs.duckdns.org/api/checkclocks/me', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const fetchAbsences = fetch('https://pblcmlabs.duckdns.org/api/absence-requests/me', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    Promise.all([fetchCheckClocks, fetchAbsences])
      .then(([checkclockRes, absenceRes]) => {
        const checkclockRecords = checkclockRes.data
          ? groupByDate(checkclockRes.data)
          : [];

        const absenceRecords = absenceRes.data
          ? convertAbsencesToRecords(absenceRes.data)
          : [];

        const merged = [...checkclockRecords, ...absenceRecords].sort((a, b) =>
          a.date.localeCompare(b.date)
        );

        setAttendanceData(merged);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch attendance data or absences', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarUser />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <CheckclockHeader />
        <Title />
        <CheckClockTable
          loading={loading}
          records={attendanceData}
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
