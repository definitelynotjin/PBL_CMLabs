'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmployeeForm from '@/components/edit-employee/edit-form';

const EmployeeEditPage = () => {
    const router = useRouter();
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const id = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : null;

    useEffect(() => {
        if (!id) return;

        const fetchEmployee = async () => {
            try {
                const res = await fetch(`/api/employees/${id}`);
                if (!res.ok) throw new Error('Failed to fetch employee data');
                const data = await res.json();

                setEmployeeData(data);
                if (data.tanggalLahir) setDate(new Date(data.tanggalLahir));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) return <p>Loading employee data...</p>;
    if (!employeeData) return <p>Employee not found.</p>;

    return (
        <div className="container mx-auto p-4">
            <EmployeeForm
                data={employeeData}
                date={date}
                setDate={setDate}
                onSuccess={() => router.push('/employee-database')}
            />
        </div>
    );
};

export default EmployeeEditPage;
