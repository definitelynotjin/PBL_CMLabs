'use client';

import {
    Dialog,
    DialogContentCentered
} from '@/components/ui/dialog';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { Employee } from './types';

export default function EmployeeProfileDialog({
    open,
    onClose,
    employee,
}: {
    open: boolean;
    onClose: () => void;
    employee: Employee;
}) {
    const getBranchLabel = (value: string) => {
        const branchOptions = [
            { label: 'Surabaya Office', value: 'c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae' },
            { label: 'Jakarta Office', value: 'a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92' },
            { label: 'Malang Office', value: '58b66a88-1e4f-46c1-8e90-b47194983a9a' },
        ];
        return branchOptions.find((opt) => opt.value === value)?.label || '-';
    };

    const InfoRow = ({ label, value }: { label: string; value?: string | null }) => (
        <div className="grid grid-cols-3 gap-4 py-1 text-sm">
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="col-span-2">{value || '-'}</span>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
            <DialogContentCentered>

                {/* Header */}
                <div className="flex items-center justify-between border-b pb-6 mb-6">
                    <div className="flex items-center gap-6">
                        <Image
                            src={
                                employee.avatar?.startsWith('http')
                                    ? employee.avatar
                                    : employee.avatar
                                        ? `https://pblcmlabs.duckdns.org/storage/${employee.avatar}`
                                        : '/default-avatar.png'
                            }
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="rounded-full object-cover border"
                        />

                        <div>
                            <h1 className="text-2xl font-semibold text-[#1E3A5F]">
                                {employee.first_name} {employee.last_name}
                            </h1>
                            <p className="text-[#7CA5BF]">{employee.position} &mdash; {employee.department}</p>
                        </div>
                    </div>
                </div>

                {/* Personal Info */}
                <section className="mb-6">
                    <h2 className="text-base font-semibold text-[#1E3A5F] border-b pb-2 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <InfoRow label="Email" value={employee.email} />
                        <InfoRow label="Phone" value={employee.phone} />
                        <InfoRow label="Birthplace" value={employee.tempat_lahir} />
                        <InfoRow label="Date of Birth" value={employee.birth_date ? format(parseISO(employee.birth_date), 'dd MMM yyyy') : ''} />
                        <InfoRow label="Gender" value={employee.gender === 'M' ? 'Male' : employee.gender === 'F' ? 'Female' : '-'} />
                        <InfoRow label="Address" value={employee.address} />
                        <InfoRow label="Last Education" value={employee.pendidikan_terakhir} />
                    </div>
                </section>

                {/* Employment Info */}
                <section>
                    <h2 className="text-base font-semibold text-[#1E3A5F] border-b pb-2 mb-4">Employment Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <InfoRow label="Branch" value={getBranchLabel(employee.ck_settings_id ?? '')} />
                        <InfoRow label="NIK" value={employee.nik} />
                        <InfoRow label="Contract Type" value={employee.contract_type} />
                        <InfoRow label="Grade" value={employee.grade} />
                        <InfoRow label="Bank" value={employee.bank} />
                        <InfoRow label="Account Number" value={employee.nomor_rekening} />
                        <InfoRow label="Account Holder" value={employee.atas_nama_rekening} />
                        <InfoRow label="Tipe SP" value={employee.tipe_sp} />
                    </div>
                </section>
            </DialogContentCentered>
        </Dialog>
    );
}
