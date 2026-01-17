'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Cinema } from '@/lib/cinemas';

// Fix for default marker icons in Next.js
const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface CinemaMapProps {
  cinemas: Cinema[];
  center: [number, number];
  zoom?: number;
}

/**
 * Component to fit map bounds to all markers
 */
function FitBounds({ cinemas }: { cinemas: Cinema[] }) {
  const map = useMap();

  useEffect(() => {
    if (cinemas.length > 0) {
      const bounds = L.latLngBounds(
        cinemas.map((cinema) => [cinema.lat, cinema.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, cinemas]);

  return null;
}

/**
 * Cinema map component using Leaflet
 */
export default function CinemaMap({ cinemas, center, zoom = 13 }: CinemaMapProps) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-200/60 shadow-soft-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cinemas.map((cinema) => (
          <Marker key={cinema.id} position={[cinema.lat, cinema.lng]}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-sm mb-1 text-slate-900">{cinema.name}</h3>
                <p className="text-xs text-slate-600">{cinema.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <FitBounds cinemas={cinemas} />
      </MapContainer>
    </div>
  );
}
