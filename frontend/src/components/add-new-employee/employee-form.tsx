'use client';


import React, { useState } from 'react';
import Image from 'next/image';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface EmployeeFormProps {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ date: propDate, setDate: propSetDate }) => {
  // Manage date locally if props not passed
  const [date, setDate] = useState<Date | undefined>(propDate);

  // Form state for all inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nik, setNik] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [position, setPosition] = useState('');
  const [branch, setBranch] = useState('');
  const [contractType, setContractType] = useState('Tetap');
  const [grade, setGrade] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [spType, setSpType] = useState('');

  // Avatar upload placeholder (just a string for filename/url)
  const [avatar, setAvatar] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Gather all form data here
    const formData = {
      firstName,
      lastName,
      mobileNumber,
      nik,
      gender,
      education,
      birthPlace,
      birthDate: date,
      position,
      branch,
      contractType,
      grade,
      bank,
      accountNumber,
      accountHolderName,
      spType,
      avatar,
    };

    console.log('Submitting employee data:', formData);

    // TODO: Connect to API or parent callback to save the data

    // Optionally clear form after submit:
    // setFirstName(''); // and others...
  };

  // For date, if props passed, update both local and prop
  const onDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (propSetDate) propSetDate(selectedDate);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6">
      {/* Avatar Upload Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
          {avatar ? (
            <Image src={avatar} alt="Avatar" width={96} height={96} className="object-cover rounded" />
          ) : (
            <Image src="/placeholder-avatar.png" alt="Avatar Placeholder" width={96} height={96} className="object-cover rounded" />
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => {
            // For demo, just simulate upload by setting a placeholder string
            setAvatar('/uploaded-avatar.png');
          }}
        >
          Upload Avatar
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="First Name"
            placeholder="Enter the first name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Field
            label="Last Name"
            placeholder="Enter the last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Mobile Number"
            placeholder="Enter the Mobile Number"
            value={mobileNumber}
            onChange={e => setMobileNumber(e.target.value)}
          />
          <Field
            label="NIK"
            placeholder="Enter the NIK"
            value={nik}
            onChange={e => setNik(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Gender</label>
            <Select value={gender} onValueChange={setGender}>
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
            <Select value={education} onValueChange={setEducation}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Tempat Lahir"
            placeholder="Masukan Tempat Lahir"
            value={birthPlace}
            onChange={e => setBirthPlace(e.target.value)}
          />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tanggal Lahir</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {date ? format(date, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Jabatan"
            placeholder="Enter your jabatan"
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
          <Field
            label="Cabang"
            placeholder="Enter the cabang"
            value={branch}
            onChange={e => setBranch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe Kontrak</label>
            <RadioGroup
              value={contractType}
              onValueChange={setContractType}
              className="flex gap-4"
            >
              {['Tetap', 'Kontrak', 'Lepas'].map(type => (
                <div className="flex items-center space-x-2" key={type}>
                  <RadioGroupItem value={type} id={type.toLowerCase()} />
                  <label htmlFor={type.toLowerCase()}>{type}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Field
            label="Grade"
            placeholder="Masukan Grade Anda"
            value={grade}
            onChange={e => setGrade(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Bank</label>
            <Select value={bank} onValueChange={setBank}>
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
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Atas Nama Rekening"
            placeholder="Masukan A/N Rekening"
            value={accountHolderName}
            onChange={e => setAccountHolderName(e.target.value)}
          />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe SP</label>
            <Select value={spType} onValueChange={setSpType}>
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

      {/* Footer Buttons */}
      <div className="flex justify-end mt-6 gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            // Reset form if needed
            setFirstName('');
            setLastName('');
            setMobileNumber('');
            setNik('');
            setGender('');
            setEducation('');
            setBirthPlace('');
            setDate(undefined);
            setPosition('');
            setBranch('');
            setContractType('Tetap');
            setGrade('');
            setBank('');
            setAccountNumber('');
            setAccountHolderName('');
            setSpType('');
            setAvatar(null);
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
