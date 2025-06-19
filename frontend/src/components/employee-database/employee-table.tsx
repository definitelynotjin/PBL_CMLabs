import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Edit2, Trash2 } from 'lucide-react';
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

  const getCsrfToken = () => {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='));
    return match ? decodeURIComponent(match.split('=')[1]) : '';
  };

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
      await fetch(`${API_BASE_URL.replace(/\/$/, '')}/sanctum/csrf-cookie`, {
        credentials: 'include',
      });
      const csrfToken = getCsrfToken();
      const res = await fetch(
        `${API_BASE_URL.replace(/\/$/, '')}/employees/upsert/${emp.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({
            status: newStatus,
            type: newType,
          }),
        }
      );

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
        {/* ... table header and body as before ... */}
      </table>
    </div>
  );
};

export default EmployeeTable;
