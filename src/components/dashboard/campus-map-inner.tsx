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
  "Main Library": [24.757300789664882, 92.78884278265942],
  "Hostel 1": [24.757874631860393, 92.7865694676855],
  "Hostel 2": [24.75743291138541, 92.78659817499914],
  "Hostel 3": [24.758044078315347, 92.7875184040324],
  "Hostel 4": [24.75908075755827, 92.78768131405705],
  "Hostel 5": [24.75995984050992, 92.7880561040387],
  "Hostel 6": [24.759514267066468, 92.78385177259703],
  "Hostel 7": [24.759368128385027, 92.78254285463912],
  "Hostel 8": [24.75916980142854, 92.78772686960363],
  "Admin Block": [24.758522988636486, 92.79431454747248],
  "CSE Department": [24.757210609191027, 92.79017235519935],
  "ECE Department": [24.757210609191027, 92.79017235519935],
  "EE Department": [24.757131383742923, 92.79245966461396],
  "ME Department": [24.758547100461758, 92.79184516360691],
  "Civil Department": [24.75629701626236, 92.79244896135299],
  "Gym & Sports Complex": [24.757403026782836, 92.7839548991966],
  "SAC": [24.75680401490886, 92.78896935163247],

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
        {/* Google Maps Hybrid (Satellite with Labels) */}
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          attribution="&copy; Google Maps"
        />

        {densities.map((zone: ZoneDensity) => {
          const coords = (ZONE_COORDS[zone.name] || [24.7591, 92.7925]) as LatLngExpression;
          const radius = 12 + (zone.count * 8); // Smaller heat zone circles
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
