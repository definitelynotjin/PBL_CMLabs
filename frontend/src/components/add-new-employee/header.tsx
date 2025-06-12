import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Field from './field';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface EmployeeFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ date, setDate }) => {
  // State for each form field
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
  const [accountName, setAccountName] = useState('');
  const [spType, setSpType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handler for saving form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation (expand as needed)
    if (!firstName || !lastName || !mobileNumber) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Prepare payload to match your API expected data shape
    const payload = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      nik: nik,
      gender: gender,
      education: education,
      birth_place: birthPlace,
      birth_date: date ? format(date, 'yyyy-MM-dd') : null,
      position: position,
      branch: branch,
      contract_type: contractType,
      grade: grade,
      bank: bank,
      account_number: accountNumber,
      account_name: accountName,
      sp_type: spType,
    };

    try {
      const res = await fetch('/api/employees', {  // adjust this URL if your API endpoint differs
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save employee');
      }

      setSuccess(true);
      // Optionally reset the form
      setFirstName('');
      setLastName('');
      setMobileNumber('');
      setNik('');
      setGender('');
      setEducation('');
      setBirthPlace('');
      setPosition('');
      setBranch('');
      setContractType('Tetap');
      setGrade('');
      setBank('');
      setAccountNumber('');
      setAccountName('');
      setSpType('');
      setDate(undefined);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Add New Employee</h2>

      {/* Avatar Upload Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded">
          <Image src="/placeholder-avatar.png" alt="Avatar Placeholder" width={96} height={96} className="object-cover rounded" />
        </div>
        <Button variant="outline">Upload Avatar</Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="First Name" placeholder="Enter the first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Field label="Last Name" placeholder="Enter the last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Mobile Number" placeholder="Enter the Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
          <Field label="NIK" placeholder="Enter the NIK" value={nik} onChange={(e) => setNik(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Gender</label>
            <Select onValueChange={setGender} value={gender}>
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
            <Select onValueChange={setEducation} value={education}>
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
          <Field label="Tempat Lahir" placeholder="Masukan Tempat Lahir" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Jabatan" placeholder="Enter your jabatan" value={position} onChange={(e) => setPosition(e.target.value)} />
          <Field label="Cabang" placeholder="Enter the cabang" value={branch} onChange={(e) => setBranch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe Kontrak</label>
            <RadioGroup value={contractType} onValueChange={setContractType} className="flex gap-4">
              {['Tetap', 'Kontrak', 'Lepas'].map((type) => (
                <div className="flex items-center space-x-2" key={type}>
                  <RadioGroupItem value={type} id={type.toLowerCase()} />
                  <label htmlFor={type.toLowerCase()}>{type}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Field label="Grade" placeholder="Masukan Grade Anda" value={grade} onChange={(e) => setGrade(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Bank</label>
            <Select onValueChange={setBank} value={bank}>
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
          <Field label="Nomor Rekening" placeholder="Masukan Nomor Rekening" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Atas Nama Rekening" placeholder="Masukan A/N Rekening" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">Tipe SP</label>
            <Select onValueChange={setSpType} value={spType}>
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

      {/* Show error or success messages */}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">Employee saved successfully!</p>}

      {/* Footer Buttons */}
      <div className="flex justify-end mt-6 gap-2">
        <Button variant="outline" type="button" onClick={() => {
          // reset form on cancel
          setFirstName('');
          setLastName('');
          setMobileNumber('');
          setNik('');
          setGender('');
          setEducation('');
          setBirthPlace('');
          setPosition('');
          setBranch('');
          setContractType('Tetap');
          setGrade('');
          setBank('');
          setAccountNumber('');
          setAccountName('');
          setSpType('');
          setDate(undefined);
          setError(null);
          setSuccess(false);
        }}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
