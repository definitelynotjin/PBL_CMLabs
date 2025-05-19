'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Calendar as CalendarIcon,
  User,
  Users,
  Clock,
  MessageCircle,
  Headphones,
  Settings,
  Bell
} from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { format } from 'date-fns'

const Field = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <div className="space-y-1 w-full">
    <label className="text-sm font-medium">{label}</label>
    <Input placeholder={placeholder} className="w-full" />
  </div>
)

export default function AddNewEmployeePage() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center bg-gray-100 py-4">
        <div className="flex flex-col items-center gap-6">
          <Image src="/HRIS.png" alt="Logo" width={32} height={32} />
          <User className="w-5 h-5 text-gray-600" />
          <Users className="w-5 h-5 text-gray-600" />
          <Clock className="w-5 h-5 text-gray-600" />
          <CalendarIcon className="w-5 h-5 text-gray-600" />
          <MessageCircle className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <Headphones className="w-5 h-5 text-gray-600" />
          <Settings className="w-5 h-5 text-gray-600" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Employee Database</h1>
            <Input placeholder="Search" className="w-72" />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div className="text-sm text-right leading-tight">
                <p className="font-medium">username</p>
                <p className="text-gray-500 text-xs">roles user</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Add New Employee</h2>

          {/* Avatar Upload Section */}
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

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="First Name" placeholder="Enter the first name" />
              <Field label="Last Name" placeholder="Enter the last name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Mobile Number" placeholder="Enter the Mobile Number" />
              <Field label="NIK" placeholder="Enter the NIK" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium">Gender</label>
                <Select>
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
                <Select>
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
              <Field label="Tempat Lahir" placeholder="Masukan Tempat Lahir" />
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
              <Field label="Jabatan" placeholder="Enter your jabatan" />
              <Field label="Cabang" placeholder="Enter the cabang" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium">Tipe Kontrak</label>
                <RadioGroup defaultValue="Tetap" className="flex gap-4">
                  {['Tetap', 'Kontrak', 'Lepas'].map((type) => (
                    <div className="flex items-center space-x-2" key={type}>
                      <RadioGroupItem value={type} id={type.toLowerCase()} />
                      <label htmlFor={type.toLowerCase()}>{type}</label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <Field label="Grade" placeholder="Masukan Grade Anda" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium">Bank</label>
                <Select>
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
              <Field label="Nomor Rekening" placeholder="Masukan Nomor Rekening" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Atas Nama Rekening" placeholder="Masukan A/N Rekening" />
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium">Tipe SP</label>
                <Select>
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
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
