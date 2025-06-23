'use client';

import React, { useState, useEffect } from 'react';
import EmployeeForm, { Employee } from '@/components/edit-employee/edit-form.tsx';
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

                const rawData = await res.json();

                const data: Employee = {
                    ...rawData.employee, // ✅ gets all real employee fields
                    email: rawData.email, // ✅ override email from user table if needed
                    employee_id: rawData.employee_id, // ✅ or rawData.employee.employee_id if that's correct
                    avatar: rawData.avatar?.startsWith('http')
                        ? rawData.avatar
                        : `https://pblcmlabs.duckdns.org/storage/${rawData.avatar}`,
                    name: rawData.name, // full name if needed
                };

                setUserData(data);

                if (data.birth_date) {
                    setDate(parseISO(data.birth_date));
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
