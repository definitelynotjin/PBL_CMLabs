'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContentSidebarRight,
    DialogHeader,
    DialogTitle,
    DialogContentCentered,
    DialogDescription,
    DialogFooter,
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
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [docToDelete, setDocToDelete] = useState<Document | null>(null);

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

    const handleDeleteConfirm = async () => {
        if (!docToDelete) return;

        try {
            const res = await fetch(`/api/documents/${docToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add auth headers if needed here
                },
            });

            if (!res.ok) throw new Error('Failed to delete document');

            setDocuments((docs) => docs.filter((d) => d.id !== docToDelete.id));
            setShowDeleteConfirm(false);
            setDocToDelete(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(String(error));
            }
        }
    };


    return (
        <>
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
                                <div
                                    key={doc.id}
                                    className="flex justify-between items-center border p-2 rounded-md"
                                >
                                    <div>
                                        <p className="font-medium">{doc.document_type}</p>
                                        <p className="text-sm text-muted-foreground">{doc.file_name}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={doc.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 text-sm hover:underline"
                                        >
                                            View
                                        </a>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                setDocToDelete(doc);
                                                setShowDeleteConfirm(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
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

            {/* Delete confirmation dialog */}
            <Dialog
                open={showDeleteConfirm}
                onOpenChange={(open) => {
                    if (!open) setShowDeleteConfirm(false);
                }}
            >
                <DialogContentCentered className="max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle>Delete Document</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{docToDelete?.file_name || 'this document'}</strong>? This action
                            cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContentCentered>
            </Dialog>
        </>
    );
}
