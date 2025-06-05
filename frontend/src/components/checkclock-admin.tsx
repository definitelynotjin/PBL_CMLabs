'use client';

import Image from 'next/image';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Grid, Users, Clock, Calendar, MessageCircle, Headphones, Settings, Filter, Check, X } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface Employee {
  name: string;
  position: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  date?: string;
  approved: boolean;
  rejected: boolean;
}

const employees: Employee[] = [
  { name: "Juanita", position: "CEO", clockIn: "08.00", clockOut: "16.30", workHours: "10h 5m", status: "Waiting Approval", approved: true, rejected: false },
  { name: "Shane", position: "OB", clockIn: "08.00", clockOut: "17.15", workHours: "9h 50m", status: "On Time", approved: true, rejected: false },
  { name: "Miles", position: "Head of HR", clockIn: "09.00", clockOut: "16.45", workHours: "10h 30m", status: "On Time", approved: true, rejected: false },
  { name: "Flores", position: "Manager", clockIn: "09.15", clockOut: "15.30", workHours: "6h 15m", status: "Late", approved: true, rejected: false },
  { name: "Henry", position: "CPO", clockIn: "0", clockOut: "0", workHours: "0", status: "Annual Leave", approved: true, rejected: true },
  { name: "Marvin", position: "OB", clockIn: "0", clockOut: "0", workHours: "0", status: "Absent", approved: true, rejected: false },
  { name: "Black", position: "HRD", clockIn: "08.15", clockOut: "17.00", workHours: "9h 45m", status: "On Time", approved: true, rejected: false },
];

const Checkclock: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);

  const handleDetailsClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center bg-gray-100 py-4">
        <div className="flex flex-col items-center gap-6">
          <Image src="/HRIS.png" alt="Logo" width={32} height={32} />
          <Link href="/dashboard"><Grid className="w-5 h-5 text-gray-600" /></Link>
          <Link href="/employee-database"><Users className="w-5 h-5 text-gray-600" /></Link>
          <Link href="/checkclock"><Clock className="w-5 h-5 text-gray-600" /></Link>
          <Link href="/pricing-package"><Calendar className="w-5 h-5 text-gray-600" /></Link>
          <Link href="/order-summary"><MessageCircle className="w-5 h-5 text-gray-600" /></Link>
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <Link href="/headphones"><Headphones className="w-5 h-5 text-gray-600" /></Link>
          <Link href="/settings"><Settings className="w-5 h-5 text-gray-600" /></Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Checkclock Overview</h1>
          <div className="flex items-center space-x-2">
            <Input placeholder="Search Employee" className="w-64" />
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filter</Button>
            <Button>+ Tambah Data</Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Approve</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.clockIn}</TableCell>
                  <TableCell>{employee.clockOut}</TableCell>
                  <TableCell>{employee.workHours}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {employee.approved && <Check className="w-4 h-4 text-green-500" />}
                    {employee.rejected && <X className="w-4 h-4 text-red-500" />}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs py-1 px-2 rounded-full ${
                      employee.status === "On Time"
                        ? "bg-green-100 text-green-700"
                        : employee.status === "Late"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleDetailsClick(employee)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <span>Showing</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span>out of 60 records</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" disabled>&lt;</Button>
              <Button variant="ghost" size="sm">1</Button>
              <Button size="sm" className="bg-gray-800 text-white">2</Button>
              <Button variant="ghost" size="sm">3</Button>
              <Button variant="ghost" size="sm">&gt;</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
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
