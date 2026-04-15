"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createItem } from "@/app/actions/items";
import { CATEGORIES } from "@/lib/constants";
import { getZones } from "@/app/actions/zones";
import { toast } from "sonner";
import { 
  MapPin, Tag, FileText, Shield, ArrowLeft, Loader2, 
  PackageSearch, PackagePlus 
} from "lucide-react";
import Link from "next/link";

type Zone = { id: string; name: string };

import { Suspense } from "react";

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <ReportPageContent />
    </Suspense>
  );
}

function ReportPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type")?.toUpperCase() === "FOUND" ? "FOUND" : "LOST";

  const [type, setType] = useState<"LOST" | "FOUND">(initialType as "LOST" | "FOUND");
  const [zones, setZones] = useState<Zone[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getZones()
      .then(setZones)
      .catch(() => toast.error("Failed to load campus zones"));
  }, []);

  async function handleSubmit(formData: FormData) {
    formData.set("type", type);
    startTransition(async () => {
      const result = await createItem(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(type === "LOST" ? "Lost item reported!" : "Found item reported!");
        router.push("/dashboard/search");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report an Item</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details to report a lost or found item on campus.
          </p>
        </div>
      </div>

      {/* Type Toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setType("LOST")}
          className={`group flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
            type === "LOST"
              ? "border-blue-500/60 bg-blue-500/10 ring-1 ring-blue-500/20"
              : "border-border/40 bg-card/30 hover:border-border/60"
          }`}
        >
          <div className={`rounded-lg p-2 ${type === "LOST" ? "bg-blue-500/20" : "bg-muted"}`}>
            <PackageSearch className={`h-5 w-5 ${type === "LOST" ? "text-blue-400" : "text-muted-foreground"}`} />
          </div>
          <div>
            <div className={`font-semibold ${type === "LOST" ? "text-blue-400" : "text-foreground"}`}>I Lost Something</div>
            <div className="text-xs text-muted-foreground">Create a report for your missing item</div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setType("FOUND")}
          className={`group flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
            type === "FOUND"
              ? "border-emerald-500/60 bg-emerald-500/10 ring-1 ring-emerald-500/20"
              : "border-border/40 bg-card/30 hover:border-border/60"
          }`}
        >
          <div className={`rounded-lg p-2 ${type === "FOUND" ? "bg-emerald-500/20" : "bg-muted"}`}>
            <PackagePlus className={`h-5 w-5 ${type === "FOUND" ? "text-emerald-400" : "text-muted-foreground"}`} />
          </div>
          <div>
            <div className={`font-semibold ${type === "FOUND" ? "text-emerald-400" : "text-foreground"}`}>I Found Something</div>
            <div className="text-xs text-muted-foreground">Help someone get their item back</div>
          </div>
        </button>
      </div>

      {/* Form */}
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Item Details
          </CardTitle>
          <CardDescription>Provide as much detail as possible for better matching.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Item Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Black Samsung Earbuds, Blue Water Bottle"
                required
                className="bg-background"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                <Tag className="mr-1 inline h-3.5 w-3.5" />
                Category *
              </Label>
              <select
                id="category"
                name="category"
                required
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60"
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Zone */}
            <div className="space-y-2">
              <Label htmlFor="zoneId">
                <MapPin className="mr-1 inline h-3.5 w-3.5" />
                Campus Zone *
              </Label>
              <select
                id="zoneId"
                name="zoneId"
                required
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60"
              >
                <option value="">Where was it {type === "LOST" ? "last seen" : "found"}?</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                name="description"
                placeholder={`Describe the item in detail — color, brand, size, any distinctive marks...`}
                required
                rows={4}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60 resize-none"
              />
            </div>

            {/* Identifying Detail (Secret) */}
            <div className="space-y-2">
              <Label htmlFor="identifyingDetail">
                <Shield className="mr-1 inline h-3.5 w-3.5" />
                Secret Identifying Detail
              </Label>
              <Input
                id="identifyingDetail"
                name="identifyingDetail"
                placeholder="e.g., Scratch on the left side, sticker on back"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                This hidden detail helps verify ownership. Only you and admins can see this.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className={`w-full h-11 shadow-lg transition-all ${
                type === "LOST"
                  ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                  : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
              } text-white`}
            >
              {isPending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
              ) : (
                `Report ${type === "LOST" ? "Lost" : "Found"} Item`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
