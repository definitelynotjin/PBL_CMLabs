'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import AttendanceDonutChart from '@/components/dashboard/attendance-donutchart';
import { EmployeeCard } from '@/components/dashboard/employee-card';
import { EmployeeStatusChart } from '@/components/dashboard/employee-status-chart';
import { AttendanceTable } from '@/components/dashboard/attendance-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EmployeeCardItem {
  title: string;
  value: number;
}

interface AttendanceItem {
  id: string;
  name: string;
  status: string;
  clockIn: string;
  clockOut: string;
  workHour: string;
}

interface StatusItem {
  name: string;
  value: number;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  join_date: string;
  status: number;
  contract_type: 'Tetap' | 'Kontrak' | 'Lepas' | null;
  position?: string | null;
}

interface Clock {
  id: string;
  check_clock_type: '1' | '2';
  check_clock_time: string;
  user?: {
    employee?: {
      first_name: string;
    };
  };
}

export default function DashboardUserPage() {
  const [employeeCards, setEmployeeCards] = useState<EmployeeCardItem[]>([]);
  const [statusData, setStatusData] = useState<StatusItem[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await res.json();
        const employees: Employee[] = responseData.data || [];

        setEmployeeCards([
          { title: 'Total Employee', value: employees.length },
          {
            title: 'New Employees',
            value: employees.filter((e) => {
              const joined = new Date(e.join_date);
              return joined.getMonth() === new Date().getMonth();
            }).length,
          },
          {
            title: 'Active Employees',
            value: employees.filter((e) => e.status === 1).length,
          },
          {
            title: 'Resigned Employees',
            value: employees.filter((e) => e.status === 0).length,
          },
        ]);

        setStatusData([
          { name: 'Tetap', value: employees.filter((e) => e.contract_type === 'Tetap').length },
          { name: 'Kontrak', value: employees.filter((e) => e.contract_type === 'Kontrak').length },
          { name: 'Lepas', value: employees.filter((e) => e.contract_type === 'Lepas').length },
          {
            name: 'Magang',
            value: employees.filter((e) => e.position?.toLowerCase().includes('magang')).length,
          },
        ]);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchAttendance = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/checkclocks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await res.json();
        const clocks: Clock[] = responseData.data || [];

        const formatted: AttendanceItem[] = clocks.map((clock) => ({
          id: clock.id,
          name: clock.user?.employee?.first_name ?? 'Unknown',
          status: getStatus(clock),
          clockIn: clock.check_clock_type === '1' ? clock.check_clock_time : '-',
          clockOut: clock.check_clock_type === '2' ? clock.check_clock_time : '-',
          workHour: '-', // Optional: calculate actual work hours
        }));

        setAttendanceData(formatted);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchEmployees();
    fetchAttendance();
  }, []);

  const getStatus = (clock: Clock) => {
    if (clock.check_clock_type === '1' && clock.check_clock_time > '08:00') return 'Late';
    if (clock.check_clock_type === '1') return 'On time';
    return 'Izin';
  };

  const attendancePieChartData: StatusItem[] = attendanceData.reduce((acc: StatusItem[], curr) => {
    const found = acc.find((item) => item.name === curr.status);
    if (found) found.value += 1;
    else acc.push({ name: curr.status, value: 1 });
    return acc;
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <DashboardHeader />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {employeeCards.map((card, idx) => (
            <EmployeeCard
              key={idx}
              title={card.title}
              value={card.value}
              update="Update: Today"
              className="bg-white rounded-lg shadow-lg p-4"
            />
          ))}
        </div>

        {/* Attendance and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="font-semibold text-xl">Attendance Statistics</h2>
            <AttendanceDonutChart data={attendancePieChartData} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="font-semibold text-xl">Employee Status</h2>
            <Select>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="march">March</SelectItem>
              </SelectContent>
            </Select>
            <EmployeeStatusChart data={statusData} />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-semibold text-xl">Attendance</h3>
          <AttendanceTable data={attendanceData} />
        </div>
      </div>
    </div>
  );
}
