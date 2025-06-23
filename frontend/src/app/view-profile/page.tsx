'use client';

import React, { useState, useEffect } from 'react';
import EmployeeForm, { Employee } from '@/components/edit-employee/edit-form.tsx';
import { parseISO } from 'date-fns';

export default function ViewProfilePage() {
    const [userData, setUserData] = useState<Employee | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');

                // 1. Get logged-in user
                const meRes = await fetch('https://pblcmlabs.duckdns.org/api/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const meData = await meRes.json();

                // 2. Fetch full employee data using the user id
                const profileRes = await fetch(`https://pblcmlabs.duckdns.org/api/employees/${meData.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const employeeData: Employee = await profileRes.json();

                setUserData(employeeData);

                if (employeeData.birth_date) {
                    setDate(parseISO(employeeData.birth_date));
                }
            } catch (error) {
                console.error('Failed to fetch full user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
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
