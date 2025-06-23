'use client';

import React, { useState, useEffect } from 'react';
import EmployeeForm, { Employee } from '@/components/edit-employee/edit-form.tsx'; // same import
import { parseISO } from 'date-fns';

export default function ViewProfilePage() {
    const [userData, setUserData] = useState<Employee | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('https://pblcmlabs.duckdns.org/api/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data: Employee = await res.json();

                setUserData(data);

                if (data.birth_date) {
                    setDate(parseISO(data.birth_date)); // convert string to Date for ReactDatePicker
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!userData) return <p>Failed to load user data.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">View Profile</h1>
            <EmployeeForm
                data={userData}
                date={date}
                setDate={setDate}
                onSuccess={() => { }}
                readOnly={true}
            />
        </div>
    );
}
