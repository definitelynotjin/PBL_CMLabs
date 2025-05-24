"use client"; // Mark as Client Component for Next.js




import * as React from "react";
import Image from 'next/image';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { Grid, Users, Clock, Calendar, MessageCircle, Headphones, Settings } from 'lucide-react';

// Define types for dropdown options
interface Location {
  value: string;
  label: string;
}

interface AbsenceType {
  value: string;
  label: string;
}


// Sample data for dropdowns
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

const AddCheckclockAdmin: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedAbsenceType, setSelectedAbsenceType] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Define the center as a LatLngTuple
  const center: LatLngTuple = [-7.9826, 112.6308]; // Coordinates for Malang, Jawa Timur

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col justify-between items-center bg-gray-100 py-4">
        <div className="flex flex-col items-center gap-6">
          <Image src="/HRIS.png" alt="Logo" width={32} height={32} />
          <Link href="/dashboard">
            <Grid className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/employee-database">
            <Users className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/checkclock">
            <Clock className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/pricing-package">
            <Calendar className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/order-summary">
            <MessageCircle className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 mb-4">
          <Link href="/headphones">
            <Headphones className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
          <Link href="/settings">
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">Add Checkclock</h2>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <span>username</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>roles user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section: Form Inputs */}
            <div className="space-y-6">
              {/* Karyawan Dropdown */}
              <div>
                <Label htmlFor="employee">Karyawan</Label>
                <Select onValueChange={setSelectedAbsenceType} value={selectedAbsenceType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Karyawan" />
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
                <Button variant="outline" className="w-full mt-2">
                  Upload Now
                </Button>
              </div>
            </div>

            {/* Right Section: Map and Address Details */}
            <div className="space-y-6">
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
              <div className="h-64">
                <MapContainer
                  center={center}
                  zoom={13}
                  className="h-full w-full rounded-md"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={center}>
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
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCheckclockAdmin;