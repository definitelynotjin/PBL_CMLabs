'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, ClockAlert, ClockFading } from 'lucide-react';
import { Employee } from "@/components/checkclock-admin/type.ts";
import toast from "react-hot-toast";

interface EmployeeTableProps {
  employees: Employee[];
  openConfirmDialog: (employee: Employee, type: "approve" | "reject") => void;
  handleDetailsClick: (employee: Employee) => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  confirmAction: 'approve' | 'reject' | null;
}
const confirmStatusUpdate = async (checkClockId: string, action: 'approve' | 'reject') => {
  const newStatus = action === 'approve' ? 'Approved' : 'Rejected';

  try {
    const res = await fetch(`/api/checkclocks/${checkClockId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update status: ${res.status}`);
    }

    const data = await res.json();
    toast.success("Status updated successfully!");
    return data;
  } catch (err) {
    toast.error("Could not update status.");
    console.error(err);
  }
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, openConfirmDialog, handleDetailsClick, setOpenDialog }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Clock In</TableHead>
          <TableHead>Clock Out</TableHead>
          <TableHead>Work Hours</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
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

            {/* Status column - text only */}
            <TableCell>
              <span>{employee.status}</span>
            </TableCell>

            {/* Actions column - icons or approve/reject buttons */}
            <TableCell className="flex gap-2 items-center">
              {employee.status === "Approved" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : employee.status === "Rejected" ? (
                <X className="w-4 h-4 text-red-500" />
              ) : employee.status === "Late" ? (
                <ClockAlert className="w-4 h-4 text-yellow-500" />
              ) : employee.isAbsence ? (
                <ClockFading className="w-4 h-4" style={{ color: '#7CA5BF' }} />
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openConfirmDialog(employee, "approve")}
                  >
                    <Check className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openConfirmDialog(employee, "reject")}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </>
              )}
            </TableCell>

            {/* Details column - view button only */}
            <TableCell>
              <Button variant="outline" onClick={() => {
                handleDetailsClick(employee);
                setOpenDialog(true);
              }}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
