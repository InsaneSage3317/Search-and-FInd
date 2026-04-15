import { getMyMatches } from "@/app/actions/matches";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Zap, MapPin, Clock, ArrowRight, Sparkles,
  PackageSearch, PackagePlus, Tag, Bell
} from "lucide-react";

function ScoreBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 80 ? "text-emerald-400 bg-emerald-500/15 ring-emerald-500/30" :
    pct >= 60 ? "text-amber-400 bg-amber-500/15 ring-amber-500/30" :
               "text-blue-400 bg-blue-500/15 ring-blue-500/30";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${color}`}>
      <Zap className="h-3 w-3" />
      {pct}% Match
    </span>
  );
}

export default async function NotificationsPage() {
  const matches = await getMyMatches();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-emerald-400" />
            Smart Matches
          </h1>
          <p className="text-sm text-muted-foreground">
            Our matching engine automatically finds potential matches for your items.
          </p>
        </div>
        {matches.length > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
            <Bell className="h-3 w-3" />
            {matches.length} match{matches.length !== 1 ? "es" : ""}
          </span>
        )}
      </div>

      {/* Score Legend */}
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3 text-emerald-400" /> Text similarity (60%)
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-amber-400" /> Zone match (25%)
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-blue-400" /> Time proximity (15%)
        </span>
      </div>

      {matches.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-transparent">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No matches yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm text-center">
              When you report items, our engine will automatically scan for potential matches.
              Report an item to get started!
            </p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
              <Link href="/dashboard/report">Report an Item</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {matches.map((match, i) => (
            <Card key={`${match.lostItemId}-${match.foundItemId}`}
              className="border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all overflow-hidden">
              <CardContent className="p-0">
                {/* Score header */}
                <div className="flex items-center justify-between border-b border-border/30 bg-card/30 px-5 py-3">
                  <ScoreBadge score={match.score} />
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Text: {Math.round(match.textScore * 100)}%</span>
                    <span>Zone: {match.zoneScore === 1 ? "✓" : "✗"}</span>
                    <span>Time: {Math.round(match.temporalScore * 100)}%</span>
                  </div>
                </div>

                {/* Match pair */}
                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 p-5">
                  {/* Lost Item */}
                  <Link href={`/dashboard/item/${match.lostItemId}`} className="group space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                      <PackageSearch className="h-3 w-3" /> LOST
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                      {match.lostItem.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Tag className="h-3 w-3" /> {match.lostItem.category}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {match.lostItem.zoneName}
                    </div>
                  </Link>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="rounded-full bg-emerald-500/10 p-2">
                      <ArrowRight className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>

                  {/* Found Item */}
                  <Link href={`/dashboard/item/${match.foundItemId}`} className="group space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <PackagePlus className="h-3 w-3" /> FOUND
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {match.foundItem.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Tag className="h-3 w-3" /> {match.foundItem.category}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {match.foundItem.zoneName}
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
