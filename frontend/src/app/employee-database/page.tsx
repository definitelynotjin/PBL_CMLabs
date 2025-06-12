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


  useEffect(() => {
    setLoading(true);
    const employeesUrl = `https://pblcmlabs.duckdns.org/api/employees?search=${encodeURIComponent(search)}&include_all=true`;
    const candidatesUrl = `https://pblcmlabs.duckdns.org/api/employees/candidates?search=${encodeURIComponent(search)}`;

    Promise.all([
      fetch(employeesUrl).then(res => res.json()),
      fetch(candidatesUrl).then(res => res.json()),
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
          employment_status: 'Candidate',
          type: 'Candidate',
          user: {
            id: candidate.id || candidate.user_id,
            employee_id: candidate.employee_id || '-',
          },
        }));

        setEmployees([...mappedEmployees, ...mappedCandidates]);
      })
      .finally(() => setLoading(false));
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

    const res = await fetch('https://your-api-endpoint/upload-document', {
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