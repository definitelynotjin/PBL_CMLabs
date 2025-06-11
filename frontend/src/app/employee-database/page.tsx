'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/employee-database/header';
import Stats from '@/components/employee-database/stats';
import Actions from '@/components/employee-database/actions';
import EmployeeTable from '@/components/employee-database/employee-table';
import EmployeeDetailDialog from '@/components/employee-database/employee-detail-dialog.tsx';
import EmployeeDocumentsDialog from '@/components/employee-database/employee-documents-dialog';
import TambahDokumen from '@/components/employee-database/tambah-dokumen';

type User = {
  id: string;
  employee_id: string;
};

type Employee = {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  branch?: string;
  position: string;
  grade?: string;
  status: boolean;
  employment_status?: string;
  type?: string;
  user?: User;
};

export default function EmployeeDatabasePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [periode, setPeriode] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // New state for dialogs
  const [showDocuments, setShowDocuments] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    setLoading(true);

    const employeesUrl = `https://pblcmlabs.duckdns.org/api/employees?search=${encodeURIComponent(
      search
    )}&include_all=true`;
    const candidatesUrl = `https://pblcmlabs.duckdns.org/api/employees/candidates?search=${encodeURIComponent(
      search
    )}`;

    Promise.all([
      fetch(employeesUrl).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch employees');
        return res.json();
      }),
      fetch(candidatesUrl).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch candidates');
        return res.json();
      }),
    ])
      .then(([employeesData, candidatesData]) => {
        const mappedEmployees = employeesData.data.data.map((emp: Employee) => ({
          ...emp,
          status: emp.employment_status === 'Active',
          type: 'Employee',
        }));

        const mappedCandidates = candidatesData.data.map((candidate: any) => ({
          id: candidate.id || candidate.user_id,
          user_id: candidate.id || candidate.user_id,
          first_name: candidate.name?.split(' ')[0] || candidate.name || '-',
          last_name: candidate.name?.split(' ').slice(1).join(' ') || '',
          gender: '-',
          phone: candidate.phone || '-',
          branch: '-',
          position: '-',
          grade: '-',
          status: false,
          employment_status: '-',
          type: 'Candidate',
          user: {
            id: candidate.id || candidate.user_id,
            employee_id: candidate.employee_id || '-',
          },
        }));

        setEmployees([...mappedEmployees, ...mappedCandidates]);
      })
      .catch((err) => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    setPeriode(formatted);
  }, []);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  // These handlers open the dialogs
  const handleShowDocuments = () => {
    setShowDocuments(true);
  };

  const handleShowUpload = () => {
    setShowUpload(true);
  };

  // This handles the upload completion (adjust as needed)
  const handleUpload = async (file: File, docType: string, employeeId: string) => {
    // TODO: your upload API call here
    alert(`Uploading ${docType} for employee ${employeeId}`);

    // Close upload dialog, open documents dialog to refresh
    setShowUpload(false);
    setShowDocuments(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Header search={search} setSearch={setSearch} />
        <Stats employees={employees} periode={periode} />
        <Actions />
        <EmployeeTable employees={employees} loading={loading} onRowClick={handleRowClick} />
      </div>

      {selectedEmployee && (
        <EmployeeDetailDialog
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onShowDocuments={handleShowDocuments}
          onShowUpload={handleShowUpload}
        />
      )}

      {showDocuments && selectedEmployee && (
        <EmployeeDocumentsDialog
          employeeId={selectedEmployee.id.toString()}
          onClose={() => setShowDocuments(false)}
        />
      )}

      {showUpload && selectedEmployee && (
        <TambahDokumen
          employee={selectedEmployee}
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}
