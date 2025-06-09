'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar'; // Use the existing Sidebar
import Header from '@/components/employee-database/header';
import Stats from '@/components/employee-database/stats';
import Actions from '@/components/employee-database/actions';
import EmployeeTable from '@/components/employee-database/employee-table';
import EmployeeDetail from '@/components/employee-database/employee-detail';
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
  user?: User; // nested user relation
};

export default function EmployeeDatabasePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [periode, setPeriode] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Fetch employees on search change
  useEffect(() => {
    setLoading(true);

    const employeesUrl = `https://pblcmlabs.duckdns.org/api/employees?search=${encodeURIComponent(search)}&include_all=true`;
    const candidatesUrl = `https://pblcmlabs.duckdns.org/api/employees/candidates?search=${encodeURIComponent(search)}`;

    Promise.all([
      fetch(employeesUrl).then(res => {
        if (!res.ok) throw new Error('Failed to fetch employees');
        return res.json();
      }),
      fetch(candidatesUrl).then(res => {
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
          employment_status: 'Candidate',
          type: 'Candidate',
          user: {
            id: candidate.id || candidate.user_id,
            employee_id: candidate.employee_id || '-',
          },
        }));

        setEmployees([...mappedEmployees, ...mappedCandidates]);
      })
      .catch(err => {
        console.error('Fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, [search]);

  // Set current periode (month year)
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    setPeriode(formatted);
  }, []);

  // Handler when employee name clicked in table
  function handleNameClick(emp: Employee) {
    setSelectedEmployee(emp);
    setShowDetail(true);
  }

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
          onNameClick={handleNameClick} // Pass handler to EmployeeTable
        />

        {/* Modal popup for employee details and document */}
        {showDetail && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full relative max-h-[90vh] overflow-auto">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setShowDetail(false)}
                aria-label="Close detail modal"
              >
                ✕
              </button>
              <EmployeeDetail employee={selectedEmployee} />
              <TambahDokumen employeeId={selectedEmployee.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
