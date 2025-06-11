import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Field from './field';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Employee {
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
}


const EmployeeForm: React.FC<EmployeeFormProps> = ({ date, setDate, data }) => {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Edit Employee</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded">
          <Image src="/placeholder-avatar.png" alt="Avatar Placeholder" width={96} height={96} className="object-cover rounded" />
        </div>
        <Button variant="outline">Upload Avatar</Button>
      </div>

      <div className="space-y-4">
        {/* Nama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="First Name" placeholder="Enter the first name" defaultValue={data?.firstName} />
          <Field label="Last Name" placeholder="Enter the last name" defaultValue={data?.lastName} />
        </div>

        {/* Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Mobile Number" placeholder="Enter the Mobile Number" defaultValue={data?.mobileNumber} />
          <Field label="NIK" placeholder="Enter the NIK" defaultValue={data?.nik} />
        </div>

        {/* Gender dan Pendidikan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Gender</label>
            <Select defaultValue={data?.gender}>
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
            <Select defaultValue={data?.education}>
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
          <Field label="Tempat Lahir" placeholder="Masukan Tempat Lahir" defaultValue={data?.tanggalLahir} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tanggal Lahir</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {date ? format(date, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Jabatan & Cabang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Jabatan" placeholder="Enter your jabatan" defaultValue={data?.jabatan} />
          <Field label="Cabang" placeholder="Enter the cabang" defaultValue={data?.cabang} />
        </div>

        {/* Kontrak & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe Kontrak</label>
            <RadioGroup defaultValue={data?.tipeKontrak} className="flex gap-4">
              {['Tetap', 'Kontrak', 'Lepas'].map((type) => (
                <div className="flex items-center space-x-2" key={type}>
                  <RadioGroupItem value={type} id={type.toLowerCase()} />
                  <label htmlFor={type.toLowerCase()}>{type}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Field label="Grade" placeholder="Masukan Grade Anda" defaultValue={data?.grade} />
        </div>

        {/* Bank & Rekening */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Bank</label>
            <Select defaultValue={data?.bank}>
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
          <Field label="Nomor Rekening" placeholder="Masukan Nomor Rekening" defaultValue={data?.nomorRekening} />
        </div>

        {/* A/N Rekening & Tipe SP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Atas Nama Rekening" placeholder="Masukan A/N Rekening" defaultValue={data?.atasNama} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe SP</label>
            <Select defaultValue={data?.tipeSp}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Pilih SP-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sp1">SP 1</SelectItem>
                <SelectItem value="sp2">SP 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tombol */}
      <div className="flex justify-end mt-6 gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Update</Button>
      </div>
    </div>
  );
};

export default EmployeeForm;
