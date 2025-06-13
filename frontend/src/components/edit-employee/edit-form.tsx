import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Next.js 13+ app router
import { Button } from '@/components/ui/button';
import Field from './field';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nik: string;
  gender: string;
  education: string;
  tempatLahir: string;
  tanggalLahir: string;
  jabatan: string;
  cabang: string;
  tipeKontrak: string;
  grade: string;
  bank: string;
  nomorRekening: string;
  atasNama: string;
  tipeSp: string;
}

interface EmployeeFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  data?: Employee;
  onSuccess: (newEmployeeId: string) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ date, setDate, data, onSuccess }) => {
  const router = useRouter();


  const [form, setForm] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    mobileNumber: data?.mobileNumber || '',
    nik: data?.nik || '',
    gender: data?.gender || '',
    education: data?.education || '',
    tempatLahir: data?.tempatLahir || '',
    tanggalLahir: data?.tanggalLahir || '',
    jabatan: data?.jabatan || '',
    cabang: data?.cabang || '',
    tipeKontrak: data?.tipeKontrak || '',
    grade: data?.grade || '',
    bank: data?.bank || '',
    nomorRekening: data?.nomorRekening || '',
    atasNama: data?.atasNama || '',
    tipeSp: data?.tipeSp || '',
  });


  useEffect(() => {
    if (date) {
      setForm(f => ({ ...f, tanggalLahir: format(date, 'yyyy-MM-dd') }));
    }
  }, [date]);

  // Handlers for controlled inputs
  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof typeof form) => (value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRadioChange = (field: keyof typeof form) => (value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Submit handler
  const handleSubmit = async () => {
    try {
      const isUpdate = !!data?.id;
      const url = isUpdate ? `/api/employees/${data.id}` : `/api/employees`;
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert('Failed: ' + (errorData.message || res.statusText));
        return;
      }

      if (!isUpdate) {
        const createdEmployee = await res.json();
        alert('Employee created successfully!');

        if (onSuccess) {
          onSuccess(createdEmployee.id);
        }
      } else {
        alert('Employee updated successfully!');
        if (onSuccess) onSuccess(data.id);
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };


  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Edit Employee</h2>

      {/* Avatar */}
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
        {/* Nama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="First Name"
            placeholder="Enter the first name"
            value={form.firstName}
            onChange={handleChange('firstName')}
          />
          <Field
            label="Last Name"
            placeholder="Enter the last name"
            value={form.lastName}
            onChange={handleChange('lastName')}
          />
        </div>

        {/* Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Mobile Number"
            placeholder="Enter the Mobile Number"
            value={form.mobileNumber}
            onChange={handleChange('mobileNumber')}
          />
          <Field label="NIK" placeholder="Enter the NIK" value={form.nik} onChange={handleChange('nik')} />
        </div>

        {/* Gender dan Pendidikan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Gender</label>
            <Select value={form.gender} onValueChange={handleSelectChange('gender')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Choose Gender-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Laki-Laki</SelectItem>
                <SelectItem value="female">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Pendidikan Terakhir</label>
            <Select value={form.education} onValueChange={handleSelectChange('education')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Pilih Pendidikan Terakhir-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sma">SMA/SMK</SelectItem>
                <SelectItem value="d3">D3</SelectItem>
                <SelectItem value="s1">S1</SelectItem>
                <SelectItem value="s2">S2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tempat & Tanggal Lahir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Tempat Lahir"
            placeholder="Masukan Tempat Lahir"
            value={form.tempatLahir}
            onChange={handleChange('tempatLahir')}
          />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tanggal Lahir</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {date ? format(date, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    if (selectedDate) {
                      setForm((f) => ({ ...f, tanggalLahir: format(selectedDate, 'yyyy-MM-dd') }));
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Jabatan & Cabang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Jabatan" placeholder="Enter your jabatan" value={form.jabatan} onChange={handleChange('jabatan')} />
          <Field label="Cabang" placeholder="Enter the cabang" value={form.cabang} onChange={handleChange('cabang')} />
        </div>

        {/* Kontrak & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe Kontrak</label>
            <RadioGroup value={form.tipeKontrak} onValueChange={handleRadioChange('tipeKontrak')} className="flex gap-4">
              {['Tetap', 'Kontrak', 'Lepas'].map((type) => (
                <div className="flex items-center space-x-2" key={type}>
                  <RadioGroupItem value={type} id={type.toLowerCase()} />
                  <label htmlFor={type.toLowerCase()}>{type}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Field label="Grade" placeholder="Masukan Grade Anda" value={form.grade} onChange={handleChange('grade')} />
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
                <SelectItem value="bca">BCA</SelectItem>
                <SelectItem value="bri">BRI</SelectItem>
                <SelectItem value="bni">BNI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field
            label="Nomor Rekening"
            placeholder="Masukan Nomor Rekening"
            value={form.nomorRekening}
            onChange={handleChange('nomorRekening')}
          />
        </div>

        {/* A/N Rekening & Tipe SP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Atas Nama Rekening" placeholder="Masukan A/N Rekening" value={form.atasNama} onChange={handleChange('atasNama')} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe SP</label>
            <Select value={form.tipeSp} onValueChange={handleSelectChange('tipeSp')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Pilih SP-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">SP-1</SelectItem>
                <SelectItem value="2">SP-2</SelectItem>
                <SelectItem value="3">SP-3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/employee-database')}
          >
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
