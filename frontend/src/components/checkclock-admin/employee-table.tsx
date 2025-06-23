'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import DashboardHeader from '@/components/checkclock-admin/header'; // your avatar header
import CheckclockActions from '@/components/checkclock-admin/actions'; // your actions component
import EmployeeTable from '@/components/checkclock-admin/employee-table';
import { ConfirmDialog } from '@/components/checkclock-admin/confirm-dialog';
import { ViewDialog } from '@/components/checkclock-admin/view-dialog';
import { Employee } from '@/components/checkclock-admin/type';

const initialEmployees: Employee[] = [
  { name: "Juanita", position: "CEO", clockIn: "08.00", clockOut: "16.30", workHours: "10h 5m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Shane", position: "OB", clockIn: "08.00", clockOut: "17.15", workHours: "9h 50m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Miles", position: "Head of HR", clockIn: "09.00", clockOut: "16.45", workHours: "10h 30m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Flores", position: "Manager", clockIn: "09.15", clockOut: "15.30", workHours: "6h 15m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Henry", position: "CPO", clockIn: "0", clockOut: "0", workHours: "0", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Marvin", position: "OB", clockIn: "0", clockOut: "0", workHours: "0", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Black", position: "HRD", clockIn: "08.15", clockOut: "17.00", workHours: "9h 45m", status: "Waiting Approval", approved: false, rejected: false },
];

const AdminDashboardPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleStatus = (clockIn: string, clockOut: string, workHours: string): string => {
    if (clockIn === "0" && clockOut === "0" && workHours === "0") return "Absent";

    const [hour, minute] = clockIn.split(".").map(Number);
    const totalMinutes = hour * 60 + minute;
    if (totalMinutes <= 495) return "On Time";
    return "Late";
  };

  const openConfirmDialog = (employee: Employee, action: 'approve' | 'reject') => {
    setSelectedEmployee(employee);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (!selectedEmployee || !confirmAction) return;

    const updated = employees.map(emp => {
      if (emp.name === selectedEmployee.name) {
        const newStatus = confirmAction === 'approve'
          ? handleStatus(emp.clockIn, emp.clockOut, emp.workHours)
          : "Rejected";

        return {
          ...emp,
          approved: confirmAction === 'approve',
          rejected: confirmAction === 'reject',
          status: newStatus
        };
      }
      return emp;
    });

    setEmployees(updated);
    setOpenDialog(false);
    setShowConfirmModal(false);
  };

  const handleExport = () => {
    if (!employees.length) return alert('No employee data to export.');

    const headers = ['Name', 'Position', 'Clock In', 'Clock Out', 'Work Hours', 'Status'];
    const rows = employees.map(emp => [emp.name, emp.position, emp.clockIn, emp.clockOut, emp.workHours, emp.status]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'checkclock_employees.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col">
        <DashboardHeader />

        <CheckclockActions onExport={handleExport} />

        <EmployeeTable
          employees={employees}
          openConfirmDialog={openConfirmDialog}
          setSelectedEmployee={setSelectedEmployee}
          setOpenDialog={setOpenDialog}
        />

        <ConfirmDialog
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          handleConfirmAction={handleConfirmAction}
          confirmAction={confirmAction}
        />

        <ViewDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedEmployee={selectedEmployee}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
