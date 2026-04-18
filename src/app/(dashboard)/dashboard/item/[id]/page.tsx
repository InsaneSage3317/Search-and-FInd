import { getItemById } from "@/app/actions/items";
import { getMatchesForItem } from "@/app/actions/matches";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClaimButton } from "@/components/claim-button";
import { HandoverControls } from "@/components/handover-controls";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Clock, Tag, Shield, Zap, Sparkles,
  PackageSearch, PackagePlus, User
} from "lucide-react";
import Image from "next/image";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const [item, session] = await Promise.all([getItemById(id), auth()]);
  if (!item) notFound();

  try {
    const matches = await getMatchesForItem(id);

    // Determine if the current user owns this report
    const currentUserEmail = session?.user?.email;
    const isOwner = !!(currentUserEmail && (
      item.finder?.email === currentUserEmail || item.owner?.email === currentUserEmail
    ));

    const isLost = item.type === "LOST";
    const isFinder = item.finder?.email === currentUserEmail;
    const isOwnerClaimant = !isLost && item.owner?.email === currentUserEmail;
    const isFinderClaimant = isLost && item.finder?.email === currentUserEmail;
    const isClaimant = isOwnerClaimant || isFinderClaimant;

    const accentClasses = isLost 
      ? { text: "text-blue-400", bg: "bg-blue-500/15", ring: "ring-blue-500/20", button: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20" } 
      : { text: "text-emerald-400", bg: "bg-emerald-500/15", ring: "ring-emerald-500/20", button: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20" };

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="/dashboard/search"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{item.title}</h1>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${accentClasses.bg} ${accentClasses.text} ring-1 ${accentClasses.ring}`}>
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
            {(item.status === "MATCHED" || item.status === "RESOLVED") && (
              <HandoverControls 
                itemId={item.id}
                status={item.status}
                isFinder={isFinder}
                isClaimant={isClaimant}
              />
            )}

            {item.imageUrl && (
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden group">
                <CardContent className="p-0 relative aspect-video">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/60 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-md border border-white/10">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      Visual Reference
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{item.description}</p>
              </CardContent>
            </Card>

            {isOwner && item.identifyingDetail && (
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
                    <Tag className={`h-4 w-4 ${accentClasses.text}`} />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Category</div>
                      <div className="font-medium">{item.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className={`h-4 w-4 ${accentClasses.text}`} />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Zone</div>
                      <div className="font-medium">{item.zone.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Clock className={`h-4 w-4 ${accentClasses.text}`} />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Status</div>
                      <div className="font-medium">{item.status}</div>
                    </div>
                  </div>

                  {(item.finder || item.owner) && (
                    <div className="flex items-center gap-3 text-sm">
                      <User className={`h-4 w-4 ${accentClasses.text}`} />
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

            <ClaimButton
              itemId={item.id}
              isLost={isLost}
              status={item.status}
              isOwner={isOwner}
              buttonClass={accentClasses.button}
            />

            {isOwner && (item.status === "MATCHED" || item.status === "VERIFYING" || item.status === "HANDOVER") && (
              <Card className="border-emerald-500/20 bg-emerald-500/5 overflow-hidden">
                <CardHeader className="pb-3 border-b border-emerald-500/10">
                  <CardTitle className="flex items-center gap-2 text-sm text-emerald-400">
                    <Zap className="h-4 w-4" />
                    Handover Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-emerald-500/20 p-1.5 text-emerald-400">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Counterpart</p>
                      <p className="text-sm font-semibold truncate">
                        {isFinder ? (item.owner?.name || "The Owner") : (item.finder?.name || "The Finder")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-emerald-500/20 p-1.5 text-emerald-400">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Institute Email</p>
                      <p className="text-sm font-black text-emerald-400 selection:bg-emerald-500 selection:text-white">
                        {isFinder ? item.owner?.email : item.finder?.email}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full text-xs h-8 border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-400" asChild>
                      <a href={`mailto:${isFinder ? item.owner?.email : item.finder?.email}`}>
                        Send Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Potential Matches */}
        {matches.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              Potential Matches ({matches.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {matches.slice(0, 6).map((match) => {
                const matchedItem = isLost ? match.foundItem : match.lostItem;
                const pct = Math.round(match.score * 100);
                const scoreColor = pct >= 80 ? "text-emerald-400 bg-emerald-500/15" : pct >= 60 ? "text-amber-400 bg-amber-500/15" : "text-blue-400 bg-blue-500/15";
                return (
                  <Link key={matchedItem.id} href={`/dashboard/item/${matchedItem.id}`}>
                    <Card className="group border-border/40 bg-card/50 hover:bg-card/80 transition-all cursor-pointer h-full">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${scoreColor}`}>
                            <Zap className="h-3 w-3" /> {pct}%
                          </span>
                          <span className={`text-xs font-semibold ${isLost ? "text-emerald-400" : "text-blue-400"}`}>
                            {isLost ? "FOUND" : "LOST"}
                          </span>
                        </div>
                        <h3 className="font-semibold group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {matchedItem.title}
                        </h3>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {matchedItem.category}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {matchedItem.zoneName}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("ItemDetailPage Fetch Error:", error);
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <PackageSearch className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold italic tracking-tight text-white">Item not found or error loading</h2>
          <p className="text-sm text-muted-foreground">We couldn't retrieve the details for this item. Please try again later.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/search">Back to Search</Link>
          </Button>
        </div>
      </div>
    );
  }
}
