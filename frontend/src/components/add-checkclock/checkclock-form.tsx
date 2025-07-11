"use client";

import React from "react";
import type { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import toast from 'react-hot-toast';
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
  {
    id: "58b66a88-1e4f-46c1-8e90-b47194983a9a",
    value: "malang",
    label: "Kantor Malang",
    coords: [-7.983908, 112.621391], // latitude, longitude
    address:
      "Malang, East Java, Indonesia", // You can replace with actual address
  },
  {
    id: "a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92",
    value: "jakarta",
    label: "Kantor Jakarta",
    coords: [-6.208763, 106.845599],
    address: "Jakarta, Indonesia",
  },
  {
    id: "c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae",
    value: "surabaya",
    label: "Kantor Surabaya",
    coords: [-7.257472, 112.752088],
    address: "Surabaya, East Java, Indonesia",
  },
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

  // Whenever selectedLocation changes, update userLocation and address accordingly
  React.useEffect(() => {
    if (selectedLocation) {
      // Find location details by value
      const loc = locations.find((loc) => loc.value === selectedLocation);
      if (loc) {
        setUserLocation(loc.coords as LatLngTuple);
        setAddress(loc.address);
      }
    } else {
      // If no selected location, fallback to user's real geolocation
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
    }
  }, [selectedLocation]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAbsenceType || !selectedLocation) {
      return toast.error("Mohon lengkapi tipe absensi dan lokasi.");
    }

    if (["annual-leave", "sick-leave", "absent"].includes(selectedAbsenceType)) {
      if (!startDate || !endDate || !file) {
        return toast.error("Untuk cuti/sakit, isi tanggal dan lampirkan dokumen.");
      }
    }

    const formData = new FormData();

    const isCheckClock = !["annual-leave", "sick-leave", "absent"].includes(selectedAbsenceType);

    if (isCheckClock) {
      let check_clock_type = "";
      if (selectedAbsenceType === "clock-in") {
        check_clock_type = "1";
      } else if (selectedAbsenceType === "clock-out") {
        check_clock_type = "2";
      } else {
        check_clock_type = "1"; // default fallback
      }

      const now = new Date();
      const pad = (num: number) => num.toString().padStart(2, "0");
      const check_clock_time = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(
        now.getUTCSeconds()
      )}`;

      formData.append("check_clock_type", check_clock_type);
      formData.append("check_clock_time", check_clock_time);
    } else {
      formData.append("absence_type", selectedAbsenceType);
    }

    const selectedLocationId = locations.find((loc) => loc.value === selectedLocation)?.id || "";
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

      toast.success("Berhasil dikirim!");
      resetForm();
    } catch (err: any) {
      toast.error("Gagal mengirim: " + err.message);
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
                if (!["annual-leave", "sick-leave", "absent"].includes(val)) {
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

          {["annual-leave", "sick-leave", "absent"].includes(selectedAbsenceType) && (
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
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
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
              <MapComponent center={userLocation} markerPopupText="Lokasi Terpilih" />
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
