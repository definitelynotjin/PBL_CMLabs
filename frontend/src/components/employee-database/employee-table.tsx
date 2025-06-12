import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Edit2, Trash2, Copy } from 'lucide-react';
import { Employee } from './types';
import Link from 'next/link';


interface EmployeeTableProps {
    employees: Employee[];
    loading: boolean;
    onRowClick: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, loading, onRowClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-md">
                <thead>
                    <tr className="bg-muted text-left">
                        {['No', 'ID', 'Avatar', 'Nama', 'Jenis Kelamin', 'Nomor Telepon', 'Cabang', 'Jabatan', 'Grade', 'Status', 'Type', 'Action'].map((col) => (
                            <th key={col} className="p-2">
                                <div className="flex items-center gap-1">
                                    {col}
                                    <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={12} className="text-center p-4">Loading...</td>
                        </tr>
                    ) : (
                        employees.map((emp, index) => (
                            <tr key={emp.id} className="border-t hover:bg-gray-50">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{emp.user?.employee_id || '-'}</td>
                                <td className="p-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => onRowClick(emp)}
                                        className="text-blue-600 underline cursor-pointer bg-transparent border-none p-0"
                                    >
                                        {emp.first_name} {emp.last_name}
                                    </button>
                                </td>
                                <td className="p-2">
                                    <span className="bg-muted px-2 py-1 rounded text-xs font-medium">{emp.gender}</span>
                                </td>
                                <td className="p-2">{emp.phone}</td>
                                <td className="p-2">{emp.branch || '-'}</td>
                                <td className="p-2">{emp.position}</td>
                                <td className="p-2">{emp.grade || '-'}</td>
                                <td className="p-2">
                                    <span className="text-xs text-muted-foreground">{emp.status ? 'Active' : 'Inactive'}</span>
                                </td>
                                <td className="p-2">{emp.type}</td>
                                <td className="p-2 flex gap-2">
                                    <Link href={`/employees/${emp.id}/edit`}>
                                        <Button variant="ghost" size="sm" title="Edit"><Edit2 /></Button>
                                    </Link>
                                    <Link href={`/employees/${emp.id}/delete`}>
                                        <Button variant="ghost" size="sm" title="Delete"><Trash2 /></Button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
