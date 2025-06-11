"use client";

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

const MapComponent = dynamic(() => import("@/components/mapcomponent"), {
  ssr: false,
});

const locations = [
  { id: "58b66a88-1e4f-46c1-8e90-b47194983a9a", value: "malang", label: "Kantor Malang" },
  { id: "a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92", value: "jakarta", label: "Kantor Jakarta" },
  { id: "c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae", value: "surabaya", label: "Kantor Surabaya" },
];


const absenceTypes = [
  { value: "clock-in", label: "Clock In" },
  { value: "clock-out", label: "Clock Out" },
  { value: "absent", label: "Absent" },
  { value: "annual-leave", label: "Annual Leave" },
  { value: "sick-leave", label: "Sick Leave" },
];

interface CheckclockFormProps {
  isClient: boolean;
}

const CheckclockForm: React.FC<CheckclockFormProps> = ({ isClient }) => {
  const [selectedAbsenceType, setSelectedAbsenceType] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [userLocation, setUserLocation] = React.useState<LatLngTuple | null>(null);
  const [address, setAddress] = React.useState("Mengambil lokasi...");

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            setAddress(data.display_name || "Alamat tidak ditemukan");
          } catch {
            setAddress("Gagal mengambil alamat");
          }
        },
        () => setAddress("Gagal mengambil lokasi")
      );
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAbsenceType || !selectedLocation) {
      return alert("Mohon lengkapi tipe absensi dan lokasi.");
    }

    if (["annual-leave", "sick-leave"].includes(selectedAbsenceType)) {
      if (!startDate || !endDate || !file) {
        return alert("Untuk cuti/sakit, isi tanggal dan lampirkan dokumen.");
      }
    }

    const formData = new FormData();

    // If the endpoint is checkclocks, send check_clock_type and check_clock_time
    const isCheckClock = !["annual-leave", "sick-leave", "absent"].includes(selectedAbsenceType);

    if (isCheckClock) {
      // Map absence type to backend check_clock_type enum "1" or "2"
      let check_clock_type = "";
      if (selectedAbsenceType === "clock-in") {
        check_clock_type = "1";
      } else if (selectedAbsenceType === "clock-out") {
        check_clock_type = "2";
      } else {
        // fallback or handle other types if needed
        check_clock_type = "1"; // default to clock-in
      }

      // Get current time in HH:mm:ss format
      const now = new Date();
      const pad = (num: number) => num.toString().padStart(2, "0");
      const check_clock_time = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;


      formData.append("check_clock_type", check_clock_type);
      formData.append("check_clock_time", check_clock_time);
    } else {
      // For absence requests, send absence_type
      formData.append("absence_type", selectedAbsenceType);
    }

    const selectedLocationId = locations.find(loc => loc.value === selectedLocation)?.id || "";
    formData.append("check_clock_setting_id", selectedLocationId);


    if (userLocation) {
      formData.append("latitude", userLocation[0].toString());
      formData.append("longitude", userLocation[1].toString());
    }

    if (file) formData.append("supporting_document", file);
    if (startDate) formData.append("start_date", startDate);
    if (endDate) formData.append("end_date", endDate);

    const endpoint = ["annual-leave", "sick-leave", "absent"].includes(selectedAbsenceType)
      ? "https://pblcmlabs.duckdns.org/api/absence-requests"
      : "https://pblcmlabs.duckdns.org/api/checkclocks";

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Berhasil dikirim!");
      resetForm();
    } catch (err: any) {
      alert("Gagal mengirim: " + err.message);
    }
  };

  const resetForm = () => {
    setSelectedAbsenceType("");
    setSelectedLocation("");
    setFile(null);
    setStartDate("");
    setEndDate("");
    setAddress("Mengambil lokasi...");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="absence-type">Tipe Absensi</Label>
            <Select
              value={selectedAbsenceType}
              onValueChange={(val) => {
                setSelectedAbsenceType(val);
                if (!["annual-leave", "sick-leave"].includes(val)) {
                  setStartDate("");
                  setEndDate("");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tipe Absensi" />
              </SelectTrigger>
              <SelectContent>
                {absenceTypes.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
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
            <div className="border-2 border-dashed p-4 rounded-md text-center">
              <p>Drag & Drop atau klik Browse</p>
              <Button variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Browse
                </label>
              </Button>
              <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <Label>Lokasi</Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Lokasi" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="h-64">
            {isClient && userLocation && (
              <MapComponent center={userLocation} markerPopupText="Lokasi Anda" />
            )}
          </div>

          <div>
            <Label>Detail Alamat</Label>
            <Input readOnly value={address} className="mb-2" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Latitude</Label>
                <Input readOnly value={userLocation?.[0] ?? ""} />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input readOnly value={userLocation?.[1] ?? ""} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={resetForm}>
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default CheckclockForm;
