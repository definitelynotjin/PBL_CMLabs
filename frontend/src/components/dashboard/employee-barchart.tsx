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

// Tipe data untuk item data chart
type ChartDataItem = {
  name: string;
  value: number;
};

// Komponen chart batang jumlah karyawan
export function EmployeeBarChart({ data }: { data: ChartDataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        {/* Garis grid horizontal */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        {/* Sumbu X menampilkan nama kategori */}
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        {/* Sumbu Y menampilkan nilai */}
        <YAxis
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 10, 20, 30]}
        />

        {/* Tooltip default dari Recharts */}
        <Tooltip cursor={{ fill: "transparent" }} />

        {/* Bar utama */}
        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]} // Sudut membulat di atas
          fill="#9ca3af" // Warna abu-abu (mirip desain)
          barSize={40} // Ukuran lebar batang
        >
          {/* Label nilai ditampilkan di atas batang */}
          <LabelList
            dataKey="value"
            position="top"
            style={{ fill: "black", fontSize: 12, fontWeight: "bold" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
