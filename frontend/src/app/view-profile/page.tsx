'use client';

import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import { Employee } from '@/components/edit-employee/edit-form';

export default function ViewProfilePage() {
    const [userData, setUserData] = useState<Employee | null>(null);
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
                    id: rawData.employee.id,
                    ck_settings_id: rawData.employee.ck_settings_id || '',
                    first_name: rawData.employee.first_name || '',
                    last_name: rawData.employee.last_name || '',
                    phone: rawData.employee.phone || '',
                    nik: rawData.employee.nik || '',
                    gender: rawData.employee.gender || '',
                    pendidikan_terakhir: rawData.employee.pendidikan_terakhir || '',
                    tempat_lahir: rawData.employee.tempat_lahir || '',
                    birth_date: rawData.employee.birth_date || '',
                    position: rawData.employee.position || '',
                    department: rawData.employee.department || '',
                    contract_type: rawData.employee.contract_type || 'unset',
                    grade: rawData.employee.grade || '',
                    bank: rawData.employee.bank || '',
                    nomor_rekening: rawData.employee.nomor_rekening || '',
                    atas_nama_rekening: rawData.employee.atas_nama_rekening || '',
                    tipe_sp: rawData.employee.tipe_sp || 'unset',
                    address: rawData.employee.address || '',
                    email: rawData.email || '',
                    avatar_url: rawData.avatar?.startsWith('http')
                        ? rawData.avatar
                        : `https://pblcmlabs.duckdns.org/storage/${rawData.avatar}`,
                };

                setUserData(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p className="p-6 text-center">Loading...</p>;
    if (!userData) return <p className="p-6 text-center text-red-500">Failed to load user data.</p>;

    const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => (
        <div className="grid grid-cols-3 gap-4 py-2">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="col-span-2">{value || '-'}</span>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
            {/* Header */}
            <div className="flex items-center gap-6 border-b pb-6 mb-6">
                <Image
                    src={userData.avatar_url || '/default-avatar.png'}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full object-cover border"
                />
                <div>
                    <h1 className="text-2xl font-semibold">{userData.first_name} {userData.last_name}</h1>
                    <p className="text-gray-500">{userData.position} &mdash; {userData.department}</p>
                </div>
            </div>

            {/* Personal Info */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <InfoRow label="Email" value={userData.email} />
                    <InfoRow label="Phone" value={userData.phone} />
                    <InfoRow label="Birthplace" value={userData.tempat_lahir} />
                    <InfoRow
                        label="Date of Birth"
                        value={userData.birth_date ? format(parseISO(userData.birth_date), 'dd MMM yyyy') : ''}
                    />
                    <InfoRow label="Gender" value={userData.gender === 'M' ? 'Male' : userData.gender === 'F' ? 'Female' : ''} />
                    <InfoRow label="Address" value={userData.address} />
                    <InfoRow label="Last Education" value={userData.pendidikan_terakhir} />
                </div>
            </section>

            {/* Employment Info */}
            <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">Employment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <InfoRow label="Branch" value={userData.ck_settings_id} />
                    <InfoRow label="NIK" value={userData.nik} />
                    <InfoRow label="Contract Type" value={userData.contract_type} />
                    <InfoRow label="Grade" value={userData.grade} />
                    <InfoRow label="Bank" value={userData.bank} />
                    <InfoRow label="Account Number" value={userData.nomor_rekening} />
                    <InfoRow label="Account Holder" value={userData.atas_nama_rekening} />
                    <InfoRow label="Tipe SP" value={userData.tipe_sp} />
                </div>
            </section>
        </div>
    );
}
