'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/edit-employee/header';
import EmployeeForm from '@/components/edit-employee/edit-form';

export default function EditEmployeePage() {
  const [date, setDate] = useState<Date | undefined>();
  const [employeeData, setEmployeeData] = useState<any>(null);
  const params = useParams(); // Ambil parameter [id] dari URL

  useEffect(() => {
    // Simulasi fetch data dari API berdasarkan ID
    const fetchData = async () => {
      const id = params?.id;
      if (!id) return;

      // Ganti ini dengan fetch API asli kamu
      const mockEmployee = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01'),
        // ...data lain
      };

      setEmployeeData(mockEmployee);
      setDate(new Date(mockEmployee.birthDate));
    };

    fetchData();
  }, [params]);

  if (!employeeData) {
    return <div className="p-6">Loading employee data...</div>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <Header />
        <EmployeeForm date={date} setDate={setDate} data={employeeData} />
      </div>
    </div>
  );
}
