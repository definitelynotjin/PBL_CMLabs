'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from 'lucide-react';
import { Employee } from "@/components/checkclock-admin/type.ts";


interface EmployeeTableProps {
  employees: Employee[];
  openConfirmDialog: (employee: Employee, type: "approve" | "reject") => void;
  handleDetailsClick: (employee: Employee) => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  confirmAction: 'approve' | 'reject' | null;
}

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
            <TableCell>{employee.status}</TableCell>
            <TableCell className="flex gap-2">
              {employee.approved && <Check className="w-4 h-4 text-green-500" />}
              {employee.rejected && <X className="w-4 h-4 text-red-500" />}
              {!employee.approved && !employee.rejected && (
                <>
                  <Button variant="ghost" size="icon" onClick={() => openConfirmDialog(employee, "approve")}>
                    <Check className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openConfirmDialog(employee, "reject")}>
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </>
              )}
            </TableCell>
            <TableCell>
              <Button variant="outline" onClick={() => {
                handleDetailsClick(employee);
                setOpenDialog(true); // Open the view dialog here
              }}>View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
