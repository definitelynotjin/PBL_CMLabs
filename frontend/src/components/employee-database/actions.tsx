import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Upload } from 'lucide-react';
import Link from 'next/link';

const Actions: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">All Employees Information</h2>
      <div className="flex gap-2">
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" /> Import
        </Button>
        <Link href="/add-new-employee" passHref>
          <Button>+ Tambah Data</Button>
        </Link>
      </div>
    </div>
  );
};

export default Actions;