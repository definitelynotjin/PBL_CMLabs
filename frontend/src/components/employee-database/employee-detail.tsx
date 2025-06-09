import React from 'react';
import { Employee } from './types';

interface EmployeeDetailProps {
  employee: Employee;
  onClose: () => void;
  onAddDocument: () => void;  // make sure to include this
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onClose, onAddDocument }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4">
          Detail Karyawan: {employee.first_name} {employee.last_name}
        </h2>

        <div className="space-y-2">
          <p><strong>ID:</strong> {employee.user?.employee_id || '-'}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Branch:</strong> {employee.branch || '-'}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Grade:</strong> {employee.grade || '-'}</p>
          <p><strong>Status:</strong> {employee.status ? 'Active' : 'Inactive'}</p>
          <p><strong>Employment Status:</strong> {employee.employment_status || '-'}</p>
          <p><strong>Type:</strong> {employee.type || '-'}</p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onAddDocument}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Tambah Dokumen
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
