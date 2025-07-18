"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface AttendanceDataItem {
  name: string;
  value: number;
}

interface AttendanceDonutChartProps {
  data: AttendanceDataItem[];
}

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

export default function AttendanceDonutChart({ data }: AttendanceDonutChartProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Attendance Summary</h2>
        <select className="text-sm rounded-md border px-2 py-1">
          <option>Months</option>
        </select>
      </div>
      <div className="flex justify-center">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span className="font-medium">{item.name}</span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
