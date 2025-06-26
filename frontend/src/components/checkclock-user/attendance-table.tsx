'use client';

import React, { useState, useMemo } from 'react';
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

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-md">
          <thead>
            <tr className="bg-muted text-left">
              {[
                { label: 'Date', key: 'date' },
                { label: 'Clock In', key: 'clockIn' },
                { label: 'Clock Out', key: 'clockOut' },
                { label: 'Work Hours', key: 'workHours' },
                { label: 'Status', key: 'status' },
                { label: 'Action', key: null },
              ].map((col, idx) => (
                <th key={idx} className="p-2">
                  <div
                    className={`flex items-center gap-1 ${col.key ? 'cursor-pointer' : ''}`}
                    onClick={() => col.key && toggleSort(col.key as keyof CheckClockRecord)}
                  >
                    {col.label}
                    {col.key && (
                      <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : sortedRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No records found.
                </td>
              </tr>
            ) : (
              sortedRecords.map((rec) => (
                <tr key={rec.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{rec.date}</td>
                  <td className="p-2">{rec.clockIn}</td>
                  <td className="p-2">{rec.clockOut}</td>
                  <td className="p-2">{rec.workHours}</td>
                  <td className="p-2 capitalize">{rec.status.replace('_', ' ')}</td>
                  <td className="p-2 text-right">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}
