import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { AttendanceStatusBadge } from "./attendance-status-badge-props";

interface EmployeeAttendanceItem {
  id: number;
  name: string;
  status: string;
  checkIn: string;
}

interface AttendanceTableProps {
  data: EmployeeAttendanceItem[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => (
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

    <div className="flex mb-4 text-sm">
      <div className="flex items-center mr-6">
        <div className="w-2 h-2 bg-gray-700 rounded-full mr-2"></div>
        <span>142 On time</span>
      </div>
      <div className="flex items-center mr-6">
        <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
        <span>4 Late</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
        <span>9 Absent</span>
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
