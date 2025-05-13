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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the type for each employee record
interface Employee {
  name: string;
  position: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  approve: boolean;
  status: string;
  date?: string; // Optional date for attendance details
  location?: string; // Optional location for attendance details
  lat?: number; // Optional latitude
  long?: number; // Optional longitude
  proof?: string; // Optional proof file
}

// Sample data with additional details
const employees: Employee[] = [
  { name: "Juanita", position: "CEO", clockIn: "08:00", clockOut: "16:30", workHours: "10h 5m", approve: true, status: "Waiting Approval", date: "1 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Shane", position: "OB", clockIn: "08:00", clockOut: "17:15", workHours: "9h 50m", approve: true, status: "On Time", date: "2 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Miles", position: "Head of HR", clockIn: "08:00", clockOut: "16:45", workHours: "10h 30m", approve: true, status: "On Time", date: "3 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Flores", position: "Manager", clockIn: "09:15", clockOut: "15:30", workHours: "6h 15m", approve: true, status: "Late", date: "4 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Henry", position: "CPO", clockIn: "0", clockOut: "0", workHours: "0", approve: false, status: "Annual Leave", date: "5 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Marvin", position: "OB", clockIn: "0", clockOut: "0", workHours: "0", approve: false, status: "Absent", date: "6 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Black", position: "HRD", clockIn: "08:15", clockOut: "17:00", workHours: "9h 45m", approve: true, status: "On Time", date: "7 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Jacob Jones", position: "Supervisor", clockIn: "0", clockOut: "0", workHours: "0", approve: false, status: "Sick Leave", date: "8 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Ronalds Ricards", position: "OB", clockIn: "08:00", clockOut: "16:00", workHours: "10h", approve: true, status: "Late", date: "9 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
  { name: "Leslie Alexander", position: "OB", clockIn: "08:30", clockOut: "16:00", workHours: "8h 30m", approve: true, status: "Waiting Approval", date: "10 March 2025", location: "Kantor Pusat", lat: -7.9836, long: 112.621381, proof: "Proof of Attendance.JPG" },
];

const Checkclock: React.FC = () => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [isApproveAction, setIsApproveAction] = React.useState<boolean | null>(true); // Allow null for details view

  const handleSelectRow = (name: string) => {
    setSelectedRows((prev) =>
      prev.includes(name) ? prev.filter((row) => row !== name) : [...prev, name]
    );
  };

  const handleApproveClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsApproveAction(true);
    setOpenDialog(true);
  };

  const handleDisapproveClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsApproveAction(false);
    setOpenDialog(true);
  };

  const handleDetailsClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsApproveAction(null); // Now TypeScript accepts null
    setOpenDialog(true);
  };

  const handleConfirmAction = () => {
    if (selectedEmployee) {
      if (isApproveAction === true) {
        // Logic to approve the attendance
        console.log(`Approved attendance for ${selectedEmployee.name}`);
      } else if (isApproveAction === false) {
        // Logic to disapprove the attendance
        console.log(`Disapproved attendance for ${selectedEmployee.name}`);
      }
    }
    setOpenDialog(false);
  };

  const handleReject = () => {
    setOpenDialog(false);
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
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={selectedRows.length === employees.length}
                    onCheckedChange={() =>
                      setSelectedRows(
                        selectedRows.length === employees.length
                          ? []
                          : employees.map((employee) => employee.name)
                      )
                    }
                  />
                </TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Approve</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(employee.name)}
                      onCheckedChange={() => handleSelectRow(employee.name)}
                    />
                  </TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <div
                      className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"
                      onClick={() => handleDetailsClick(employee)}
                    />
                    <span
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => handleDetailsClick(employee)}
                    >
                      {employee.name}
                    </span>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.clockIn}</TableCell>
                  <TableCell>{employee.clockOut}</TableCell>
                  <TableCell>{employee.workHours}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={employee.approve ? "bg-green-100" : ""}
                        onClick={() => handleApproveClick(employee)}
                      >
                        ✓
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={employee.approve ? "" : "bg-red-100"}
                        onClick={() => handleDisapproveClick(employee)}
                      >
                        ✗
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{employee.status}</TableCell>
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

      {/* Approval/Disapproval/Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          {selectedEmployee && isApproveAction === null && (
            <>
              <DialogHeader>
                <DialogTitle>Attendance Details</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                    <div>
                      <p className="font-semibold">{selectedEmployee.name}</p>
                      <p>{selectedEmployee.position}</p>
                      <span className="text-sm text-gray-500">Status Approve</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Attendance Information</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <span>Date</span>
                      <span>{selectedEmployee.date || "N/A"}</span>
                      <span>Check In</span>
                      <span>{selectedEmployee.clockIn}</span>
                      <span>Check Out</span>
                      <span>{selectedEmployee.clockOut}</span>
                      <span>Status</span>
                      <span>{selectedEmployee.status || "N/A"}</span>
                      <span>Work Hours</span>
                      <span>{selectedEmployee.workHours}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Location Information</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <span>Location</span>
                      <span>{selectedEmployee.location || "N/A"}</span>
                      <span>Address</span>
                      <span>{selectedEmployee.location ? "Jl. Veteran No.1, Kota Malang" : "N/A"}</span>
                      <span>Lat</span>
                      <span>{selectedEmployee.lat || "-7.9836"}</span>
                      <span>Long</span>
                      <span>{selectedEmployee.long || "112.621381"}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Proof of Attendance</h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <span>{selectedEmployee.proof || "N/A"}</span>
                      <Button variant="outline" size="sm">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogDescription>
              <DialogFooter>
                <Button onClick={handleReject}>Close</Button>
              </DialogFooter>
            </>
          )}
          {selectedEmployee && (isApproveAction === true || isApproveAction === false) && (
            <>
              <DialogHeader>
                <DialogTitle>{isApproveAction ? "Approve Attendance" : "Disapprove Attendance"}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to {isApproveAction ? "approve" : "disapprove"} this employee's attendance?
                <br />
                This action cannot be undone.
              </DialogDescription>
              <DialogFooter>
                <Button variant="outline" onClick={handleReject}>
                  Reject
                </Button>
                <Button onClick={handleConfirmAction}>
                  {isApproveAction ? "Approve" : "Disapprove"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkclock;