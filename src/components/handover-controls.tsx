"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { resolveItem, unclaimItem } from "@/app/actions/items";
import { toast } from "sonner";
import { Loader2, CheckCircle2, RotateCcw } from "lucide-react";

export function HandoverControls({
  itemId,
  status,
  isFinder,
  isClaimant,
}: {
  itemId: string;
  status: string;
  isFinder: boolean;
  isClaimant: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  if (status === "RESOLVED") {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-400">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">This item has been successfully recovered!</span>
      </div>
    );
  }

  if (status !== "MATCHED") return null;

  function handleResolve() {
    startTransition(async () => {
      const result = await resolveItem(itemId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Item marked as recovered! Thank you for using FindIt.");
      }
    });
  }

  function handleUnclaim() {
    startTransition(async () => {
      const result = await unclaimItem(itemId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Claim retracted. The item is now back in the public gallery.");
      }
    });
  }

  return (
    <div className="space-y-4 rounded-xl bg-card/30 border border-border/40 p-6 backdrop-blur-sm">
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground">Handover in Progress</h3>
        <p className="text-sm text-muted-foreground">
          {isFinder 
            ? "You've been matched with someone who claimed this item. Arrange a pickup and mark as resolved once done."
            : "You've claimed this item. Once you receive it, the finder will mark it as resolved."}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Only finder or owner can resolve */}
        {(isFinder || isClaimant) && (
          <Button 
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white" 
            onClick={handleResolve}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
            Confirm Handover (Resolved)
          </Button>
        )}

        {/* Only the person who claimed it can retract */}
        {isClaimant && (
          <Button 
            variant="ghost" 
            className="flex-1 border border-destructive/20 text-destructive hover:bg-destructive/10" 
            onClick={handleUnclaim}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
            Retract My Claim
          </Button>
        )}
      </div>
    </div>
  );
}
