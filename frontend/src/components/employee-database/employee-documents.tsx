'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContentSidebarRight,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type Document = {
    id: string;
    document_type: string;
    file_name: string;
    file_url: string;
};

export default function EmployeeDocumentsDialog({
    open,
    onClose,
    employeeId,
}: {
    open: boolean;
    onClose: () => void;
    employeeId: string;
}) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!open) return;

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
    }, [employeeId, open]);

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContentSidebarRight>
                <DialogHeader>
                    <DialogTitle>Employee Documents</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    {loading ? (
                        <>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </>
                    ) : documents.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No documents found.</p>
                    ) : (
                        documents.map((doc) => (
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
                                    View
                                </a>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-6">
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContentSidebarRight>
        </Dialog>
    );
}
