'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import { Employee } from '@/components/edit-employee/edit-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function ViewProfilePage() {
    const [userData, setUserData] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const router = useRouter();

    const getStatusColor = (status: number) => {
        return status === 1 ? 'text-green-600' : 'text-gray-500';
    };

    const branchOptions = [
        { label: 'Surabaya Office', value: 'c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae' },
        { label: 'Jakarta Office', value: 'a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92' },
        { label: 'Malang Office', value: '58b66a88-1e4f-46c1-8e90-b47194983a9a' },
    ];

    const getBranchLabel = (value: string) => {
        if (!value) return '-';
        const option = branchOptions.find((opt) => opt.value === value);
        return option ? option.label : value;
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found in localStorage.');

                const res = await fetch('https://pblcmlabs.duckdns.org/api/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const rawData = await res.json();
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
                        rawData.avatar
                            ? rawData.avatar.startsWith('http')
                                ? rawData.avatar
                                : `https://pblcmlabs.duckdns.org/storage/${rawData.avatar}`
                            : '/default-avatar.png',


                    status: employeeData.status ?? rawData.status ?? 0,
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

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleCancel = () => {
        setAvatarFile(null);
        setPreviewUrl(null);
    };

    const uploadAvatar = async (file: File) => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await fetch("https://pblcmlabs.duckdns.org/api/user/avatar", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload avatar");

            const data = await response.json();

            const avatarUrl = data.avatar?.startsWith("http")
                ? data.avatar
                : `https://pblcmlabs.duckdns.org/storage/${data.avatar}`;

            setUserData((prev) => prev ? { ...prev, avatar_url: avatarUrl } : null);
            toast.success("Avatar updated");
        } catch (error) {
            console.error("Error uploading avatar:", error);
            toast.error("Failed to upload avatar.");
        }
    };


    const handleSave = async () => {
        if (!avatarFile) return;
        await uploadAvatar(avatarFile);
        handleCancel();
    };


    if (loading) return <p className="p-6 text-center">Loading...</p>;
    if (!userData) return <p className="p-6 text-center text-red-500">Failed to load user data.</p>;

    const InfoRow = ({ label, value }: { label: string; value?: string | null }) => (
        <div className="grid grid-cols-3 gap-4 py-2">
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="col-span-2">{value || '-'}</span>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 mb-6">
                <div className="flex items-center gap-6">
                    <Image
                        src={previewUrl || userData.avatar_url || '/default-avatar.png'}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full object-cover border"
                    />
                    <div>
                        <h1 className="text-2xl font-semibold text-[#1E3A5F]">
                            {userData.first_name} {userData.last_name}
                        </h1>
                        <p className="text-[#7CA5BF]">{userData.position} &mdash; {userData.department}</p>
                        <span
                            className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(Number(userData.status))}`}>
                            {Number(userData.status) === 1 ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#1E3A5F]">
                        Upload Avatar
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="block mt-1 text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#1E3A5F] file:text-white hover:file:bg-[#163152]"
                        />
                    </label>
                    {avatarFile && (
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleSave}
                                className="px-4 py-1 rounded bg-[#1E3A5F] text-white text-sm hover:bg-[#163152]"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Personal Info */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E3A5F] border-b pb-2 mb-4">Personal Information</h2>
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
                            userData.gender === 'M' ? 'Male' : userData.gender === 'F' ? 'Female' : '-'
                        }
                    />
                    <InfoRow label="Address" value={userData.address} />
                    <InfoRow label="Last Education" value={userData.pendidikan_terakhir} />
                </div>
            </section>

            {/* Employment Info */}
            <section>
                <h2 className="text-lg font-semibold text-[#1E3A5F] border-b pb-2 mb-4">Employment Information</h2>
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
            <div className="mt-8">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 text-white bg-[#003262] rounded-md text-sm hover:bg-[#00254d] transition"
                >
                    ← Back
                </button>

            </div>

        </div>
    );
}
