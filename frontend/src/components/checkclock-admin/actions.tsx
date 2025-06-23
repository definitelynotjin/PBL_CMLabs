'use client';

import { Button } from '@/components/ui/button';
import { Filter, Download, Upload } from 'lucide-react';
import Link from 'next/link';

interface ActionsProps {
    onExport?: () => void;
}

const CheckclockActions: React.FC<ActionsProps> = ({ onExport }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
                <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                <Button variant="outline" onClick={onExport}><Download className="w-4 h-4 mr-2" /> Export</Button>
                <Button variant="outline"><Upload className="w-4 h-4 mr-2" /> Import</Button>
                <Link href="/add-checkclock-admin">
                    <Button>+ Tambah Data</Button>
                </Link>
            </div>
        </div>
    );
};

export default CheckclockActions;
