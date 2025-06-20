'use client';

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  center: LatLngTuple;
  markerPopupText?: string;
}

// Custom red circle icon for the marker
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
  markerPopupText = "Lokasi Terpilih",
}: MapComponentProps) {
  return (
    <div className="h-full w-full rounded-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full rounded-md z-0"
        key={`${center[0]}-${center[1]}`} // force remount when center changes to recenter map
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={currentLocationIcon}>
          <Popup>{markerPopupText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
