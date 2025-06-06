import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';
import { Employee } from "./type";

interface EmployeeTableProps {
  employees: Employee[];
  openConfirmDialog: (employee: Employee, action: 'approve' | 'reject') => void;
  setSelectedEmployee: (employee: Employee) => void;
  setOpenDialog: (isOpen: boolean) => void;
}

export const EmployeeTable = ({ employees, openConfirmDialog, setSelectedEmployee, setOpenDialog }: EmployeeTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Work Hours</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detail</TableHead>
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
                <span className={`text-xs py-1 px-2 rounded-full ${
                  employee.status === "On Time" ? "bg-green-100 text-green-700" :
                  employee.status === "Late" ? "bg-yellow-100 text-yellow-700" :
                  employee.status === "Rejected" ? "bg-red-100 text-red-700" :
                  employee.status === "Absent" ? "bg-gray-300 text-gray-800" :
                  "bg-gray-200 text-gray-600"
                }`}>
                  {employee.status}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedEmployee(employee);
                  setOpenDialog(true);
                }}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};