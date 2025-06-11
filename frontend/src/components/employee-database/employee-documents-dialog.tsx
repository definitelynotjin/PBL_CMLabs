import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Document {
    id: string;
    document_type: string;
    file_url: string;
    created_at: string;
}

export default function EmployeeDocumentsDialog({
    employeeId,
    onClose,
}: {
    employeeId: string;
    onClose: () => void;
}) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDocs() {
            try {
                const res = await fetch(`/api/employees/${employeeId}/documents`);
                if (!res.ok) throw new Error('Failed to fetch documents');
                const docs = await res.json();
                setDocuments(docs);
            } catch (error) {
                alert('Failed to load documents');
            } finally {
                setLoading(false);
            }
        }
        fetchDocs();
    }, [employeeId]);

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dokumen Karyawan</DialogTitle>
                </DialogHeader>
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : documents.length === 0 ? (
                        <p>Tidak ada dokumen.</p>
                    ) : (
                        <ul>
                            {documents.map(doc => (
                                <li key={doc.id}>
                                    <strong>{doc.document_type}</strong> -{' '}
                                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                                        Lihat File
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Tutup</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
