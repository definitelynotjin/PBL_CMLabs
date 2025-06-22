'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EmployeeForm from '@/components/edit-employee/edit-form';
import Sidebar from '@/components/sidebar';  // import Sidebar here

const EmployeeEditPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchEmployee = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No auth token found');
                    return;
                }

                const res = await fetch(`/api/employees/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });

                if (!res.ok) throw new Error('Failed to fetch employee data');

                const data = await res.json();

                const employee = data.data;

                if (employee?.birth_date) {
                    setDate(new Date(employee.birth_date));
                }

                setEmployeeData(employee);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) return <p>Loading employee data...</p>;
    if (!employeeData) return <p>Employee not found.</p>;

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-6">
                <EmployeeForm
                    data={employeeData}
                    date={date}
                    setDate={setDate}
                    onSuccess={() => router.push(`/employees/${id}/edit`)}
                />
            </main>
        </div>
    );
};

export default EmployeeEditPage;
