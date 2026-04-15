import { getMyItems } from "@/app/actions/items";
import { formatShortDate } from "@/lib/date-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, MapPin, Tag, PackageSearch, PackagePlus } from "lucide-react";

export default async function HistoryPage() {
  try {
    const items = await getMyItems();

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My History</h1>
          <p className="text-sm text-muted-foreground">
            Monitor your reports, track active matches, and manage your claimed items.
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="border-dashed border-border/60 bg-transparent">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No reports yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Start by reporting a lost or found item.
              </p>
              <Button className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                <Link href="/dashboard/report">Report an Item</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Link key={item.id} href={`/dashboard/item/${item.id}`}>
                <Card className="group border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border/60 transition-all cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`rounded-lg p-2.5 ${
                      item.type === "LOST" ? "bg-blue-500/15" : "bg-emerald-500/15"
                    }`}>
                      {item.type === "LOST"
                        ? <PackageSearch className="h-5 w-5 text-blue-400" />
                        : <PackagePlus className="h-5 w-5 text-emerald-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {item.category}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.zone?.name ?? "Unknown"}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        item.status === "RESOLVED" ? "text-emerald-400" : "text-muted-foreground"
                      }`}>{item.status}</span>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {formatShortDate(item.createdAt)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("HistoryPage Fetch Error:", error);
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <Clock className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold italic tracking-tight text-foreground">Something went wrong</h2>
          <p className="text-sm text-muted-foreground">Failed to load your history. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
}
