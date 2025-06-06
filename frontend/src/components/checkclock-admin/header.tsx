import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Filter } from 'lucide-react';

const CheckclockHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Checkclock Overview</h1>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search Employee" className="w-64" />
        <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filter</Button>
        <Link href="/add-checkclock-admin">
          <Button>+ Tambah Data</Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckclockHeader;