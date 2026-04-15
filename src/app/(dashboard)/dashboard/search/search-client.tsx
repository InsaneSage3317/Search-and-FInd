"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";
import {
  Search, Filter, MapPin, Clock, Tag,
  PackageSearch, PackagePlus, X
} from "lucide-react";

type Zone = { id: string; name: string };
type Item = {
  id: string;
  title: string;
  description: string;
  type: "LOST" | "FOUND";
  status: string;
  category: string;
  createdAt: string | Date;
  zone: { id: string; name: string };
  finder?: { name: string | null; email: string | null } | null;
  owner?: { name: string | null; email: string | null } | null;
};

export function SearchPageClient({
  initialItems,
  zones,
}: {
  initialItems: Item[];
  zones: Zone[];
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"" | "LOST" | "FOUND">("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");

  const filtered = initialItems.filter((item) => {
    if (typeFilter && item.type !== typeFilter) return false;
    if (categoryFilter && item.category !== categoryFilter) return false;
    if (zoneFilter && item.zone.id !== zoneFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const hasFilters = search || typeFilter || categoryFilter || zoneFilter;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search Items</h1>
        <p className="text-sm text-muted-foreground">
          Browse all reported lost and found items across NIT Silchar campus.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Type filter */}
          <div className="flex rounded-lg border border-border/40 bg-card/30 p-0.5">
            <button
              onClick={() => setTypeFilter("")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                !typeFilter ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >All</button>
            <button
              onClick={() => setTypeFilter("LOST")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                typeFilter === "LOST" ? "bg-blue-500/20 text-blue-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >Lost</button>
            <button
              onClick={() => setTypeFilter("FOUND")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                typeFilter === "FOUND" ? "bg-emerald-500/20 text-emerald-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >Found</button>
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-8 rounded-lg border border-border/40 bg-card/30 px-2 text-xs text-foreground"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Zone filter */}
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="h-8 rounded-lg border border-border/40 bg-card/30 px-2 text-xs text-foreground"
          >
            <option value="">All Zones</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>{z.name}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setTypeFilter(""); setCategoryFilter(""); setZoneFilter(""); }}
              className="flex items-center gap-1 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive hover:bg-destructive/20 transition-colors"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-transparent">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <PackageSearch className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No items found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm text-center">
              {hasFilters
                ? "Try adjusting your filters or search query."
                : "No items have been reported yet. Be the first to report!"}
            </p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
              <Link href="/dashboard/report">Report an Item</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Link key={item.id} href={`/dashboard/item/${item.id}`}>
              <Card className="group border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:border-border/60 hover:shadow-lg cursor-pointer h-full">
                <CardContent className="p-5 space-y-3">
                  {/* Type badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.type === "LOST"
                        ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20"
                        : "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20"
                    }`}>
                      {item.type === "LOST" ? <PackageSearch className="h-3 w-3" /> : <PackagePlus className="h-3 w-3" />}
                      {item.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      {item.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {item.zone.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Showing {filtered.length} of {initialItems.length} items
      </p>
    </div>
  );
}
