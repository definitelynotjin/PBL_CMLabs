'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Eye } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CheckClockRecord {
  id: string;
  date: string;          // e.g. '2025-06-26'
  clockIn: string;       // e.g. '08:00:00'
  clockOut: string;      // e.g. '17:00:00'
  workHours: string;     // e.g. '9h'
  status: string;        // e.g. 'on_time', 'late', 'early'
  absenceType?: string;  // e.g. 'Sick Leave', 'Personal Leave'
  startDate?: string;    // absence start date
  endDate?: string;      // absence end date
}

interface CheckClockTableProps {
  records: CheckClockRecord[];
  loading: boolean;
  onView?: (record: CheckClockRecord) => void;
}

export default function CheckClockTable({ records, loading, onView }: CheckClockTableProps) {
  const [sortKey, setSortKey] = useState<keyof CheckClockRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const toggleSort = (key: keyof CheckClockRecord) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortKey(null);
      setSortDirection(null);
    }
  };

  const sortedRecords = useMemo(() => {
    if (!sortKey || !sortDirection) return records;

    return [...records].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });
  }, [records, sortKey, sortDirection]);

  // Helper to format date like admin table
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isAbsence = (record: CheckClockRecord) => {
    return record.absenceType !== undefined && record.startDate !== undefined && record.endDate !== undefined;
  };

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              { label: 'Date', key: 'date' },
              { label: 'Clock In', key: 'clockIn' },
              { label: 'Clock Out', key: 'clockOut' },
              { label: 'Work Hours', key: 'workHours' },
              { label: 'Status', key: 'status' },
              { label: 'Action', key: null },
            ].map((col, idx) => (
              <TableHead key={idx} className="cursor-pointer select-none" onClick={() => col.key && toggleSort(col.key as keyof CheckClockRecord)}>
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.key && <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center p-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : sortedRecords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center p-4">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            sortedRecords.map((rec) => (
              <TableRow key={rec.id} className="hover:bg-gray-50">
                <TableCell>
                  {new Date(rec.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>

                {isAbsence(rec) ? (
                  <>
                    <TableCell colSpan={2} className="italic text-gray-600">
                      {rec.absenceType || 'Absence'} from {new Date(rec.startDate!).toLocaleDateString()} to {new Date(rec.endDate!).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {/* Calculate duration */}
                      {(() => {
                        const start = new Date(rec.startDate!);
                        const end = new Date(rec.endDate!);
                        const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        return `${diff} day${diff > 1 ? 's' : ''}`;
                      })()}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{rec.clockIn || '-'}</TableCell>
                    <TableCell>{rec.clockOut || '-'}</TableCell>
                    <TableCell>{rec.workHours || '-'}</TableCell>
                    <TableCell className="capitalize">{rec.status.replace('_', ' ')}</TableCell>
                  </>
                )}

                <TableCell>
                  {/* View button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-blue-600"
                        onClick={() => onView && onView(rec)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">View</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
