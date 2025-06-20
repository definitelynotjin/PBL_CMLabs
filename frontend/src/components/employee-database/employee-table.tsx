import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Edit2, Trash2, FileText, FilePlus } from 'lucide-react';
import { Employee } from './types';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  onRowClick: (employee: Employee) => void;
  refreshData: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  loading,
  onRowClick,
  refreshData,
}) => {
  const handleStatusToggle = async (emp: Employee) => {
    let newStatus = emp.status;
    let newType = emp.type;

    if (emp.type === 'candidate') {
      newType = 'employee';
      newStatus = true;
    } else {
      newStatus = !emp.status;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      const res = await fetch(`${API_BASE_URL}/employees/upsert/${emp.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Bearer token header
        },
        body: JSON.stringify({
          status: newStatus,
          type: newType,
        }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      refreshData();
    } catch (err) {
      console.error(err);
      alert('Failed to update employee status');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border rounded-md">
        <thead>
          <tr className="bg-muted text-left">
            {[
              'No',
              'ID',
              'Avatar',
              'Nama',
              'Jenis Kelamin',
              'Nomor Telepon',
              'Cabang',
              'Jabatan',
              'Grade',
              'Status',
              'Type',
              'Action',
            ].map((col) => (
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
              <td colSpan={12} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{emp.user?.employee_id || '-'}</td>
                <td className="p-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                </td>
                <td className="p-2">
                  <span className="text-gray-900">
                    {emp.first_name} {emp.last_name}
                  </span>
                </td>
                <td className="p-2">
                  <span className="bg-muted px-2 py-1 rounded text-xs font-medium">
                    {emp.gender}
                  </span>
                </td>
                <td className="p-2">{emp.phone}</td>
                <td className="p-2">{emp.branch || '-'}</td>
                <td className="p-2">{emp.position}</td>
                <td className="p-2">{emp.grade || '-'}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={emp.status || emp.type === 'candidate'}
                      onCheckedChange={() => handleStatusToggle(emp)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {emp.type === 'candidate'
                        ? 'Candidate'
                        : emp.status
                          ? 'Active'
                          : 'Inactive'}
                    </span>
                  </div>
                </td>
                <td className="p-2">{emp.type}</td>
                <td className="p-2 flex gap-2">
                  {/* Edit */}
                  <Link href={`/employees/${emp.id}/edit`}>
                    <Button variant="ghost" size="sm" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Delete */}
                  <Link href={`/employees/${emp.id}/delete`}>
                    <Button variant="ghost" size="sm" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Conditional Third Button */}
                  {emp.type === 'employee' ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Manage Letters"
                      onClick={() => onRowClick(emp)}
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Link href={`/employees/${emp.id}/promote`}>
                      <Button variant="ghost" size="sm" title="Promote to Employee">
                        <FilePlus className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
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
