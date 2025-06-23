'use client';

import React from 'react';
import { Employee } from './type';

interface EmployeeTableProps {
  employees: Employee[];
  openConfirmDialog: (employee: Employee, action: 'approve' | 'reject') => void;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  openConfirmDialog,
  setSelectedEmployee,
  setOpenDialog,
}) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Position</th>
          <th className="border px-4 py-2">Clock In</th>
          <th className="border px-4 py-2">Clock Out</th>
          <th className="border px-4 py-2">Work Hours</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{emp.name}</td>
            <td className="border px-4 py-2">{emp.position}</td>
            <td className="border px-4 py-2">{emp.clockIn}</td>
            <td className="border px-4 py-2">{emp.clockOut}</td>
            <td className="border px-4 py-2">{emp.workHours}</td>
            <td className="border px-4 py-2">{emp.status}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                className="text-green-600 hover:underline"
                onClick={() => openConfirmDialog(emp, 'approve')}
              >
                Approve
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => openConfirmDialog(emp, 'reject')}
              >
                Reject
              </button>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setSelectedEmployee(emp);
                  setOpenDialog(true);
                }}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
