'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

import {
  Filter,
  Download,
  Upload,
  Edit2,
  Trash2,
  Copy,
  Grid,
  Bell,
  Users,
  Clock,
  Calendar,
  MessageCircle,
  Headphones,
  Settings,
  ChevronsUpDown,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Employee = {
  id: number
  first_name: string
  last_name: string
  gender: string
  phone: string
  branch?: string
  position: string
  grade?: string
  status: boolean
}


export default function EmployeeDatabasePage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [periode, setPeriode] = useState('')

  useEffect(() => {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/employees?search=${encodeURIComponent(search)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Gagal mengambil data')
          return res.json()
        })
        .then((data) => setEmployees(data.data.data))
        .catch((err) => console.error('Fetch error:', err))
        .finally(() => setLoading(false))
  }, [search])

  useEffect(() => {
    const today = new Date()
    const formatted = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    setPeriode(formatted)
  }, [])

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center bg-gray-100 py-4">
        <div className="flex flex-col items-center gap-6">
          <Image src="/HRIS.png" alt="Logo" width={32} height={32} />
          <Link href="/dashboard">
            <Grid className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/employee-database">
            <Users className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/checkclock">
            <Clock className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/pricing-package">
            <Calendar className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/order-summary">
            <MessageCircle className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <Link href="/headphones">
            <Headphones className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/settings">
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 space-y-6">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Employee Database</h1>
            <Input
              placeholder="Search"
              className="w-72"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Periode</p>
            <p className="text-lg font-semibold">{periode}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Employee</p>
            <p className="text-lg font-semibold">208</p>
          </div>
          <div className="border rounded-lg p-4 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total New Hire</p>
              <p className="text-lg font-semibold">20</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Full Time Employee</p>
              <p className="text-lg font-semibold">20</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Employees Information</h2>
          <div className="flex gap-2">
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
            <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
            <Button variant="outline"><Upload className="w-4 h-4 mr-2" /> Import</Button>
            <Link href="/add-new-employee" passHref>
              <Button>+ Tambah Data</Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-md">
            <thead>
              <tr className="bg-muted text-left">
                {['No', 'Avatar', 'Nama', 'Jenis Kelamin', 'Nomor Telepon', 'Cabang', 'Jabatan', 'Grade', 'Status', 'Action'].map((col) => (
                  <th key={col} className="p-2">
                    <div className="flex items-center gap-1">
                      {col} <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center p-4">Loading...</td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <tr key={emp.id} className="border-t">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    </td>
                    <td className="p-2">{emp.first_name} {emp.last_name}</td>
                    <td className="p-2">
                      <span className="bg-muted px-2 py-1 rounded text-xs font-medium">
                        {emp.gender}
                      </span>
                    </td>
                    <td className="p-2">{emp.phone}</td>
                    <td className="p-2">{emp.branch || '-'}</td>
                    <td className="p-2">{emp.position}</td>
                    <td className="p-2">{emp.grade || '-'}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Switch checked={emp.status} disabled />
                        <span className="text-xs text-muted-foreground">
                          {emp.status ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 flex gap-2">
                      <Button size="icon" variant="ghost"><Copy className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost"><Edit2 className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))
              )}
              {!loading && employees.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center p-4">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
