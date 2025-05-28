"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

interface MapComponentProps {
  center?: LatLngTuple;
  zoom?: number;
  markerPopupText?: string;
}

const defaultCenter: LatLngTuple = [-7.9826, 112.6308];

export default function MapComponent({
  center = defaultCenter,
  zoom = 13,
  markerPopupText = "Malang",
}: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-md" // Full height & width + rounded corners
      scrollWheelZoom={false} // Prevent zoom on scroll to avoid accidental zoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>{markerPopupText}</Popup>
      </Marker>
    </MapContainer>
  );
}
