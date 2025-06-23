import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  onClose: () => void;
  onSubmit: (file: File, type: string) => Promise<void>;
};


export default function UploadDocumentsDialog({
  onClose,
  onSubmit,
}: Props) {
  const [localType, setLocalType] = useState('');
  const [localFile, setLocalFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!localFile || !localType) {
      alert('Please select a document type and file');
      return;
    }
    console.log("Submitting:", localFile, localType);
    try {
      await onSubmit(localFile, localType);
      console.log("Upload complete");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };


  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Document Type (e.g., Employment Contract)"
            value={localType}
            onChange={e => setLocalType(e.target.value)}
          />
          <Input
            type="file"
            onChange={e => setLocalFile(e.target.files?.[0] || null)}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
