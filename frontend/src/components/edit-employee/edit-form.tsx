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

export interface Employee {
  id: string;
  ck_settings_id?: string;
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
  contract_type: 'unset';
  grade: string;
  bank: string;
  nomor_rekening: string;
  atas_nama_rekening: string;
  tipe_sp: 'SP 1' | 'SP 2' | 'SP 3' | 'unset' | '';
  address: string;
  email?: string;
}

interface EmployeeFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  data?: Employee;
  onSuccess: (newEmployeeId: string) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const departmentOptions = [
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Product', value: 'Product' },
  { label: 'HR', value: 'HR' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Finance', value: 'Finance' },
];

// Position options grouped by department
const positionsByDepartment: Record<string, { label: string; value: string }[]> = {
  Engineering: [
    { label: 'Frontend Developer', value: 'Frontend Developer' },
    { label: 'Backend Developer', value: 'Backend Developer' },
    { label: 'Fullstack Developer', value: 'Fullstack Developer' },
    { label: 'QA Engineer', value: 'QA Engineer' },
    { label: 'DevOps Engineer', value: 'DevOps Engineer' },
  ],
  Product: [
    { label: 'Product Owner', value: 'Product Owner' },
    { label: 'Project Manager', value: 'Project Manager' },
    { label: 'UI/UX Designer', value: 'UI/UX Designer' },
    { label: 'Data Analyst', value: 'Data Analyst' },
  ],
  HR: [
    { label: 'HR Manager', value: 'HR Manager' },
    { label: 'Recruiter', value: 'Recruiter' },
  ],
  Marketing: [
    { label: 'Marketing Specialist', value: 'Marketing Specialist' },
    { label: 'Content Writer', value: 'Content Writer' },
  ],
  Sales: [
    { label: 'Sales Representative', value: 'Sales Representative' },
    { label: 'Account Manager', value: 'Account Manager' },
    { label: 'Customer Support', value: 'Customer Support' },
  ],
  Finance: [
    { label: 'Accountant', value: 'Accountant' },
    { label: 'Financial Analyst', value: 'Financial Analyst' },
  ],
};

// Grade options grouped by department
const gradesByDepartment: Record<string, { label: string; value: string }[]> = {
  Engineering: [
    { label: 'Intern', value: 'Intern' },
    { label: 'Junior', value: 'Junior' },
    { label: 'Middle', value: 'Middle' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Lead', value: 'Lead' },
    { label: 'Manager', value: 'Manager' },
  ],
  Product: [
    { label: 'Junior', value: 'Junior' },
    { label: 'Middle', value: 'Middle' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Manager', value: 'Manager' },
  ],
  HR: [
    { label: 'Junior', value: 'Junior' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Manager', value: 'Manager' },
  ],
  Marketing: [
    { label: 'Junior', value: 'Junior' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Manager', value: 'Manager' },
  ],
  Sales: [
    { label: 'Junior', value: 'Junior' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Manager', value: 'Manager' },
  ],
  Finance: [
    { label: 'Junior', value: 'Junior' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Manager', value: 'Manager' },
  ],
};

const branchOptions = [
  { label: 'Surabaya Office', value: 'c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae' },
  { label: 'Jakarta Office', value: 'a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92' },
  { label: 'Malang Office', value: '58b66a88-1e4f-46c1-8e90-b47194983a9a' },
];

const EmployeeForm: React.FC<EmployeeFormProps> = ({ date, setDate, data, onSuccess }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    ck_settings_id: data?.ck_settings_id || '',
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    phone: data?.phone || '',
    nik: data?.nik || '',
    gender: data?.gender || '',
    pendidikan_terakhir: data?.pendidikan_terakhir || '',
    tempat_lahir: data?.tempat_lahir || '',
    birth_date: data?.birth_date || '',
    position: data?.position || '',
    department: data?.department || '',
    contract_type: data?.contract_type || 'unset',
    grade: data?.grade || '',
    bank: data?.bank || '',
    nomor_rekening: data?.nomor_rekening || '',
    atas_nama_rekening: data?.atas_nama_rekening || '',
    tipe_sp: data?.tipe_sp || 'unset',
    address: data?.address || '',
    email: data?.email || '',
  });

  const [clientDate, setClientDate] = useState('');

  useEffect(() => {
    if (date) {
      setClientDate(format(date, 'dd/MM/yyyy'));
      setForm(f => ({ ...f, birth_date: format(date, 'yyyy-MM-dd') }));
    } else {
      setClientDate('');
    }
  }, [date]);

  // When department changes, reset position and grade
  const handleDepartmentChange = (value: string) => {
    setForm({
      ...form,
      department: value,
      position: '',
      grade: '',
    });
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof typeof form) => (value: string) => {
    if (field === 'department') {
      handleDepartmentChange(value);
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleRadioChange = (field: keyof typeof form) => (value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!data?.id) return alert('Missing employee ID.');

      const token = localStorage.getItem('token');
      if (!token) return alert('Authentication token not found.');

      // Prepare payload with cleaned fields for backend
      const payload = {
        ...form,
        tipe_sp: form.tipe_sp === 'unset' || form.tipe_sp === '' ? null : form.tipe_sp,
        contract_type: form.contract_type === 'unset' ? null : form.contract_type,
      };

      const res = await fetch(`${API_BASE_URL}/employees/upsert/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return alert('Failed: ' + (errorData.message || res.statusText));
      }

      const response = await res.json();
      alert('Employee updated successfully!');
      onSuccess(response.id);
      router.push('/employee-database');
    } catch (error) {
      alert('Error: ' + error);
      console.error(error);
    }
  };


  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Edit Employee</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
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

      {/* PERSONAL INFORMATION */}
      <section className="mb-8">
        <h3 className="text-md font-semibold mb-4 border-b pb-2">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="Email" placeholder="Email" value={form.email || ''} onChange={handleChange('email')} />
          <Field label="Phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange('phone')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="First Name" placeholder="Enter first name" value={form.first_name} onChange={handleChange('first_name')} />
          <Field label="Last Name" placeholder="Enter last name" value={form.last_name} onChange={handleChange('last_name')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="Birthplace" placeholder="Enter birthplace" value={form.tempat_lahir} onChange={handleChange('tempat_lahir')} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Date of Birth</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {clientDate || 'Select date'}
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

        <Field label="Address" placeholder="Enter address" value={form.address} onChange={handleChange('address')} />
      </section>

      {/* EMPLOYMENT INFORMATION */}
      <section>
        <h3 className="text-md font-semibold mb-4 border-b pb-2">Employment Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Branch</label>
            <Select value={form.ck_settings_id} onValueChange={handleSelectChange('ck_settings_id')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Branch-" />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Department</label>
            <Select value={form.department} onValueChange={handleSelectChange('department')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Department-" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Position</label>
            <Select
              value={form.position}
              onValueChange={handleSelectChange('position')}
              disabled={!form.department}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={form.department ? "-Select Position-" : "Select department first"} />
              </SelectTrigger>
              <SelectContent>
                {(positionsByDepartment[form.department] || []).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Grade</label>
            <Select
              value={form.grade}
              onValueChange={handleSelectChange('grade')}
              disabled={!form.department}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={form.department ? "-Select Grade-" : "Select department first"} />
              </SelectTrigger>
              <SelectContent>
                {(gradesByDepartment[form.department] || []).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1 w-full mt-4">
            <label className="text-sm font-medium">Contract Type</label>
            <RadioGroup value={form.contract_type} onValueChange={handleRadioChange('contract_type')} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unset" id="contract-unset" />
                <label htmlFor="contract-unset">Unset</label>
              </div>
              {[
                { label: 'Permanent', value: 'Tetap' },
                { label: 'Contract', value: 'Kontrak' },
                { label: 'Freelance', value: 'Lepas' },
              ].map(({ label, value }) => (
                <div className="flex items-center space-x-2" key={value}>
                  <RadioGroupItem value={value} id={value} />
                  <label htmlFor={value}>{label}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-1 w-full mt-4">
            <label className="text-sm font-medium">Bank</label>
            <Select value={form.bank} onValueChange={handleSelectChange('bank')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Bank-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="BRI">BRI</SelectItem>
                <SelectItem value="BNI">BNI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="Account Number" placeholder="Enter account number" value={form.nomor_rekening} onChange={handleChange('nomor_rekening')} />
          <Field label="Account Holder Name" placeholder="Enter account holder name" value={form.atas_nama_rekening} onChange={handleChange('atas_nama_rekening')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">SP Type</label>
            <Select value={form.tipe_sp} onValueChange={handleSelectChange('tipe_sp')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select SP Type-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unset">None</SelectItem>
                <SelectItem value="SP 1">SP-1</SelectItem>
                <SelectItem value="SP 2">SP-2</SelectItem>
                <SelectItem value="SP 3">SP-3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="NIK" placeholder="Enter national ID" value={form.nik} onChange={handleChange('nik')} />
        </div>

        <div className="space-y-1 w-full mb-4">
          <label className="text-sm font-medium">Gender</label>
          <Select value={form.gender} onValueChange={handleSelectChange('gender')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-Select Gender-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Male</SelectItem>
              <SelectItem value="F">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1 w-full mt-4">
          <label className="text-sm font-medium">Highest Education</label>
          <Select value={form.pendidikan_terakhir} onValueChange={handleSelectChange('pendidikan_terakhir')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-Select Education-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SMA">High School</SelectItem>
              <SelectItem value="D3">Diploma (D3)</SelectItem>
              <SelectItem value="S1">Bachelor (S1)</SelectItem>
              <SelectItem value="S2">Master (S2)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => router.push('/employee-database')}>Cancel</Button>
        <Button type="button" onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
};

export default EmployeeForm;
