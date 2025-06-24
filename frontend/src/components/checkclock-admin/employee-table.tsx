// components/checkclock-admin/EmployeeTable.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from 'lucide-react';

interface Employee {
  name: string;
  position: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  approved: boolean;
  rejected: boolean;
}

interface EmployeeTableProps {
  employees: Employee[];
  openConfirmDialog: (employee: Employee, type: "approve" | "reject") => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, openConfirmDialog, setOpenDialog }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Clock In</TableHead>
          <TableHead>Clock Out</TableHead>
          <TableHead>Work Hours</TableHead>
          <TableHead>Actions</TableHead>
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
              <Button variant="outline" onClick={() => setOpenDialog(true)}>View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;