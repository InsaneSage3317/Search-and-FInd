"use client";

import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

type ZoneDensity = {
  id: string;
  name: string;
  count: number;
};

const ZONE_COORDS: Record<string, [number, number]> = {
  "Library": [24.7584, 92.7918],
  "Gymkhana": [24.7578, 92.7932],
  "Hostel 9": [24.7550, 92.7910],
  "CS Dept": [24.7598, 92.7915],
  "Lecture Hall": [24.7592, 92.7905],
  "Admin Building": [24.7602, 92.7928],
  "Main Gate": [24.7615, 92.7935],
  "CSE Department": [24.7598, 92.7915],
  "Main Library": [24.7584, 92.7918],
};

interface CampusMapInnerProps {
  densities: ZoneDensity[];
}

export default function CampusMapInner({ densities }: CampusMapInnerProps) {
  const center: LatLngExpression = [24.7591, 92.7925];

  return (
    <div className="h-[500px] w-full">
      <MapContainer 
        center={center} 
        zoom={16} 
        scrollWheelZoom={false}
        className="h-full w-full grayscale-[20%] contrast-[110%] brightness-[90%]"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri &mdash; Source: Esri et al."
        />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap'
        />

        {densities.map((zone: ZoneDensity) => {
          const coords = (ZONE_COORDS[zone.name] || [24.7591, 92.7925]) as LatLngExpression;
          const radius = 20 + (zone.count * 15);
          const color = zone.count === 0 ? "#10b98120" : zone.count < 3 ? "#10b981" : zone.count < 6 ? "#f59e0b" : "#ef4444";
          
          return (
            <Circle
              key={zone.id}
              center={coords}
              radius={radius}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.4,
                color: color,
                weight: 2,
                dashArray: '5, 10'
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-sm text-slate-900">{zone.name}</h3>
                  <p className="text-xs mt-1 text-slate-600">
                    <span className="font-bold text-emerald-600">{zone.count}</span> active reports
                  </p>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </div>
  );
}
