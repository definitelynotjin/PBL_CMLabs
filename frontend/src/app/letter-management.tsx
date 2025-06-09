'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/employee-database/header';
import Stats from '@/components/employee-database/stats';
import Actions from '@/components/employee-database/actions';
import EmployeeTable from '@/components/employee-database/employee-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type User = {
  id: string;
  employee_id: string;
};

type Employee = {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  branch?: string;
  position: string;
  grade?: string;
  status: boolean;
  employment_status?: string;
  type?: string;
  user?: User;
};

export default function LetterManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [periode, setPeriode] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');

  useEffect(() => {
    setLoading(true);
    const employeesUrl = `https://pblcmlabs.duckdns.org/api/employees?search=${encodeURIComponent(search)}&include_all=true`;
    const candidatesUrl = `https://pblcmlabs.duckdns.org/api/employees/candidates?search=${encodeURIComponent(search)}`;

    Promise.all([
      fetch(employeesUrl).then(res => res.json()),
      fetch(candidatesUrl).then(res => res.json()),
    ])
      .then(([employeesData, candidatesData]) => {
        const mappedEmployees = employeesData.data.data.map((emp: Employee) => ({
          ...emp,
          status: emp.employment_status === 'Active',
          type: 'Employee',
        }));

        const mappedCandidates = candidatesData.data.map((candidate: any) => ({
          id: candidate.id || candidate.user_id,
          user_id: candidate.id || candidate.user_id,
          first_name: candidate.name?.split(' ')[0] || candidate.name || '-',
          last_name: candidate.name?.split(' ').slice(1).join(' ') || '',
          gender: '-',
          phone: candidate.phone || '-',
          branch: '-',
          position: '-',
          grade: '-',
          status: false,
          employment_status: 'Candidate',
          type: 'Candidate',
          user: {
            id: candidate.id || candidate.user_id,
            employee_id: candidate.employee_id || '-',
          },
        }));

        setEmployees([...mappedEmployees, ...mappedCandidates]);
      })
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    setPeriode(formatted);
  }, []);

  const handleUpload = async () => {
    if (!selectedEmployee || !documentFile || !documentType) return;

    const formData = new FormData();
    formData.append('employee_id', selectedEmployee.user_id);
    formData.append('document_type', documentType);
    formData.append('file', documentFile);

    const res = await fetch('https://your-api-endpoint/upload-document', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Document uploaded successfully');
      setShowUpload(false);
      setDocumentFile(null);
      setDocumentType('');
    } else {
      alert('Upload failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Header search={search} setSearch={setSearch} />
        <Stats employees={employees} periode={periode} />
        <Actions />
        <div>
          <EmployeeTable
            employees={employees}
            loading={loading}
            onNameClick={(emp: Employee) => setSelectedEmployee(emp)}
          />
        </div>

        {selectedEmployee && (
          <Dialog open={true} onOpenChange={() => setSelectedEmployee(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detail Karyawan</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <p><strong>Nama:</strong> {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
                <p><strong>Jenis Kelamin:</strong> {selectedEmployee.gender}</p>
                <p><strong>Telepon:</strong> {selectedEmployee.phone}</p>
                <p><strong>Cabang:</strong> {selectedEmployee.branch}</p>
                <p><strong>Jabatan:</strong> {selectedEmployee.position}</p>
                <p><strong>Status:</strong> {selectedEmployee.employment_status}</p>
              </div>
              <Button onClick={() => setShowUpload(true)}>Tambah Dokumen</Button>
            </DialogContent>
          </Dialog>
        )}

        {showUpload && (
          <Dialog open={true} onOpenChange={() => setShowUpload(false)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Dokumen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="doc-type">Tipe Dokumen</Label>
                <Select onValueChange={(value) => setDocumentType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe dokumen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Surat Peringatan">Surat Peringatan</SelectItem>
                    <SelectItem value="Kontrak">Kontrak</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="file">File</Label>
                <Input type="file" onChange={(e) => setDocumentFile(e.target.files?.[0] || null)} />
              </div>
              <DialogFooter>
                <Button onClick={handleUpload}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
