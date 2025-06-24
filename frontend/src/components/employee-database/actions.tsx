'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import { Employee } from './types'; // make sure this import exists

interface ActionsProps {
  employees: Employee[];
}

const exportToCSV = (employees: Employee[]) => {
  if (!employees.length) return alert('No employee data to export.');

  const headers = [
    'ID',
    'First Name',
    'Last Name',
    'Gender',
    'Phone',
    'Branch',
    'Position',
    'Grade',
    'Contract Type',
    'Employment Status',
    'Join Date',
  ];

  const rows = employees.map(emp => [
    emp.user?.employee_id || '',
    emp.first_name,
    emp.last_name,
    emp.gender,
    emp.phone,
    emp.check_clock_setting?.name || '',
    emp.position,
    emp.grade || '',
    emp.contract_type || '',
    emp.employment_status || '',
    emp.join_date || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'employees.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Actions: React.FC<ActionsProps> = ({ employees }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">All Employees Information</h2>
      <div className="flex gap-2">
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
        <Button variant="outline" onClick={() => exportToCSV(employees)}>
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" /> Import
        </Button>
        <Link href="/add-new-employee" passHref>
          <Button>+ Tambah Data</Button>
        </Link>
      </div>
    </div>
  );
};

export default Actions;
