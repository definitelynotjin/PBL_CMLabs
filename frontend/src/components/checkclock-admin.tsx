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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

// Define the type for each employee record
interface Employee {
  name: string;
  position: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  date?: string; // Optional date for attendance details
}

// Sample data
const employees: Employee[] = [
  { name: "Juanita", position: "CEO", clockIn: "08:00", clockOut: "16:30", workHours: "10h 5m", status: "On Time", date: "1 March 2025" },
  { name: "Shane", position: "OB", clockIn: "08:00", clockOut: "17:15", workHours: "9h 50m", status: "On Time", date: "2 March 2025" },
  { name: "Miles", position: "Head of HR", clockIn: "08:00", clockOut: "16:45", workHours: "10h 30m", status: "On Time", date: "3 March 2025" },
  { name: "Flores", position: "Manager", clockIn: "09:15", clockOut: "15:30", workHours: "6h 15m", status: "Late", date: "4 March 2025" },
  { name: "Henry", position: "CPO", clockIn: "0", clockOut: "0", workHours: "0", status: "Annual Leave", date: "5 March 2025" },
  { name: "Marvin", position: "OB", clockIn: "0", clockOut: "0", workHours: "0", status: "Absent", date: "6 March 2025" },
  { name: "Black", position: "HRD", clockIn: "08:15", clockOut: "17:00", workHours: "9h 45m", status: "On Time", date: "7 March 2025" },
];

const Checkclock: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);

  const handleDetailsClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 flex flex-col items-center py-6 bg-white border-r">
        <div className="mb-8 font-bold">LOGO</div>
        {/* Add navigation buttons here */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-2">
                <span>username</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>roles user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-white shadow-md">
            <h3 className="text-lg">Total Employees</h3>
            <p className="text-4xl">208</p>
            <p className="text-sm">Update: March 16, 2025</p>
          </Card>
          <Card className="p-4 bg-white shadow-md">
            <h3 className="text-lg">New Employees</h3>
            <p className="text-4xl">20</p>
            <p className="text-sm">Update: March 16, 2025</p>
          </Card>
          <Card className="p-4 bg-white shadow-md">
            <h3 className="text-lg">Active Employees</h3>
            <p className="text-4xl">15</p>
            <p className="text-sm">Update: March 16, 2025</p>
          </Card>
          <Card className="p-4 bg-white shadow-md">
            <h3 className="text-lg">Resigned Employees</h3>
            <p className="text-4xl">10</p>
            <p className="text-sm">Update: March 16, 2025</p>
          </Card>
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell className="flex items-center space-x-2">
                    <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleDetailsClick(employee)}>
                      {employee.name}
                    </span>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.clockIn}</TableCell>
                  <TableCell>{employee.clockOut}</TableCell>
                  <TableCell>{employee.workHours}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle>Attendance Details</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <p><strong>Name:</strong> {selectedEmployee.name}</p>
                <p><strong>Position:</strong> {selectedEmployee.position}</p>
                <p><strong>Date:</strong> {selectedEmployee.date}</p>
                <p><strong>Clock In:</strong> {selectedEmployee.clockIn}</p>
                <p><strong>Clock Out:</strong> {selectedEmployee.clockOut}</p>
                <p><strong>Status:</strong> {selectedEmployee.status}</p>
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkclock;