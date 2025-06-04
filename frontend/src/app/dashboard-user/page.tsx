
import SidebarUser from "@/components/sidebar-user";
import { DashboardHeader } from "@/components/dashboard-user/header";
import DateRangePicker from "@/components/dashboard-user/daterange-picker";
import SummaryCard from "@/components/dashboard-user/summary-card";
import AttendanceDonutChart from "@/components/dashboard-user/attendance-donutchart";
import LeaveSummary from "@/components/dashboard-user/leave-summary";
import WorkHourBarChart from "@/components/dashboard-user/workhour-barchart";

export default function DashboardUserPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarUser />

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 space-y-6">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <main className="space-y-6">
          {/* Filter */}
          <div className="flex justify-between items-center">
            <DateRangePicker />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard title="Work Hours" value="120h 54m" className="bg-white rounded-lg shadow-lg p-4" />
            <SummaryCard title="On Time" value="20" className="bg-white rounded-lg shadow-lg p-4" />
            <SummaryCard title="Late" value="5" className="bg-white rounded-lg shadow-lg p-4" />
            <SummaryCard title="Absent" value="10" className="bg-white rounded-lg shadow-lg p-4" />
          </div>

          {/* Attendance Summary & Leave Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <AttendanceDonutChart />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <LeaveSummary />
            </div>
          </div>

          {/* Work Hour Chart */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <WorkHourBarChart />
          </div>
        </main>
      </div>
    </div>
  );
}
