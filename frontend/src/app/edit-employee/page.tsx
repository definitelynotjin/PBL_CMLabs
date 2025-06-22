'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/edit-employee/header';
import EmployeeForm, { Employee } from '@/components/edit-employee/edit-form';
import 'react-datepicker/dist/react-datepicker.css';
// if you export Employee type there

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function EditEmployeePage() {
  const [date, setDate] = useState<Date | undefined>();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const id = params?.id;
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch employee data (status: ${res.status})`);
        }

        const data = await res.json();

        setEmployeeData(data);
        if (data.birth_date) {
          setDate(new Date(data.birth_date));
        } else if (data.birthDate) {
          setDate(new Date(data.birthDate));
        } else {
          setDate(undefined);
        }
      } catch (err: any) {
        setError(err.message || 'Unexpected error');
        setEmployeeData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  if (loading) {
    return <div className="p-6">Loading employee data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  if (!employeeData) {
    return <div className="p-6">No employee data found.</div>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <Header />
        <EmployeeForm
          date={date}
          setDate={setDate}
          data={employeeData}
          onSuccess={() => {
            router.push(`/employee-database`);
          }}
        />
      </div>
    </div>
  );
}
