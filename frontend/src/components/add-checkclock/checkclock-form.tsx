import React from "react";
import type { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedAbsenceType, setSelectedAbsenceType] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [userLocation, setUserLocation] = React.useState<LatLngTuple | null>(null);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAbsenceType) {
      alert("Please select an absence type.");
      return;
    }

    const formData = new FormData();
    formData.append("absence_type", selectedAbsenceType);
    formData.append("location", selectedLocation);
    if (userLocation) {
      formData.append("latitude", userLocation[0].toString());
      formData.append("longitude", userLocation[1].toString());
    }
    formData.append("address", address);
    if (file) {
      formData.append("supporting_document", file);
    }

    if (["annual-leave", "sick-leave"].includes(selectedAbsenceType)) {
      if (!startDate || !endDate) {
        alert("Please fill in both start and end dates.");
        return;
      }
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
    }

    let endpoint = "";
    if (["annual-leave", "sick-leave", "absent"].includes(selectedAbsenceType)) {
      endpoint = "https://pblcmlabs.duckdns.org/api/absence-requests";
    } else {
      endpoint = "https://pblcmlabs.duckdns.org/api/checkclocks";
    }

    try {
      // First, fetch the CSRF cookie from Sanctum
      await fetch("https://pblcmlabs.duckdns.org/sanctum/csrf-cookie", {
        credentials: "include",
      });

      // Then, do your POST request
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error (not JSON)", errorText);
        throw new Error("Submission failed, check console for details.");
      }

      alert("Submission successful!");
      // Reset form
      setSelectedAbsenceType("");
      setSelectedLocation("");
      setFile(null);
      setStartDate("");
      setEndDate("");
    } catch (error: any) {
      alert("Failed to submit: " + error.message);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="absence-type">Tipe Absensi</Label>
            <Select
              onValueChange={(value) => {
                setSelectedAbsenceType(value);
                if (["annual-leave", "sick-leave"].includes(value)) {
                  setStartDate("");
                  setEndDate("");
                }
              }}
              value={selectedAbsenceType}
            >
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

          {["annual-leave", "sick-leave"].includes(selectedAbsenceType) && (
            <div className="flex space-x-4">
              <div className="w-full">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="file-upload">Upload Bukti Pendukung</Label>
            <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
              <p>Drag n Drop here</p>
              <p>Or</p>
              <Button variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Browse
                </label>
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
        </div>

        <div className="space-y-6">
          <div>
            <Label>Lokasi</Label>
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
                <Input
                  value={userLocation ? userLocation[0] : ""}
                  readOnly
                  className="w-full"
                />
              </div>
              <div>
                <Label>Long Lokasi</Label>
                <Input
                  value={userLocation ? userLocation[1] : ""}
                  readOnly
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            setSelectedAbsenceType("");
            setSelectedLocation("");
            setFile(null);
            setStartDate("");
            setEndDate("");
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CheckclockForm;
