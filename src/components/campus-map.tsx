"use client";

import { useState, useEffect } from "react";
import { getZoneDensity } from "@/app/actions/items";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Info, Users, Sparkles } from "lucide-react";

type ZoneDensity = {
  id: string;
  name: string;
  count: number;
};

export function CampusMap() {
  const [densities, setDensities] = useState<ZoneDensity[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDensity() {
      try {
        const data = await getZoneDensity();
        setDensities(data);
      } catch (e) {
        console.error("Failed to fetch zone density", e);
      } finally {
        setLoading(false);
      }
    }
    fetchDensity();
  }, []);

  const getHeatColor = (count: number) => {
    if (count === 0) return "fill-slate-800/40 text-slate-500 stroke-slate-700";
    if (count <= 2) return "fill-emerald-500/20 text-emerald-400 stroke-emerald-500/40";
    if (count <= 5) return "fill-amber-500/30 text-amber-400 stroke-amber-500/50";
    return "fill-rose-500/40 text-rose-400 stroke-rose-500/60";
  };

  if (loading) {
    return (
      <Card className="border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-12 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  // Find density for a zone name
  const findDensity = (name: string) => densities.find(d => d.name === name) || { count: 0 };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <Card className="lg:col-span-3 border-border/40 bg-card/50 backdrop-blur-md overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-border/40 flex items-center justify-between bg-emerald-500/5">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Campus Item Heatmap</h2>
              <p className="text-sm text-muted-foreground italic">Interactive visualization of reported item density across NIT Silchar.</p>
            </div>
            <div className="flex gap-2 text-xs font-medium">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-800/40 border border-border/40 text-slate-400">Low</span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400">High</span>
            </div>
          </div>
          
          <div className="relative p-8 bg-gradient-to-b from-transparent to-emerald-500/5">
            {/* SVG MAP */}
            <svg viewBox="0 0 800 500" className="w-full h-auto drop-shadow-2xl">
              {/* Defs for gradients/shadows */}
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Background Lines (Stylized) */}
              <path d="M0 100 H800 M0 200 H800 M0 300 H800 M0 400 H800 M100 0 V500 M200 0 V500 M300 0 V500 M400 0 V500 M500 0 V500 M600 0 V500 M700 0 V500" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/10" />

              {/* Main Building Group */}
              <ZonePolygon 
                name="Admin Block" d="M350 50 H450 V120 H350 Z" 
                info={findDensity("Admin Block")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              
              {/* Department Row */}
              <ZonePolygon 
                name="CSE Department" d="M100 80 H220 V150 H100 Z" 
                info={findDensity("CSE Department")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="ECE Department" d="M230 80 H340 V150 H230 Z" 
                info={findDensity("ECE Department")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="EE Department" d="M460 80 H570 V150 H460 Z" 
                info={findDensity("EE Department")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="ME Department" d="M580 80 H690 V150 H580 Z" 
                info={findDensity("ME Department")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />

              {/* Central Hub */}
              <ZonePolygon 
                name="Main Library" d="M360 180 H440 V240 H360 Z" 
                info={findDensity("Main Library")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Central Canteen" d="M250 200 H340 V260 H250 Z" 
                info={findDensity("Central Canteen")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Auditorium" d="M460 200 H550 V260 H460 Z" 
                info={findDensity("Auditorium")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />

              {/* Hostels (Simplified Grid) */}
              <ZonePolygon 
                name="Hostel 1" d="M100 320 H180 V380 H100 Z" 
                info={findDensity("Hostel 1")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Hostel 2" d="M190 320 H270 V380 H190 Z" 
                info={findDensity("Hostel 2")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Hostel 3" d="M280 320 H360 V380 H280 Z" 
                info={findDensity("Hostel 3")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Hostel 4" d="M370 320 H450 V380 H370 Z" 
                info={findDensity("Hostel 4")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Hostel 5" d="M460 320 H540 V380 H460 Z" 
                info={findDensity("Hostel 5")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Hostel 6" d="M550 320 H630 V380 H550 Z" 
                info={findDensity("Hostel 6")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Hostel 7" d="M100 400 H180 V460 H100 Z" 
                info={findDensity("Hostel 7")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Hostel 8" d="M190 400 H270 V460 H190 Z" 
                info={findDensity("Hostel 8")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />

              {/* Sports & Gate */}
              <ZonePolygon 
                name="Gym & Sports Complex" d="M640 320 H750 V460 H640 Z" 
                info={findDensity("Gym & Sports Complex")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
              <ZonePolygon 
                name="Main Gate" d="M350 460 H450 V495 H350 Z" 
                info={findDensity("Main Gate")} onHover={setHoveredZone} currentHover={hoveredZone} color={getHeatColor} 
              />
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredZone && (
              <div className="absolute top-10 right-10 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/80 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-200 z-10 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-sm truncate">{hoveredZone}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Active Reports</div>
                  <div className="text-2xl font-black text-white flex items-center gap-2">
                    {findDensity(hoveredZone).count}
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sidebar Stats */}
      <div className="space-y-6">
        <Card className="border-border/40 bg-card/40 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Info className="h-4 w-4 text-emerald-400" />
              Zone Insights
            </h3>
            <div className="space-y-3">
              {densities.filter(d => d.count > 0).sort((a,b) => b.count - a.count).slice(0, 5).map(z => (
                <div key={z.id} className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-sm font-medium truncate pr-2">{z.name}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    {z.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>Live reports from active users</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="p-6">
            <p className="text-xs text-emerald-400 font-medium italic">
              "The density map is updated in real-time. Hover over a building to see detailed counts."
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ZonePolygon({ 
  name, d, info, onHover, currentHover, color 
}: { 
  name: string, d: string, info: any, onHover: (n: string | null) => void, currentHover: string | null, color: (c: number) => string 
}) {
  const isHovered = currentHover === name;
  const heatColor = color(info.count);

  return (
    <g 
      onMouseEnter={() => onHover(name)} 
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer transition-all duration-300"
    >
      <path
        d={d}
        className={`${heatColor} transition-all duration-300 ${isHovered ? 'brightness-125 stroke-2' : 'stroke-1'}`}
        style={{ filter: isHovered ? 'url(#glow)' : 'none' }}
      />
      {/* Dynamic Text Labels for larger blocks or hovered */}
      {(isHovered || info.count > 5) && (
        <text 
          className="text-[10px] font-bold fill-white pointer-events-none drop-shadow-md transition-opacity"
          // Very simple center calculation for rectangles
          x={parseInt(d.split(' ')[0].substring(1)) + 5}
          y={parseInt(d.split(' ')[1]) + 15}
        >
          {info.count > 0 ? info.count : ""}
        </text>
      )}
    </g>
  );
}
