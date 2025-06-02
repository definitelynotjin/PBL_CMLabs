"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";

// Type data for chart items
type ChartDataItem = {
  date: string;
  hours: number;
};

// Sample data for work hours
const data: ChartDataItem[] = [
  { date: "March 20", hours: 8 },
  { date: "March 21", hours: 2 },
  { date: "March 22", hours: 4 },
  { date: "March 23", hours: 3 },
  { date: "March 24", hours: 6.7 },
  { date: "March 25", hours: 3 },
  { date: "March 26", hours: 5 },
];

export default function WorkHourBarChart() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Your Work Hours</h2>
        <select className="text-sm rounded-md border border-gray-300 px-2 py-1"> 
          <option>View by Week</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          {/* Horizontal grid lines */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* X-axis with date labels */}
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y-axis with hour values */}
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, Math.max(...data.map(item => item.hours)) + 1]} // Dynamic max value
          />

          {/* Default tooltip */}
          <Tooltip cursor={{ fill: "transparent" }} />

          {/* Main bar */}
          <Bar
            dataKey="hours"
            radius={[6, 6, 0, 0]} // Rounded corners at the top
            fill="#9ca3af" // Gray color
            barSize={40} // Width of the bars
          >
            {/* Value labels displayed on top of the bars */}
            <LabelList
              dataKey="hours"
              position="top"
              style={{ fill: "black", fontSize: 12, fontWeight: "bold" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}