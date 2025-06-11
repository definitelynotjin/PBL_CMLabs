"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface UploadDocumentDialogProps {
  onClose: () => void
  onUpload: () => void
  setDocumentType: (value: string) => void
  setDocumentFile: (file: File | null) => void
}

export function UploadDocumentDialog({
  onClose,
  onUpload,
  setDocumentType,
  setDocumentFile,
}: UploadDocumentDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Dokumen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="doc-type">Tipe Dokumen</Label>
          <Select onValueChange={setDocumentType}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih tipe dokumen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Surat Peringatan">Surat Peringatan</SelectItem>
              <SelectItem value="Kontrak">Kontrak</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="file">File</Label>
          <Input type="file" onChange={(e) => setDocumentFile(e.target.files?.[0] || null)} />
        </div>
        <DialogFooter>
          <Button onClick={onUpload}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
