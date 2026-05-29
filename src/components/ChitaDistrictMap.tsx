"use client";

import { useEffect } from "react";
import { MapContainer, Polygon, Popup, TileLayer, useMap } from "react-leaflet";
import {
  CHITA_MAP_CENTER,
  CHITA_MAP_ZOOM,
  SERVICE_DISTRICTS,
} from "@/lib/chita-districts";
import "leaflet/dist/leaflet.css";

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const t = window.setTimeout(() => map.invalidateSize(), 200);
    return () => window.clearTimeout(t);
  }, [map]);
  return null;
}

export function ChitaDistrictMap() {
  return (
    <MapContainer
      center={CHITA_MAP_CENTER}
      zoom={CHITA_MAP_ZOOM}
      className="h-full w-full min-h-[320px] z-0"
      scrollWheelZoom={false}
    >
      <MapResizeFix />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {SERVICE_DISTRICTS.map((district) => (
        <Polygon
          key={district.id}
          positions={district.polygon}
          pathOptions={{
            color: district.color,
            fillColor: district.color,
            fillOpacity: district.fillOpacity,
            weight: 2,
            opacity: 0.9,
          }}
        >
          <Popup>
            <span className="font-semibold">{district.name}</span>
            <br />
            <span className="text-sm">Выкуп iPhone — выезд за 30 мин</span>
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}
