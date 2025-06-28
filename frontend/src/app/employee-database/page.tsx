'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { Header } from '@/components/employee-database/header';
import Stats from '@/components/employee-database/stats';
import Actions from '@/components/employee-database/actions';
import EmployeeTable from '@/components/employee-database/employee-table';
import EmployeeDetailDialog from '@/components/employee-database/employee-detail-dialog';
import UploadDocumentDialog from '@/components/employee-database/upload-documents-dialog';
import EmployeeDocumentsDialog from '@/components/employee-database/employee-documents-dialog';
import EmployeeProfileDialog from '@/components/employee-database/employee-profile-dialog';
import toast from 'react-hot-toast';



import { Employee } from '@/components/employee-database/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function LetterManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [periode, setPeriode] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileEmployee, setProfileEmployee] = useState<Employee | null>(null);

  const handleViewProfile = (emp: Employee) => {
    setProfileEmployee(emp);
    setShowProfile(true);
  };


  const fetchEmployees = React.useCallback(async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      const employeesUrl = `${API_BASE_URL}/employees?search=${encodeURIComponent(search)}`;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const res = await fetch(employeesUrl, { headers });

      if (!res.ok) {
        throw new Error('Failed to fetch employee data');
      }

      const employeesData = await res.json();

      // Map employees and fix status field
      const mappedEmployees = employeesData.data.data.map((emp: Employee) => ({
        ...emp,
        status: Number(emp.status) === 1,
      }));

      setEmployees(mappedEmployees);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    setPeriode(formatted);
  }, []);

  const handleUpload = async (file: File, type: string) => {
    if (!selectedEmployee) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      const formData = new FormData();
      formData.append('user_id', selectedEmployee.user_id);
      formData.append('document_type', type);
      formData.append('file', file);

      const res = await fetch(`${API_BASE_URL}/documents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type when sending FormData; browser handles it
        },
        body: formData,
      });

      if (res.ok) {
        toast.success('Document uploaded successfully');
        setShowUpload(false);
        fetchEmployees(); // Refresh employees after upload if needed
      } else {
        toast.error('Upload failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Upload failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Header search={search} setSearch={setSearch} />
        <Stats employees={employees} periode={periode} />
        <Actions employees={employees} />
        <EmployeeTable
          employees={employees}
          loading={loading}
          onRowClick={(emp: Employee) => setSelectedEmployee(emp)}
          refreshData={fetchEmployees}
          onViewProfile={handleViewProfile}
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
          />
        )}

        {showDocuments && selectedEmployee && (
          <EmployeeDocumentsDialog
            open={showDocuments}
            employeeId={selectedEmployee.id}
            onClose={() => setShowDocuments(false)}
          />
        )}

        {profileEmployee && (
          <EmployeeProfileDialog
            open={showProfile}
            onClose={() => {
              setShowProfile(false);
              setProfileEmployee(null); // ✅ Reset employee so dialog is re-renderable
            }}
            employee={profileEmployee}
          />
        )}

      </div>
    </div>
  );
}
