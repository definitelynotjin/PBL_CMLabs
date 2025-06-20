'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/edit-employee/header';
import EmployeeForm from '@/components/edit-employee/edit-form';

export default function PromoteCandidatePage() {
    const [date, setDate] = useState<Date | undefined>();
    const [userData, setUserData] = useState<any>(null);
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
                if (!token) throw new Error('No auth token found');

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, // assuming you get candidate data via /users/{id}
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!res.ok) throw new Error(`Failed to fetch user (status: ${res.status})`);

                const data = await res.json();
                setUserData(data);
            } catch (err: any) {
                setError(err.message || 'Unexpected error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    if (loading) return <div className="p-6">Loading candidate data...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
    if (!userData) return <div className="p-6">No candidate data found.</div>;

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6">
                <Header />
                <EmployeeForm
                    date={date}
                    setDate={setDate}
                    user={userData}
                    userId={userData.id}
                    onSuccess={() => router.push('/employee-database')}
                />
            </div>
        </div>
    );
}
