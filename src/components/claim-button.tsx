"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { claimItem } from "@/app/actions/items";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ClaimButton({
  itemId,
  isLost,
  status,
  isOwner,
  buttonClass,
}: {
  itemId: string;
  isLost: boolean;
  status: string;
  isOwner: boolean;
  buttonClass: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [claimed, setClaimed] = useState(false);

  const isAlreadyClaimed = status === "MATCHED" || status === "RESOLVED" || status === "HANDOVER";

  if (isOwner) {
    return (
      <Button className={`w-full h-11 ${buttonClass}`} disabled>
        Your Report
      </Button>
    );
  }

  if (isAlreadyClaimed || claimed) {
    return (
      <Button className="w-full h-11 bg-muted text-muted-foreground" disabled>
        <CheckCircle2 className="mr-2 h-4 w-4" />
        {claimed ? "Claim Submitted!" : "Already Claimed"}
      </Button>
    );
  }

  function handleClaim() {
    startTransition(async () => {
      const result = await claimItem(itemId);
      if (result.error) {
        toast.error(result.error);
      } else {
        setClaimed(true);
        toast.success(
          isLost
            ? "You've reported finding this item! The owner will be notified."
            : "You've claimed this item! The finder will be notified."
        );
      }
    });
  }

  return (
    <Button
      className={`w-full h-11 shadow-lg ${buttonClass} text-white`}
      onClick={handleClaim}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : isLost ? (
        "I Found This Item"
      ) : (
        "This Is Mine"
      )}
    </Button>
  );
}
