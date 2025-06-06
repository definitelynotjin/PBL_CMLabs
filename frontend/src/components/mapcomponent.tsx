"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  center: LatLngTuple;
  markerPopupText?: string;
}

// Custom icon bulat merah untuk lokasi saat ini
const currentLocationIcon = new L.DivIcon({
  html: `<div style="
    background: red;
    border: 2px solid white;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(255,0,0,0.3);
  "></div>`,
  className: "",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export default function MapComponent({
  center,
  markerPopupText = "Lokasi Anda Saat Ini",
}: MapComponentProps) {
  const [userPosition, setUserPosition] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        () => {
          setUserPosition(center);
        }
      );
    } else {
      setUserPosition(center);
    }
  }, [center]);

  return (
    <div className="h-full w-full rounded-md overflow-hidden">
      {userPosition && (
        <MapContainer
          center={userPosition}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full rounded-md z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userPosition} icon={currentLocationIcon}>
            <Popup>{markerPopupText}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
