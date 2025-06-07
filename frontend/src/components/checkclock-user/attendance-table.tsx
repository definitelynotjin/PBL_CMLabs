import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
}

interface AttendanceTableProps {
  data: AttendanceRecord[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.date}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.clockIn}</TableCell>
              <TableCell>{record.clockOut}</TableCell>
              <TableCell>{record.workHours}</TableCell>
              <TableCell>
                <span className={`text-xs py-1 px-2 rounded-full ${
                  record.status === "On Time" ? "bg-green-100 text-green-700" :
                  record.status === "Late" ? "bg-yellow-100 text-yellow-700" :
                  record.status === "Rejected" ? "bg-red-100 text-red-700" :
                  record.status === "Absent" ? "bg-gray-300 text-gray-800" :
                  "bg-gray-200 text-gray-600"
                }`}>
                  {record.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;