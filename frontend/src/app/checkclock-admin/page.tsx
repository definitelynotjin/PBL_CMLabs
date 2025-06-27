'use client';

import * as React from "react";
import Sidebar from "@/components/sidebar";
import CheckclockHeader from "@/components/checkclock-admin/header";
import EmployeeTable from "@/components/checkclock-admin/employee-table";
import { ConfirmDialog } from "@/components/checkclock-admin/confirm-dialog";
import { ViewDialog } from "@/components/checkclock-admin/view-dialog";
import { Employee } from "@/components/checkclock-admin/type";
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
        // Assuming API returns { data: CheckClock[] }
        const apiEmployees = data;

        // Map backend data to your Employee type
        // This example assumes each CheckClock item has user and employee relationships populated
        const formattedEmployees = apiEmployees.map((item: any) => ({
          id: item.id,
          name: item.name || 'Unknown',
          position: item.position || 'Unknown',
          clockIn: item.clockIn !== '0' ? item.clockIn.slice(0, 5).replace(':', '.') : '0',
          clockOut: item.clockOut !== '0' ? item.clockOut.slice(0, 5).replace(':', '.') : '0',
          workHours: item.workHours || '0h 0m',
          status: item.status || 'Waiting Approval',
          approved: item.approved || false,
          rejected: item.rejected || false,
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
      if (emp.id === selectedEmployee.id) {
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
    setOpenDialog(true);
  };

  if (loading) return <div>Loading...</div>;

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
      {selectedEmployee && (
        <ViewDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedEmployee={selectedEmployee}
          onStatusChange={handleStatusChange}
        />
      )}

    </div>
  );
};

export default Checkclock;
