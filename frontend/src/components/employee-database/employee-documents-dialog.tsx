'use client';

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Document {
    id: string;
    document_type: string;
    file_name: string;
    file_url: string;
}

type Props = {
    employeeId: string;
    onClose: () => void;
};

export default function EmployeeDocumentsDialog({ employeeId, onClose }: Props) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const res = await fetch(`/api/employees/${employeeId}/documents`);
                if (!res.ok) throw new Error('Failed to fetch documents');
                const data = await res.json();
                setDocuments(data);
            } catch (error) {
                console.error(error);
                setDocuments([]);
            } finally {
                setLoading(false);
            }
        }
        fetchDocuments();
    }, [employeeId]);

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Documents</DialogTitle>
                </DialogHeader>

                {loading ? (
                    <p>Loading documents...</p>
                ) : documents.length === 0 ? (
                    <p>No documents found.</p>
                ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex justify-between items-center border p-2 rounded-md"
                            >
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
                        ))}
                    </div>
                )}

                <DialogFooter className="mt-4">
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
