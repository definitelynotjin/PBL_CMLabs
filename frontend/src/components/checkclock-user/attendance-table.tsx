import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  check_clock_type?: "1" | "2";
  check_clock_time?: string;
  latitude?: string;
  longitude?: string;
  supporting_document_path?: string;
  name?: string;
  position?: string;
  avatar?: string;
  ck_setting?: {
    name: string;
  };
}

interface AttendanceTableProps {
  data: AttendanceRecord[];
  onView?: (record: AttendanceRecord) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Work Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record, idx) => (
            <TableRow key={`${record.date}-${idx}`}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.clockIn}</TableCell>
              <TableCell>{record.clockOut}</TableCell>
              <TableCell>{record.workHours}</TableCell>
              <TableCell>
                <span
                  className={`text-xs py-1 px-2 rounded-full ${record.status === "On Time"
                    ? "bg-green-100 text-green-700"
                    : record.status === "Late"
                      ? "bg-yellow-100 text-yellow-700"
                      : record.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : record.status === "Absent"
                          ? "bg-gray-300 text-gray-800"
                          : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {record.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView?.(record)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
