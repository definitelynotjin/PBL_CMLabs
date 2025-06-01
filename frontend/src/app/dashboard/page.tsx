import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, ChevronDown, Edit, Grid, User, Users, Clock, Calendar, FileText, Speaker, Settings, MessageCircle, Headphones } from "lucide-react";;

// TypeScript interfaces for our data structures
interface EmployeeTotals {
  total: number;
  new: number;
  active: number;
  resigned: number;
}

interface ChartDataItem {
  name: string;
  value: number;
}

interface AttendanceChartItem extends ChartDataItem {
  color: string;
}

interface EmployeeAttendanceItem {
  id: number;
  name: string;
  status: string;
  checkIn: string;
}

interface EmployeeDataType {
  totals: EmployeeTotals;
  barChartData: ChartDataItem[];
  status: ChartDataItem[];
  attendanceData: AttendanceChartItem[];
  attendanceList: EmployeeAttendanceItem[];
}

// Mock data for the dashboard
const employeeData: EmployeeDataType = {
  totals: {
    total: 208,
    new: 20,
    active: 15,
    resigned: 10,
  },
  barChartData: [
    { name: "New", value: 20 },
    { name: "Active", value: 15 },
    { name: "Resign", value: 20 },
  ],
  status: [
    { name: "Tetap Permanen", value: 23 },
    { name: "Tetap Percobaan", value: 46 },
    { name: "PKWT (Kontrak)", value: 64 },
    { name: "Magang", value: 75 },
  ],
  attendanceData: [
    { name: "Ontime", value: 142, color: "#374151" },
    { name: "Late", value: 34, color: "#9CA3AF" },
    { name: "Absent", value: 9, color: "#6B7280" },
  ],
  attendanceList: [
    { id: 1, name: "Johan", status: "On time", checkIn: "08.00" },
    { id: 2, name: "Timothy Moore", status: "Izin", checkIn: "09.00" },
    { id: 3, name: "Bob Doe", status: "Late", checkIn: "08.15" },
  ]
};

// Component Props interfaces
interface EmployeeCardProps {
  title: string;
  value: number;
  update: string;
}

interface AttendanceStatusBadgeProps {
  status: string;
}

interface AttendanceTableProps {
  data: EmployeeAttendanceItem[];
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ title, value, update }) => (
  <Card className="bg-white">
    <CardContent className="p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-4xl font-bold mt-2 mb-4">{value}</div>
      <div className="text-xs text-muted-foreground">{update}</div>
    </CardContent>
  </Card>
);

const EmployeeBarChart: React.FC<{ data: ChartDataItem[] }> = ({ data }) => (
  <div className="h-64 w-full pt-4">
    <div className="flex justify-between items-end h-full border-b border-l relative">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className="bg-gray-400 w-4/5"
            style={{
              height: `${(item.value / 30) * 80}%`,
              maxHeight: "80%"
            }}
          ></div>
          <div className="mt-2 text-sm">{item.name}</div>
        </div>
      ))}
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -translate-x-3">
        <div>30</div>
        <div>20</div>
        <div>10</div>
        <div>0</div>
      </div>
      {/* Horizontal grid lines */}
      <div className="absolute left-0 top-0 w-full h-full">
        <div className="border-t border-gray-200 h-1/4 w-full"></div>
        <div className="border-t border-gray-200 h-1/4 w-full"></div>
        <div className="border-t border-gray-200 h-1/4 w-full"></div>
        <div className="border-t border-gray-200 h-1/4 w-full"></div>
      </div>
    </div>
  </div>
);

const EmployeeStatusChart: React.FC<{ data: ChartDataItem[] }> = ({ data }) => (
  <div className="mt-4">
    {data.map((item, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm">{item.name}</span>
          <span className="text-sm">{item.value}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className={`h-2 rounded-full ${index === 0 ? 'bg-gray-700' : 'bg-gray-300'}`}
            style={{ width: `${(item.value / 150) * 100}%` }}
          ></div>
        </div>
      </div>
    ))}
    <div className="flex justify-between mt-4 text-xs text-muted-foreground">
      <span>0</span>
      <span>25</span>
      <span>50</span>
      <span>75</span>
      <span>150</span>
    </div>
  </div>
);

const AttendancePieChart: React.FC<{ data: AttendanceChartItem[] }> = ({ data }) => {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="text-sm text-muted-foreground">Statistics</div>
        <div className="text-xl font-medium">Attendance</div>
        <div className="text-sm text-muted-foreground">tgl bulan thn</div>
      </div>
      <div className="flex items-center mt-2">
        <div className="relative" style={{ width: '200px', height: '200px' }}>
          {/* CSS-based pie chart instead of Recharts */}
          <div className="relative w-40 h-40 rounded-full mx-auto overflow-hidden">
            <div
              className="absolute w-full h-full bg-gray-700"
              style={{
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                transform: 'rotate(0deg)'
              }}
            ></div>
            <div
              className="absolute w-full h-full bg-gray-400"
              style={{
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 30%, 50% 30%)',
                transform: 'rotate(120deg)'
              }}
            ></div>
            <div
              className="absolute w-full h-full bg-gray-500"
              style={{
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 10%, 50% 10%)',
                transform: 'rotate(200deg)'
              }}
            ></div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-xl font-medium">41,67%</div>
          </div>
        </div>
        <div className="ml-6 flex-1">
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="mr-4">{item.name}</span>
                <span className="ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  let badgeClass = "";

  if (status === "On time") {
    badgeClass = "bg-gray-700 text-white";
  } else if (status === "Late") {
    badgeClass = "bg-gray-500 text-white";
  } else {
    badgeClass = "bg-gray-400 text-white";
  }

  return (
    <div className={`px-4 py-1 rounded-full text-sm inline-block ${badgeClass}`}>
      {status}
    </div>
  );
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => (
  <div className="h-full flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Attendance</h3>
      <div className="flex items-center">
        <Select>
          <SelectTrigger className="w-36 mr-2">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="january">January</SelectItem>
            <SelectItem value="february">February</SelectItem>
            <SelectItem value="march">March</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex mb-4">
      <div className="flex items-center mr-6">
        <div className="w-2 h-2 bg-gray-700 rounded-full mr-2"></div>
        <span className="text-sm">142 On time</span>
      </div>
      <div className="flex items-center mr-6">
        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
        <span className="text-sm">4 Late</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
        <span className="text-sm">9 Absent</span>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="py-3">No</TableHead>
          <TableHead className="py-3">Nama</TableHead>
          <TableHead className="py-3">Status Kehadiran</TableHead>
          <TableHead className="py-3">Check In</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} className="border-t border-gray-200">
            <TableCell className="py-3">{item.id}</TableCell>
            <TableCell className="py-3">{item.name}</TableCell>
            <TableCell className="py-3">
              <AttendanceStatusBadge status={item.status} />
            </TableCell>
            <TableCell className="py-3">{item.checkIn}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const Sidebar: React.FC = () => (
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
);

const Header: React.FC = () => (
  <div className="border-b p-4 flex justify-between items-center bg-white">
    <div className="flex items-center">
      <h1 className="text-2xl font-medium text-gray-700">Dashboard</h1>
    </div>
    <div className="flex items-center">
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search"
          className="pl-10"
        />
      </div>
      <div className="ml-4 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 bg-gray-300">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
          <div>
            <div className="font-medium">username</div>
            <div className="text-sm text-muted-foreground">roles user</div>
          </div>
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex-1 overflow-auto">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <EmployeeCard
              title="Total Employee"
              value={employeeData.totals.total}
              update="Update: March 16, 2025"
            />
            <EmployeeCard
              title="New Employees"
              value={employeeData.totals.new}
              update="Update: March 16, 2025"
            />
            <EmployeeCard
              title="Active Employees"
              value={employeeData.totals.active}
              update="Update: March 16, 2025"
            />
            <EmployeeCard
              title="Resigned Employees"
              value={employeeData.totals.resigned}
              update="Update: March 16, 2025"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
                <div>
                  <p className="text-sm text-muted-foreground">Employee Statistics</p>
                  <CardTitle>Current Number of Employees</CardTitle>
                </div>
                <Select>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-4">
                <EmployeeBarChart data={employeeData.barChartData} />
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
                <div>
                  <p className="text-sm text-muted-foreground">Employee Statistics</p>
                  <CardTitle>Employee Status</CardTitle>
                </div>
                <Select>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-4">
                <EmployeeStatusChart data={employeeData.status} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <AttendancePieChart data={employeeData.attendanceData} />
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <AttendanceTable data={employeeData.attendanceList} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
