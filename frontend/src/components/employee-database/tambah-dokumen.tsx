import React, { useState } from 'react';
import { Employee } from './types';

interface TambahDokumenProps {
  employee: Employee;
  onClose: () => void;
}

const TambahDokumen: React.FC<TambahDokumenProps> = ({ employee, onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return alert('Please select a file first');

    // TODO: Implement actual upload logic here, e.g. API call

    alert(`Uploading ${file.name} for ${employee.first_name} ${employee.last_name}`);
    setFile(null); // Clear selected file
    onClose();
  };

  const handleCancel = () => {
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4">
          Tambah Dokumen untuk {employee.first_name} {employee.last_name}
        </h2>

        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          aria-label="Pilih file dokumen"
          className="mb-2"
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
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file}
            className={`px-4 py-2 rounded text-white ${
              file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahDokumen;