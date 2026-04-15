import { getItemById } from "@/app/actions/items";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Clock, Tag, Shield,
  PackageSearch, PackagePlus, User
} from "lucide-react";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItemById(id);
  if (!item) notFound();

  const isLost = item.type === "LOST";
  const accentColor = isLost ? "blue" : "emerald";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/dashboard/search"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{item.title}</h1>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isLost
                ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20"
                : "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20"
            }`}>
              {isLost ? <PackageSearch className="h-3 w-3" /> : <PackagePlus className="h-3 w-3" />}
              {item.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Reported {new Date(item.createdAt).toLocaleDateString("en-IN", {
              weekday: "long", year: "numeric", month: "long", day: "numeric"
            })}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{item.description}</p>
            </CardContent>
          </Card>

          {item.identifyingDetail && (
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-amber-400">
                  <Shield className="h-5 w-5" />
                  Identifying Detail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  &ldquo;{item.identifyingDetail}&rdquo;
                </p>
                <p className="mt-2 text-xs text-amber-400/60">
                  Only visible to the reporter and admins for verification.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-5 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Tag className={`h-4 w-4 text-${accentColor}-400`} />
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Category</div>
                    <div className="font-medium">{item.category}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <MapPin className={`h-4 w-4 text-${accentColor}-400`} />
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Zone</div>
                    <div className="font-medium">{item.zone.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock className={`h-4 w-4 text-${accentColor}-400`} />
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Status</div>
                    <div className="font-medium">{item.status}</div>
                  </div>
                </div>

                {(item.finder || item.owner) && (
                  <div className="flex items-center gap-3 text-sm">
                    <User className={`h-4 w-4 text-${accentColor}-400`} />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {isLost ? "Reported by" : "Found by"}
                      </div>
                      <div className="font-medium">
                        {(isLost ? item.owner?.name : item.finder?.name) || "Anonymous"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Button
            className={`w-full h-11 shadow-lg ${
              isLost
                ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
            } text-white`}
          >
            {isLost ? "I Found This Item" : "This Is Mine"}
          </Button>
        </div>
      </div>
    </div>
  );
}
