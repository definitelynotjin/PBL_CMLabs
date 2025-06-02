"use client";

import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Present", value: 60 },
  { name: "Permit", value: 10 },
  { name: "Leave", value: 20 },
  { name: "Sick", value: 10 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AttendanceDonutChart() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Attendance Summary</h2>
        <select className="text-sm rounded-md border px-2 py-1"> 
          <option>months</option>
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
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
