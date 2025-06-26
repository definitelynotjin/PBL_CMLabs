'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Edit2, Trash2, FileText, User } from 'lucide-react';
import { Employee } from './types';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContentCentered,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  onRowClick: (employee: Employee) => void;
  refreshData: () => void;
  onViewProfile: (employee: Employee) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  loading,
  onRowClick,
  refreshData,
  onViewProfile,
}) => {
  const [sortKey, setSortKey] = useState<keyof Employee | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const toggleSort = (key: keyof Employee) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortKey(null);
      setSortDirection(null);
    }
  };

  const sortedEmployees = useMemo(() => {
    if (!sortKey || !sortDirection) return employees;

    return [...employees].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }

      if (typeof aVal === 'number') {
        return sortDirection === 'asc'
          ? aVal - (bVal as number)
          : (bVal as number) - aVal;
      }

      return 0;
    });
  }, [employees, sortKey, sortDirection]);

  const openDeleteDialog = (emp: Employee) => {
    setEmployeeToDelete(emp);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      const res = await fetch(`${API_BASE_URL}/employees/${employeeToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete employee');

      toast.success('Employee deleted successfully');
      refreshData(); // reload employee list after deletion
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete employee');
    }
  };

  const handleStatusToggle = async (emp: Employee) => {
    const newStatus = emp.status ? 0 : 1;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      const res = await fetch(`${API_BASE_URL}/employees/${emp.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      refreshData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update employee status');
    }
  };

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-md">
          <thead>
            <tr className="bg-muted text-left">
              {[
                { label: 'No', key: null },
                { label: 'ID', key: null },
                { label: 'Name', key: 'first_name' },
                { label: 'Gender', key: 'gender' },
                { label: 'Phone Number', key: 'phone' },
                { label: 'Branch', key: null },
                { label: 'Position', key: 'position' },
                { label: 'Grade', key: 'grade' },
                { label: 'Status', key: 'status' },
                { label: 'Action', key: null },
              ].map((col, idx) => (
                <th key={idx} className="p-2">
                  <div
                    className={`flex items-center gap-1 ${col.key ? 'cursor-pointer' : ''
                      }`}
                    onClick={() => col.key && toggleSort(col.key as keyof Employee)}
                  >
                    {col.label}
                    {col.key && (
                      <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : sortedEmployees.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No employees found.
                </td>
              </tr>
            ) : (
              sortedEmployees.map((emp, index) => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{emp.user?.employee_id || '-'}</td>
                  <td className="p-2">
                    {emp.first_name} {emp.last_name}
                  </td>
                  <td className="p-2">{emp.gender}</td>
                  <td className="p-2">{emp.phone}</td>
                  <td className="p-2">{emp.check_clock_setting?.name || '-'}</td>
                  <td className="p-2">{emp.position}</td>
                  <td className="p-2">{emp.grade || '-'}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={Boolean(emp.status)}
                        onCheckedChange={() => handleStatusToggle(emp)}
                      />
                      <span className="text-xs text-muted-foreground">
                        {emp.status ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/employees/${emp.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#FFAB00] hover:text-white"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="top">Edit</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(emp)}
                          className="hover:bg-[#C11106] hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Delete</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRowClick(emp)}
                          className="hover:bg-[#2D8EFF] hover:text-white"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Manage Letters</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewProfile(emp)}
                          className="hover:bg-[#1E3A5F] hover:text-white"
                        >
                          <User className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">View Profile</TooltipContent>
                    </Tooltip>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContentCentered>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete{' '}
              <strong>
                {employeeToDelete?.first_name} {employeeToDelete?.last_name}
              </strong>
              ?
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContentCentered>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default EmployeeTable;
