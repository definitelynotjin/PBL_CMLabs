'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { Header } from '@/components/employee-database/header';
import Stats from '@/components/employee-database/stats';
import Actions from '@/components/employee-database/actions';
import EmployeeTable from '@/components/employee-database/employee-table';
import EmployeeDetailDialog from '@/components/employee-database/employee-detail-dialog';
import UploadDocumentDialog from '@/components/employee-database/employee-documents-dialog';
import { Employee } from '@/components/employee-database/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const SANCTUM_BASE_URL = process.env.NEXT_PUBLIC_SANCTUM_BASE_URL || '';

export default function LetterManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [periode, setPeriode] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [showDocuments, setShowDocuments] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);

    try {
      // Fetch CSRF cookie for Sanctum (no /api here)
      await fetch(`${SANCTUM_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
      });

      // Fetch employees and candidates from API
      const employeesUrl = `${API_BASE_URL}/employees?search=${encodeURIComponent(search)}&include_all=true`;
      const candidatesUrl = `${API_BASE_URL}/employees/candidates?search=${encodeURIComponent(search)}`;

      const [employeesRes, candidatesRes] = await Promise.all([
        fetch(employeesUrl, { credentials: 'include' }),
        fetch(candidatesUrl, { credentials: 'include' }),
      ]);

      if (!employeesRes.ok || !candidatesRes.ok) {
        throw new Error('Failed to fetch employee data');
      }

      const employeesData = await employeesRes.json();
      const candidatesData = await candidatesRes.json();

      const mappedEmployees = employeesData.data.data.map((emp: Employee) => ({
        ...emp,
        status: emp.employment_status === 'Active',
        type: 'employee',
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
        employment_status: 'Candidate',
        type: 'candidate',
        user: {
          id: candidate.id || candidate.user_id,
          employee_id: candidate.employee_id || '-',
        },
      }));

      setEmployees([...mappedEmployees, ...mappedCandidates]);
    } catch (error) {
      console.error(error);
      alert('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    setPeriode(formatted);
  }, []);

  const handleUpload = async () => {
    if (!selectedEmployee || !documentFile || !documentType) return;

    const formData = new FormData();
    formData.append('employee_id', selectedEmployee.user_id);
    formData.append('document_type', documentType);
    formData.append('file', documentFile);

    const res = await fetch(`${API_BASE_URL}/upload-document`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Document uploaded successfully');
      setShowUpload(false);
      setDocumentFile(null);
      setDocumentType('');
    } else {
      alert('Upload failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Header search={search} setSearch={setSearch} />
        <Stats employees={employees} periode={periode} />
        <Actions />
        <EmployeeTable
          employees={employees}
          loading={loading}
          onRowClick={(emp: Employee) => setSelectedEmployee(emp)}
          refreshData={fetchEmployees}
        />

        {selectedEmployee && (
          <EmployeeDetailDialog
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
            onShowUpload={() => setShowUpload(true)}
            onShowDocuments={() => setShowDocuments(true)}
          />
        )}

        {showUpload && (
          <UploadDocumentDialog
            onClose={() => setShowUpload(false)}
            onSubmit={handleUpload}
            setDocumentType={setDocumentType}
            setDocumentFile={setDocumentFile}
          />
        )}
      </div>
    </div>
  );
}
