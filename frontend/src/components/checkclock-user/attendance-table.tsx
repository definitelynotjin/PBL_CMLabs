'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  // ...add optional props for dialog display if needed
}

interface AttendanceTableProps {
  data: AttendanceRecord[];
  onView?: (record: AttendanceRecord) => void;
}

export default function AttendanceTable({ data, onView }: AttendanceTableProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Work Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record, idx) => (
            <TableRow key={`${record.date}-${idx}`}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.clockIn}</TableCell>
              <TableCell>{record.clockOut}</TableCell>
              <TableCell>{record.workHours}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView && onView(record)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
