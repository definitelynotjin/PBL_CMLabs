'use client';

import * as React from "react";
import Sidebar from "@/components/sidebar";
import CheckclockHeader from "@/components/checkclock-admin/header";
import EmployeeTable from "@/components/checkclock-admin/employee-table";
import { ConfirmDialog } from "@/components/checkclock-admin/confirm-dialog";
import { ViewDialog } from "@/components/checkclock-admin/view-dialog";
import { Employee } from "@/components/checkclock-admin/type";
import Title from '@/components/checkclock-user/title';

const initialEmployees: Employee[] = [
  { name: "Juanita", position: "CEO", clockIn: "08.00", clockOut: "16.30", workHours: "10h 5m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Shane", position: "OB", clockIn: "08.00", clockOut: "17.15", workHours: "9h 50m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Miles", position: "Head of HR", clockIn: "09.00", clockOut: "16.45", workHours: "10h 30m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Flores", position: "Manager", clockIn: "09.15", clockOut: "15.30", workHours: "6h 15m", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Henry", position: "CPO", clockIn: "0", clockOut: "0", workHours: "0", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Marvin", position: "OB", clockIn: "0", clockOut: "0", workHours: "0", status: "Waiting Approval", approved: false, rejected: false },
  { name: "Black", position: "HRD", clockIn: "08.15", clockOut: "17.00", workHours: "9h 45m", status: "Waiting Approval", approved: false, rejected: false },
];

const Checkclock: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>(initialEmployees);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [confirmAction, setConfirmAction] = React.useState<'approve' | 'reject' | null>(null);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const handleStatus = (clockIn: string, clockOut: string, workHours: string): string => {
    if (clockIn === "0" && clockOut === "0" && workHours === "0") return "Absent";
    const [hour, minute] = clockIn.split(".").map(Number);
    if (hour === undefined || minute === undefined) return "Unknown"; // Handle unexpected format
    const totalMinutes = hour * 60 + minute;
    return totalMinutes <= 495 ? "On Time" : "Late";
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
    setShowConfirmModal(false);
    setSelectedEmployee(null);
  };

  const handleDetailsClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true); // Open the view dialog
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <CheckclockHeader />
        <Title />
        <EmployeeTable
          employees={employees}
          openConfirmDialog={openConfirmDialog}
          handleDetailsClick={handleDetailsClick} // Ensure this is defined
          setOpenDialog={setOpenDialog}
          confirmAction={confirmAction} // Pass this prop
        />
      </div>
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
  );
};

export default Checkclock;
