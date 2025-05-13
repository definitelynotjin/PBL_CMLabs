"use client"; // Mark as Client Component for Next.js

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Define types for dropdown options
interface Employee {
  value: string;
  label: string;
}

interface Location {
  value: string;
  label: string;
}

interface AbsenceType {
  value: string;
  label: string;
}

// Sample data for dropdowns
const employees: Employee[] = [
  { value: "juanita", label: "Juanita" },
  { value: "shane", label: "Shane" },
  { value: "miles", label: "Miles" },
];

const locations: Location[] = [
  { value: "malang", label: "Malang" },
  { value: "jakarta", label: "Jakarta" },
  { value: "surabaya", label: "Surabaya" },
];

const absenceTypes: AbsenceType[] = [
  { value: "clock-in", label: "Clock In" },
  { value: "clock-out", label: "Clock Out" },
  { value: "absent", label: "Absent" },
  { value: "annual-leave", label: "Annual Leave" },
  { value: "sick-leave", label: "Sick Leave" },
];

const AddCheckclock: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedAbsenceType, setSelectedAbsenceType] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">Add Checkclock</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Section: Form Inputs */}
        <div className="space-y-4">
          {/* Karyawan Dropdown */}
          <div>
            <Label htmlFor="employee">Karyawan</Label>
            <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Karyawan" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.value} value={employee.value}>
                    {employee.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipe Absensi Dropdown */}
          <div>
            <Label htmlFor="absence-type">Tipe Absensi</Label>
            <Select onValueChange={setSelectedAbsenceType} value={selectedAbsenceType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Tipe Absensi" />
              </SelectTrigger>
              <SelectContent>
                {absenceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload Bukti Pendukung */}
          <div>
            <Label htmlFor="file-upload">Upload Bukti Pendukung</Label>
            <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
              <p>Drag n Drop here</p>
              <p>Or</p>
              <Button variant="outline" asChild>
                <label htmlFor="file-upload">Browse</label>
              </Button>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {file && <p className="mt-2">Selected file: {file.name}</p>}
            </div>
          </div>

          {/* Upload Now Button */}
          <Button variant="outline" className="w-full">
            Upload Now
          </Button>
        </div>

        {/* Right Section: Map and Address Details */}
        <div className="space-y-4">
          {/* Lokasi Dropdown */}
          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Select onValueChange={setSelectedLocation} value={selectedLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Lokasi" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Map */}
          <div className="h-64 w-full">
            <MapContainer
              center={[-7.9826, 112.6308]} // Coordinates for Malang, Jawa Timur
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[-7.9826, 112.6308]}>
                <Popup>Malang</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Detail Alamat */}
          <div>
            <Label>Detail Alamat</Label>
            <Input
              value="Kota Malang, Jawa Timur"
              readOnly
              className="w-full mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Lat Lokasi</Label>
                <Input value="-7.9826" readOnly className="w-full" />
              </div>
              <div>
                <Label>Long Lokasi</Label>
                <Input value="112.6308" readOnly className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default AddCheckclock;