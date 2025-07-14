'use client';

import * as React from "react";
import Sidebar from "@/components/sidebar";
import CheckclockHeader from "@/components/checkclock-admin/header";
import EmployeeTable from "@/components/checkclock-admin/employee-table";
import { ConfirmDialog } from "@/components/checkclock-admin/confirm-dialog";
import { ViewDialog } from "@/components/checkclock-admin/view-dialog";
import { Employee } from "@/components/checkclock-admin/type";
import toast from 'react-hot-toast';
import Title from '@/components/checkclock-user/title';

const Checkclock: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [confirmAction, setConfirmAction] = React.useState<'approve' | 'reject' | null>(null);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  React.useEffect(() => {
    const fetchEmployees = async () => {
      try {

        const token = localStorage.getItem('token');
        if (!token) throw new Error('No auth token found');

        const res = await fetch('/api/checkclocks/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          // omit credentials if not needed
        });


        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const apiEmployees = data;


        const formattedEmployees = apiEmployees.map((item: any) => ({
          id: item.id,
          userId: item.userId,
          name: item.name || 'Unknown',
          position: item.position || 'Unknown',
          clockIn: item.clockIn !== '0' ? item.clockIn.slice(0, 5).replace(':', '.') : '0',
          clockOut: item.clockOut !== '0' ? item.clockOut.slice(0, 5).replace(':', '.') : '0',
          workHours: item.workHours || '0h 0m',
          status: item.status || 'Waiting Approval',
          approved: item.approved || false,
          rejected: item.rejected || false,
          isAbsence: item.absence_type !== undefined, // or any other indicator
          startDate: item.start_date || null,
          endDate: item.end_date || null,
          duration: item.duration || null, // optional
        }));


        setEmployees(formattedEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleStatusChange = async (employeeId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token');

      const res = await fetch(`/api/checkclocks/${employeeId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeId
            ? { ...emp, status: newStatus, approved: newStatus === 'Approved', rejected: newStatus === 'Rejected' }
            : emp
        )
      );
    } catch (error) {
      console.error(error);
    }
  };


  const handleStatus = (clockIn: string, clockOut: string, workHours: string): string => {
    if (clockIn === "0" && clockOut === "0" && workHours === "0") return "Absent";
    if (!clockIn.includes(".")) return "Unknown";

    const [hour, minute] = clockIn.split(".").map(Number);
    if (isNaN(hour) || isNaN(minute)) return "Unknown";

    const totalMinutes = hour * 60 + minute;
    return totalMinutes <= 495 ? "On Time" : "Late";
  };

  const openConfirmDialog = (employee: Employee, action: 'approve' | 'reject') => {
    setSelectedEmployee(employee);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedEmployee || !confirmAction) return;

    const newStatus = confirmAction === 'approve'
      ? handleStatus(selectedEmployee.clockIn, selectedEmployee.clockOut, selectedEmployee.workHours)
      : 'Rejected';

    try {
      await handleStatusChange(selectedEmployee.id, newStatus);
      toast.success(`Status updated to "${newStatus}" successfully!`);
      setShowConfirmModal(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status. Please try again.');
    }
  };


  const handleDetailsClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <CheckclockHeader />
        <Title />
        <EmployeeTable
          employees={employees}
          openConfirmDialog={openConfirmDialog}
          handleDetailsClick={handleDetailsClick}
          setOpenDialog={setOpenDialog}
          confirmAction={confirmAction}
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
        onOpenConfirmDialog={openConfirmDialog} // pass handler here
      />
    </div>
  );
};

export default Checkclock;
