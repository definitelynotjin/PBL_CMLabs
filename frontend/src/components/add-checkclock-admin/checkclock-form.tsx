import React from "react";
import type { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface CheckclockFormProps {
  isClient: boolean;
}

const MapComponent = dynamic(() => import("@/components/mapcomponent.tsx"), { ssr: false });

const locations = [
  { value: "malang", label: "Malang" },
  { value: "jakarta", label: "Jakarta" },
  { value: "surabaya", label: "Surabaya" },
];

const absenceTypes = [
  { value: "clock-in", label: "Clock In" },
  { value: "clock-out", label: "Clock Out" },
  { value: "absent", label: "Absent" },
  { value: "annual-leave", label: "Annual Leave" },
  { value: "sick-leave", label: "Sick Leave" },
];

const CheckclockForm: React.FC<CheckclockFormProps> = ({ isClient }) => {
  const [selectedEmployee, setSelectedEmployee] = React.useState("");
  const [selectedAbsenceType, setSelectedAbsenceType] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const [userLocation, setUserLocation] = React.useState<LatLngTuple | null>(null);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);

          // Fetch address from reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            .then((res) => res.json())
            .then((data) => {
              setAddress(data.display_name);
            })
            .catch((err) => console.error("Reverse geocoding error:", err));
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="employee">Karyawan</Label>
            <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Karyawan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee1">Employee 1</SelectItem>
                <SelectItem value="employee2">Employee 2</SelectItem>
                <SelectItem value="employee3">Employee 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="absence-type">Tipe Absensi</Label>
            <Select onValueChange={setSelectedAbsenceType} value={selectedAbsenceType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Tipe Absensi" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {absenceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

        <div className="space-y-6">
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

          <div className="h-64">
            {isClient && (
              <MapComponent
                center={userLocation ?? [-7.9826, 112.6308]}
                markerPopupText="Lokasi Anda"
              />
            )}
          </div>


          <div>
            <Label>Detail Alamat</Label>
            <Input
              value={address || "Mengambil lokasi..."}
              readOnly
              className="w-full mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Lat Lokasi</Label>
                <Input value={userLocation ? userLocation[0] : ""} readOnly className="w-full" />
              </div>
              <div>
                <Label>Long Lokasi</Label>
                <Input value={userLocation ? userLocation[1] : ""} readOnly className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default CheckclockForm;
