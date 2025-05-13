"use client"; // Mark as Client Component for Next.js

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the type for each attendance record
interface Attendance {
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
}

// Sample data (you can replace this with your API data)
const attendanceData: Attendance[] = [
  { date: "March 01, 2025", clockIn: "09:28 AM", clockOut: "04:00 PM", workHours: "10h 5m", status: "On Time" },
  { date: "March 02, 2025", clockIn: "09:30 AM", clockOut: "04:30 PM", workHours: "9h 50m", status: "Late" },
  { date: "March 03, 2025", clockIn: "09:00 AM", clockOut: "04:15 PM", workHours: "10h 30m", status: "On Time" },
  { date: "March 04, 2025", clockIn: "09:15 AM", clockOut: "03:15 PM", workHours: "6h 15m", status: "Late" },
  { date: "March 05, 2025", clockIn: "0", clockOut: "0", workHours: "0", status: "Sick Leave" },
  { date: "March 06, 2025", clockIn: "09:00 AM", clockOut: "03:30 PM", workHours: "9h 45m", status: "On Time" },
  { date: "March 07, 2025", clockIn: "09:30 AM", clockOut: "03:00 PM", workHours: "9h 45m", status: "On Time" },
  { date: "March 08, 2025", clockIn: "0", clockOut: "0", workHours: "0", status: "Annual Leave" },
  { date: "March 09, 2025", clockIn: "09:45 AM", clockOut: "04:15 PM", workHours: "10h", status: "Late" },
  { date: "March 10, 2025", clockIn: "09:30 AM", clockOut: "04:00 PM", workHours: "8h 30m", status: "On Time" },
];

const CheckclockUser: React.FC = () => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const handleSelectRow = (date: string) => {
    setSelectedRows((prev) =>
      prev.includes(date) ? prev.filter((row) => row !== date) : [...prev, date]
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-gray-100 p-4 flex flex-col items-center space-y-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">Checkclock</h2>
            <input
              type="text"
              placeholder="Search"
              className="p-2 border rounded-md"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <span>username</span>
                <span className="w-4 h-4 bg-gray-300 rounded-full" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>roles user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Checkclock Overview</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search Employee"
                className="p-2 border rounded-md"
              />
              <Button variant="outline">Filter</Button>
              <Button>Tambah Data</Button>
            </div>
          </div>

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

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <span>Showing</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">10</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>10</DropdownMenuItem>
                  <DropdownMenuItem>20</DropdownMenuItem>
                  <DropdownMenuItem>50</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span>out of 60 records</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                {"<"}
              </Button>
              <Button variant="outline">1</Button>
              <Button variant="outline" className="bg-gray-200">
                2
              </Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">{">"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckclockUser;