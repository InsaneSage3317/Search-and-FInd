import { CampusMap } from "@/components/campus-map";

export default function MapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campus Visualization</h1>
        <p className="text-sm text-muted-foreground">
          Identify lost and found hotspots across NIT Silchar campus in real-time.
        </p>
      </div>

      <CampusMap />

      <div className="rounded-xl border border-border/40 bg-card/30 p-6">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Legend
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-emerald-500/20" />
              <span className="text-xs font-medium">Safe Zone (0-2 reports)</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Low activity or items are being recovered quickly.</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-amber-500/30" />
              <span className="text-xs font-medium">Moderate (3-5 reports)</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Common areas with occasional lost items.</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-rose-500/40" />
              <span className="text-xs font-medium">Active Hotspot (5+ reports)</span>
            </div>
            <p className="text-[10px] text-muted-foreground">High traffic areas. Be vigilant or check here first!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
