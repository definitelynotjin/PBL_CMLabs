'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Eye, Check, X, ClockAlert } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CheckClockRecord {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: string;
  absenceType?: string;
  startDate?: string;
  endDate?: string;
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
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [records, sortKey, sortDirection]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const isAbsence = (rec: CheckClockRecord) =>
    rec.absenceType && rec.startDate && rec.endDate;

  const renderStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'approved') {
      return <Check className="w-4 h-4 text-green-600" />;
    } else if (lowerStatus === 'rejected') {
      return <X className="w-4 h-4 text-red-600" />;
    } else if (lowerStatus === 'late') {
      return <ClockAlert className="w-4 h-4 text-yellow-600" />;
    } else {
      return null;
    }
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
              { label: 'Details', key: null },
            ].map((col, idx) => (
              <TableHead
                key={idx}
                className={col.key ? 'cursor-pointer select-none' : ''}
                onClick={() => col.key && toggleSort(col.key as keyof CheckClockRecord)}
              >
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
              <TableCell colSpan={7} className="text-center p-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : sortedRecords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center p-4">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            sortedRecords.map((rec) => (
              <TableRow key={rec.id} className="hover:bg-gray-50">
                <TableCell>{formatDate(rec.date)}</TableCell>

                {isAbsence(rec) ? (
                  <>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{rec.clockIn || '-'}</TableCell>
                    <TableCell>{rec.clockOut || '-'}</TableCell>
                    <TableCell>{rec.workHours || '-'}</TableCell>
                  </>
                )}

                <TableCell className="capitalize">{rec.status.replace('_', ' ')}</TableCell>

                {/* Action icon */}
                <TableCell>
                  {renderStatusIcon(rec.status)}
                </TableCell>

                {/* Details icon */}
                <TableCell>
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
                    <TooltipContent side="top">Details</TooltipContent>
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
