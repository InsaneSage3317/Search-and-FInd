"use client";

import { useState, useEffect } from "react";
import { getZoneDensity } from "@/app/actions/items";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

// Dynamically import the core map logic without SSR
const MapInner = dynamic(
  () => import("./dashboard/campus-map-inner"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full flex items-center justify-center bg-card/30">
        <LoaderPulse />
      </div>
    )
  }
);

function LoaderPulse() {
  return (
    <div className="text-center space-y-4">
      <Skeleton className="h-[400px] w-full max-w-4xl mx-auto rounded-xl" />
      <p className="text-sm text-muted-foreground animate-pulse font-medium">Initializing Campus Satellite Imagery...</p>
    </div>
  );
}

type ZoneDensity = {
  id: string;
  name: string;
  count: number;
};

export function CampusMap() {
  const [densities, setDensities] = useState<ZoneDensity[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted || loading) {
    return (
      <Card className="border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden min-h-[500px] flex items-center justify-center">
        <LoaderPulse />
      </Card>
    );
  }

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-md overflow-hidden shadow-2xl">
      <CardContent className="p-0 relative">
        <div className="absolute top-4 right-4 z-[1000] pointer-events-none">
          <div className="bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Hotspot Feed</h4>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> Low
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> Med
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> High
              </div>
            </div>
          </div>
        </div>

        {/* The actual Leaflet implementation is isolated here */}
        <MapInner densities={densities} />
      </CardContent>
    </Card>
  );
}
