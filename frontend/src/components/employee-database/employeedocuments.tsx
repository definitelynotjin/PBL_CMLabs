'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';


export function EmployeeDocuments({ employeeId }: { employeeId: string }) {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await fetch(`/api/employees/${employeeId}/documents`);
                const data = await res.json();
                setDocuments(data);
            } catch (err) {
                console.error('Error fetching documents:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [employeeId]);

    if (loading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>
        );
    }

    if (documents.length === 0) {
        return <p className="text-sm text-muted-foreground">Tidak ada dokumen ditemukan.</p>;
    }

    return (
        <div className="space-y-3">
            {documents.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center border p-2 rounded-md">
                    <div>
                        <p className="font-medium">{doc.document_type}</p>
                        <p className="text-sm text-muted-foreground">{doc.file_name}</p>
                    </div>
                    <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                    >
                        Lihat
                    </a>
                </div>
            ))}
        </div>
    );
}
