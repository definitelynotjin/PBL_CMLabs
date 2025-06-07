import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Edit2, Trash2, Copy } from 'lucide-react';
import { Employee } from './types'; // Ensure correct import

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border rounded-md">
        <thead>
          <tr className="bg-muted text-left">
            {['No', 'ID', 'Avatar', 'Nama', 'Jenis Kelamin', 'Nomor Telepon', 'Cabang', 'Jabatan', 'Grade', 'Status', 'Type', 'Action'].map((col) => (
              <th key={col} className="p-2">
                <div className="flex items-center gap-1">
                  {col}
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={12} className="text-center p-4">Loading...</td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{emp.user?.employee_id || '-'}</td> {/* Access user property safely */}
                <td className="p-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                </td>
                <td className="p-2">{emp.first_name} {emp.last_name}</td>
                <td className="p-2">
                  <span className="bg-muted px-2 py-1 rounded text-xs font-medium">{emp.gender}</span>
                </td>
                <td className="p-2">{emp.phone}</td>
                <td className="p-2">{emp.branch || '-'}</td>
                <td className="p-2">{emp.position}</td>
                <td className="p-2">{emp.grade || '-'}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{emp.status ? 'Active' : 'Inactive'}</span>
                  </div>
                </td>
                <td className="p-2">{emp.type}</td>
                <td className="p-2 flex gap-2">
                  <Button variant="ghost" size="sm" title="Edit"><Edit2 /></Button>
                  <Button variant="ghost" size="sm" title="Delete"><Trash2 /></Button>
                  <Button variant="ghost" size="sm" title="Copy"><Copy /></Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;