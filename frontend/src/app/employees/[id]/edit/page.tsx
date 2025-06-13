'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EmployeeForm from '@/components/edit-employee/edit-form';

const EmployeeEditPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [candidateData, setCandidateData] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchEmployee = async () => {
            try {
                const res = await fetch(`/api/employees/${id}`);
                if (!res.ok) throw new Error('Failed to fetch employee data');
                const data = await res.json();

                if (data.candidate) {
                    // Candidate found, no employee record yet
                    setEmployeeData(null); // no employee data
                    setCandidateData(data.candidate);
                    setDate(undefined);
                } else if (data.data) {
                    setEmployeeData(data.data);
                    if (data.data.birth_date) setDate(new Date(data.data.birth_date));
                    setCandidateData(null);
                }
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
                onSuccess={() => router.push('/employees')} // verify your list route
            />
        </div>
    );
};

export default EmployeeEditPage;
