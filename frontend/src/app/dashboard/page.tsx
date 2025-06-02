import dynamic from 'next/dynamic';
import Sidebar from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard/header"; 
import AttendanceDonutChart from "@/components/dashboard/attendance-donutchart"; // Ensure correct import path
import { EmployeeCard } from "@/components/dashboard/employee-card";
import { EmployeeBarChart } from "@/components/dashboard/employee-barchart";
import { EmployeeStatusChart } from "@/components/dashboard/employee-status-chart";
import { AttendanceTable } from "@/components/dashboard/attendance-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AttendanceStatus {
  name: string;
  value: number;
}

export default function DashboardUserPage() {
  const employeeCards = [
    { title: "Total Employee", value: 208 },
    { title: "New Employees", value: 20 },
    { title: "Active Employees", value: 15 },
    { title: "Resigned Employees", value: 10 },
  ];

  const barChartData = [
    { name: "New", value: 15 },
    { name: "Active", value: 10 },
    { name: "Resign", value: 20 },
  ];

  const statusData = [
    { name: "Tetap Permanen", value: 23 },
    { name: "Tetap Percobaan", value: 46 },
    { name: "PKWT (Kontrak)", value: 64 },
    { name: "Magang", value: 75 },
  ];

  const attendanceData = [
    { id: 1, name: "Johan", status: "On time", checkIn: "08.00" },
    { id: 2, name: "Timothy Moore", status: "Izin", checkIn: "09.00" },
    { id: 3, name: "Bob Doe", status: "Late", checkIn: "08.15" },
  ];

  const attendancePieChartData: AttendanceStatus[] = attendanceData.reduce((acc: AttendanceStatus[], curr) => {
    const statusName = curr.status;

    const existing = acc.find(item => item.name === statusName);
    
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: statusName, value: 1 });
    }

    return acc;
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <DashboardHeader />

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {employeeCards.map((card, idx) => (
            <EmployeeCard
              key={idx}
              title={card.title}
              value={card.value}
              update="Update: March 16, 2025"
              className="bg-white rounded-lg shadow-lg p-4"
            />
          ))}
        </div>

        {/* Employee Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="font-semibold text-xl">Employee Statistics</h2>
            <h3 className="text-lg font-bold mb-2">Current Number of Employees</h3>
            <Select>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="march">March</SelectItem>
              </SelectContent>
            </Select>
            <EmployeeBarChart data={barChartData} />
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

        {/* Attendance Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="font-semibold text-xl">Attendance Statistics</h2>
            <AttendanceDonutChart />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-xl">Attendance</h3>
            <AttendanceTable data={attendanceData} />
          </div>
        </div>
      </div>
    </div>
  );
}