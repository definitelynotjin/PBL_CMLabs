'use client';

import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import { Employee } from '@/components/edit-employee/edit-form';

export default function ViewProfilePage() {
    const [userData, setUserData] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    const branchOptions = [
        { label: 'Surabaya Office', value: 'c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae' },
        { label: 'Jakarta Office', value: 'a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92' },
        { label: 'Malang Office', value: '58b66a88-1e4f-46c1-8e90-b47194983a9a' },
    ];

    function getBranchLabel(value: string) {
        const option = branchOptions.find((opt) => opt.value === value);
        return option ? option.label : value;
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found in localStorage.');

                const res = await fetch('https://pblcmlabs.duckdns.org/api/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const rawData = await res.json();
                console.log("RAW USER DATA:", rawData);

                // Fallback if no employee object
                const employeeData = rawData.employee ?? {};

                const data: Employee = {
                    id: employeeData.id ?? rawData.id,
                    ck_settings_id: employeeData.ck_settings_id ?? '',
                    first_name: employeeData.first_name ?? rawData.name?.split(' ')[0] ?? '',
                    last_name: employeeData.last_name ?? rawData.name?.split(' ').slice(1).join(' ') ?? '',
                    phone: employeeData.phone ?? rawData.phone ?? '',
                    nik: employeeData.nik ?? '',
                    gender: employeeData.gender ?? '',
                    pendidikan_terakhir: employeeData.pendidikan_terakhir ?? '',
                    tempat_lahir: employeeData.tempat_lahir ?? '',
                    birth_date: employeeData.birth_date ?? '',
                    position: employeeData.position ?? rawData.role ?? '',
                    department: employeeData.department ?? '',
                    contract_type: employeeData.contract_type ?? 'unset',
                    grade: employeeData.grade ?? '',
                    bank: employeeData.bank ?? '',
                    nomor_rekening: employeeData.nomor_rekening ?? '',
                    atas_nama_rekening: employeeData.atas_nama_rekening ?? '',
                    tipe_sp: employeeData.tipe_sp ?? 'unset',
                    address: employeeData.address ?? '',
                    email: rawData.email ?? '',
                    avatar_url:
                        typeof rawData.avatar === 'string' && rawData.avatar.startsWith('http')
                            ? rawData.avatar
                            : rawData.avatar
                                ? `https://pblcmlabs.duckdns.org/storage/${rawData.avatar}`
                                : '/default-avatar.png',
                };

                setUserData(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };


        fetchUser();
    }, []);

    if (loading) return <p className="p-6 text-center">Loading...</p>;
    if (!userData) return <p className="p-6 text-center text-red-500">Failed to load user data.</p>;

    const InfoRow = ({ label, value }: { label: string; value?: string }) => (
        <div className="grid grid-cols-3 gap-4 py-2">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="col-span-2">{value ?? '-'}</span>
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
                    <h1 className="text-2xl font-semibold">
                        {userData.first_name} {userData.last_name}
                    </h1>
                    <p className="text-gray-500">
                        {userData.position} &mdash; {userData.department}
                    </p>
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
                    <InfoRow
                        label="Gender"
                        value={
                            userData.gender === 'M'
                                ? 'Male'
                                : userData.gender === 'F'
                                    ? 'Female'
                                    : '-'
                        }
                    />
                    <InfoRow label="Address" value={userData.address} />
                    <InfoRow label="Last Education" value={userData.pendidikan_terakhir} />
                </div>
            </section>

            {/* Employment Info */}
            <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">Employment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <InfoRow label="Branch" value={getBranchLabel(userData.ck_settings_id ?? '')} />
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
