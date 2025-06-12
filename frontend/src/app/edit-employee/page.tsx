'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/edit-employee/header';
import EmployeeForm from '@/components/edit-employee/edit-form';

export default function EditEmployeePage() {
  const [date, setDate] = useState<Date | undefined>();
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams(); // Get [id] from URL

  useEffect(() => {
    const fetchData = async () => {
      const id = params?.id;
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        // Replace this URL with your actual API endpoint
        const res = await fetch(`/api/employees/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if needed, e.g.:
            // 'Authorization': `Bearer ${token}`
          },
          credentials: 'include', // include cookies if using session auth
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch employee data (status: ${res.status})`);
        }

        const data = await res.json();

        setEmployeeData(data);
        if (data.birthDate) {
          setDate(new Date(data.birthDate));
        } else if (data.birth_date) {
          // adjust if your API returns snake_case
          setDate(new Date(data.birth_date));
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
  }, [params]);

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
        <EmployeeForm date={date} setDate={setDate} data={employeeData} />
      </div>
    </div>
  );
}
