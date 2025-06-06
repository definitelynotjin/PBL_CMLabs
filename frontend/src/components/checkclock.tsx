'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import {
  Grid,
  Users,
  Clock,
  Calendar,
  MessageCircle,
  Headphones,
  Settings,
  Bell,
  ChevronsUpDown,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Sample data (replace with your actual data)
const attendanceData = [
  { date: "March 01, 2025", clockIn: "09:28 AM", clockOut: "04:00 PM", workHours: "10h 5m", status: "On Time" },
  { date: "March 02, 2025", clockIn: "09:30 AM", clockOut: "04:30 PM", workHours: "9h 50m", status: "Late" },
  // ... additional records
];

export default function CheckclockUser() {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const handleSelectRow = (date: string) => {
    setSelectedRows((prev) =>
      prev.includes(date) ? prev.filter((row) => row !== date) : [...prev, date]
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center bg-gray-100 py-4">
        <div className="flex flex-col items-center gap-6">
          <Image src="/HRIS.png" alt="Logo" width={32} height={32} />
          <Link href="/dashboard-user">
            <Grid className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/checkclock">
            <Clock className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <Link href="/headphones">
            <Headphones className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/settings">
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 space-y-6">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Checkclock Overview</h1>
            <Input placeholder="Search" className="w-72" />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div className="text-sm text-right leading-tight">
                <p className="font-medium">username</p>
                <p className="text-gray-500 text-xs">roles user</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between mb-4">
          <div className="border rounded-lg p-4 flex flex-col w-1/3">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-lg font-semibold">{attendanceData.length}</p>
          </div>
          {/* Add more stats as needed */}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Attendance Records</h2>
          <div className="flex gap-2">
            <Button variant="outline"><Grid className="w-4 h-4 mr-2" /> Filter</Button>
            <Button variant="outline">Export</Button>
            <Button variant="outline">Import</Button>
            <Button>+ Tambah Data</Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={selectedRows.length === attendanceData.length}
                    onCheckedChange={() =>
                      setSelectedRows(
                        selectedRows.length === attendanceData.length
                          ? []
                          : attendanceData.map((record) => record.date)
                      )
                    }
                  />
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record.date}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(record.date)}
                      onCheckedChange={() => handleSelectRow(record.date)}
                    />
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.clockIn}</TableCell>
                  <TableCell>{record.clockOut}</TableCell>
                  <TableCell>{record.workHours}</TableCell>
                  <TableCell>{record.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination (optional) */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <span>Showing</span>
              <Button variant="outline">10</Button>
              <span>out of {attendanceData.length} records</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" disabled>{"<"}</Button>
              <Button variant="outline">1</Button>
              <Button variant="outline" className="bg-gray-200">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">{">"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
