import React, { useState } from 'react';
import { Employee } from './types';

interface TambahDokumenProps {
  employee: Employee;
  onClose: () => void;
  onUpload: (file: File, documentType: string, employeeId: string) => Promise<void>;
}

const TambahDokumen: React.FC<TambahDokumenProps> = ({ employee, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');
    if (!documentType) return alert('Please select a document type');

    try {
      setLoading(true);
      await onUpload(file, documentType, employee.id.toString());
      alert('Upload successful!');
      setFile(null);
      setDocumentType('');
      onClose();
    } catch (error) {
      alert('Upload failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setDocumentType('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4">
          Tambah Dokumen untuk {employee.first_name} {employee.last_name}
        </h2>

        <label htmlFor="doc-type" className="block mb-1 font-medium">Tipe Dokumen</label>
        <select
          id="doc-type"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="mb-4 w-full border rounded p-2"
          disabled={loading}
        >
          <option value="" disabled>
            Pilih tipe dokumen
          </option>
          <option value="Surat Peringatan">Surat Peringatan</option>
          <option value="Kontrak">Kontrak</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        <label htmlFor="file-upload" className="block mb-2 font-medium">
          Upload Dokumen
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="mb-2 w-full"
          disabled={loading}
        />

        {file && (
          <p className="text-sm text-gray-700 mb-4">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || !documentType || loading}
            className={`px-4 py-2 rounded text-white ${file && documentType && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
              }`}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahDokumen;
