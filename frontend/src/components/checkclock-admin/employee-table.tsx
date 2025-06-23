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
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Clock In</th>
            <th className="border px-4 py-2">Clock Out</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.position}</td>
              <td className="border px-4 py-2">{emp.clockIn}</td>
              <td className="border px-4 py-2">{emp.clockOut}</td>
              <td className="border px-4 py-2">{emp.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="mr-2 text-green-600"
                  onClick={() => openConfirmDialog(emp, 'approve')}
                >
                  Approve
                </button>
                <button
                  className="mr-2 text-red-600"
                  onClick={() => openConfirmDialog(emp, 'reject')}
                >
                  Reject
                </button>
                <button
                  className="text-blue-600"
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
    </div>
  );
};

export default EmployeeTable;
