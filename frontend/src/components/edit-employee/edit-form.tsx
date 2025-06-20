'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Field from './field';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  nik: string;
  gender: 'M' | 'F' | '';
  pendidikan_terakhir: string;
  tempat_lahir: string;
  birth_date: string;
  position: string;
  department: string;
  contract_type: 'Tetap' | 'Kontrak' | 'Lepas' | 'none';
  grade: string;
  bank: string;
  nomor_rekening: string;
  atas_nama_rekening: string;
  tipe_sp: 'SP 1' | 'SP 2' | 'SP 3' | 'none' | '';
  address: string;
  email?: string; // optional because not part of employee table but comes from user
}

interface CandidateUser {
  id: string;
  name: string;
  email: string;
}

interface EmployeeFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  data?: Employee;
  user?: CandidateUser;
  userId?: string; // Needed when promoting a candidate
  onSuccess: (newEmployeeId: string) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const EmployeeForm: React.FC<EmployeeFormProps> = ({ date, setDate, data, user, userId, onSuccess }) => {
  const router = useRouter();

  // Initialize form with safe defaults, including empty string for union types
  const [form, setForm] = useState({
    first_name: data?.first_name || user?.name?.split(' ')[0] || '',
    last_name: data?.last_name || (user?.name ? user.name.split(' ').slice(1).join(' ') : '') || '',
    phone: data?.phone || '',
    nik: data?.nik || '',
    gender: data?.gender || '',
    pendidikan_terakhir: data?.pendidikan_terakhir || '',
    tempat_lahir: data?.tempat_lahir || '',
    birth_date: data?.birth_date || '',
    position: data?.position || '',
    department: data?.department || '',
    contract_type: data?.contract_type || 'none',
    grade: data?.grade || '',
    bank: data?.bank || '',
    nomor_rekening: data?.nomor_rekening || '',
    atas_nama_rekening: data?.atas_nama_rekening || '',
    tipe_sp: data?.tipe_sp || 'none',
    address: data?.address || '',
  });

  // State to hold client-side formatted date string to avoid hydration issues
  const [clientDate, setClientDate] = useState('');

  useEffect(() => {
    if (date) {
      setClientDate(format(date, 'dd/MM/yyyy'));
      setForm(f => ({ ...f, birth_date: format(date, 'yyyy-MM-dd') }));
    } else {
      setClientDate('');
    }
  }, [date]);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof typeof form) => (value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRadioChange = (field: keyof typeof form) => (value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const id = data?.id || userId;
      if (!id) {
        alert('Missing user or employee ID.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication token not found. Please login.');
        return;
      }

      const url = `${API_BASE_URL}/employees/upsert/${id}`;

      // email is NOT part of form payload; backend handles it via user relation
      const payload = { ...form };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert('Failed: ' + (errorData.message || res.statusText));
        return;
      }

      const response = await res.json();
      alert(data ? 'Employee updated successfully!' : 'Employee created successfully!');
      onSuccess(response.id);
      router.push('/employee-database');
    } catch (error) {
      alert('Error: ' + error);
    }
  };


  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">{data ? 'Edit Employee' : 'Add Employee'}</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded">
          <Image
            src="/placeholder-avatar.png"
            alt="Avatar Placeholder"
            width={96}
            height={96}
            className="object-cover rounded"
          />
        </div>
        <Button variant="outline">Upload Avatar</Button>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="First Name" placeholder="Enter first name" value={form.first_name} onChange={handleChange('first_name')} />
          <Field label="Last Name" placeholder="Enter last name" value={form.last_name} onChange={handleChange('last_name')} />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange('phone')} />
          <Field label="NIK" placeholder="Enter NIK" value={form.nik} onChange={handleChange('nik')} />
        </div>

        {/* Email - read-only */}
        <div className="space-y-1 w-full">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Address */}
        <Field label="Address" placeholder="Enter address" value={form.address} onChange={handleChange('address')} />

        {/* Gender and Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Gender</label>
            <Select value={form.gender} onValueChange={handleSelectChange('gender')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Pilih Gender-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Laki-Laki</SelectItem>
                <SelectItem value="F">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Pendidikan Terakhir</label>
            <Select value={form.pendidikan_terakhir} onValueChange={handleSelectChange('pendidikan_terakhir')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Pilih Pendidikan-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SMA">SMA/SMK</SelectItem>
                <SelectItem value="D3">D3</SelectItem>
                <SelectItem value="S1">S1</SelectItem>
                <SelectItem value="S2">S2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Birth Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Tempat Lahir" placeholder="Enter birthplace" value={form.tempat_lahir} onChange={handleChange('tempat_lahir')} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tanggal Lahir</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {clientDate || 'Pilih tanggal'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    if (selectedDate) {
                      setForm((f) => ({ ...f, birth_date: format(selectedDate, 'yyyy-MM-dd') }));
                      setClientDate(format(selectedDate, 'dd/MM/yyyy'));
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Job Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Jabatan" placeholder="Enter jabatan" value={form.position} onChange={handleChange('position')} />
          <Field label="Cabang" placeholder="Enter department" value={form.department} onChange={handleChange('department')} />
        </div>

        {/* Contract & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe Kontrak</label>
            <RadioGroup value={form.contract_type} onValueChange={handleRadioChange('contract_type')} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="contract-none" />
                <label htmlFor="contract-none">None</label>
              </div>
              {['Tetap', 'Kontrak', 'Lepas'].map((type) => (
                <div className="flex items-center space-x-2" key={type}>
                  <RadioGroupItem value={type} id={type} />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Field label="Grade" placeholder="Enter grade" value={form.grade} onChange={handleChange('grade')} />
        </div>

        {/* Bank & Rekening */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Bank</label>
            <Select value={form.bank} onValueChange={handleSelectChange('bank')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Pilih Bank-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="BRI">BRI</SelectItem>
                <SelectItem value="BNI">BNI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="Nomor Rekening" placeholder="Enter rekening" value={form.nomor_rekening} onChange={handleChange('nomor_rekening')} />
        </div>

        {/* Rekening Name & SP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Atas Nama Rekening" placeholder="Enter A/N" value={form.atas_nama_rekening} onChange={handleChange('atas_nama_rekening')} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe SP</label>
            <Select value={form.tipe_sp} onValueChange={handleSelectChange('tipe_sp')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Pilih SP-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="SP 1">SP-1</SelectItem>
                <SelectItem value="SP 2">SP-2</SelectItem>
                <SelectItem value="SP 3">SP-3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.push('/employee-database')}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
