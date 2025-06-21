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

const branchOptions = [
  { id: 'c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae', name: 'Surabaya Office' },
  { id: 'a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92', name: 'Jakarta Office' },
  { id: '58b66a88-1e4f-46c1-8e90-b47194983a9a', name: 'Malang Office' },
];

const positionOptions = ['CEO', 'Manager', 'Supervisor', 'Staff', 'Intern'];
const gradeOptions = ['Upper Staff', 'Staff', 'Junior Staff'];

const EmployeeForm: React.FC<EmployeeFormProps> = ({ date: propDate, setDate: propSetDate }) => {
  const [date, setDate] = useState<Date | undefined>(propDate);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nik, setNik] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [position, setPosition] = useState('');
  const [branch, setBranch] = useState('');
  const [contractType, setContractType] = useState('permanent');
  const [grade, setGrade] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [spType, setSpType] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
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
    // TODO: Connect API here
  };

  const onDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (propSetDate) propSetDate(selectedDate);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6">
      {/* Avatar Upload */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
          {avatar ? (
            <Image src={avatar} alt="Avatar" width={96} height={96} className="object-cover rounded" />
          ) : (
            <Image src="/placeholder-avatar.png" alt="Avatar Placeholder" width={96} height={96} className="object-cover rounded" />
          )}
        </div>
        <Button variant="outline" onClick={() => setAvatar('/uploaded-avatar.png')}>
          Upload Avatar
        </Button>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="First Name" placeholder="Enter first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <Field label="Last Name" placeholder="Enter last name" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>

        {/* Email */}
        <Field label="Email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />

        {/* Mobile & NIK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Mobile Number" placeholder="Enter mobile number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
          <Field label="NIK" placeholder="Enter national ID (NIK)" value={nik} onChange={e => setNik(e.target.value)} />
        </div>

        {/* Gender & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Gender</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Gender-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Last Education</label>
            <Select value={education} onValueChange={setEducation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Education-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sma">High School</SelectItem>
                <SelectItem value="d3">Diploma (D3)</SelectItem>
                <SelectItem value="s1">Bachelor's Degree (S1)</SelectItem>
                <SelectItem value="s2">Master's Degree (S2)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Birth Place & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Birth Place" placeholder="Enter birth place" value={birthPlace} onChange={e => setBirthPlace(e.target.value)} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Birth Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {date ? format(date, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Position & Branch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Position</label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Position-" />
              </SelectTrigger>
              <SelectContent>
                {positionOptions.map(pos => (
                  <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Branch</label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Branch-" />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map(branch => (
                  <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contract & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Contract Type</label>
            <RadioGroup value={contractType} onValueChange={setContractType} className="flex gap-4">
              {[
                { value: 'permanent', label: 'Permanent' },
                { value: 'contract', label: 'Contract' },
                { value: 'freelance', label: 'Freelance' },
              ].map(({ value, label }) => (
                <div className="flex items-center space-x-2" key={value}>
                  <RadioGroupItem value={value} id={value} />
                  <label htmlFor={value}>{label}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Grade</label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Grade-" />
              </SelectTrigger>
              <SelectContent>
                {gradeOptions.map(gr => (
                  <SelectItem key={gr} value={gr}>{gr}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bank & Account Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Bank</label>
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select Bank-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bca">BCA</SelectItem>
                <SelectItem value="bri">BRI</SelectItem>
                <SelectItem value="bni">BNI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="Account Number" placeholder="Enter account number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
        </div>

        {/* Account Holder Name & SP Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Account Holder Name" placeholder="Enter account holder name" value={accountHolderName} onChange={e => setAccountHolderName(e.target.value)} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">SP Type</label>
            <Select value={spType} onValueChange={setSpType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select SP Type-" />
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
            setContractType('permanent');
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
