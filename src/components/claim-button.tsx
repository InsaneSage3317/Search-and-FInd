"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { verifyAndClaimItem } from "@/app/actions/items";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Lock, X } from "lucide-react";

export function ClaimButton({
  itemId,
  isLost,
  status,
  isOwner,
  buttonClass,
  verificationQuestion,
}: {
  itemId: string;
  isLost: boolean;
  status: string;
  isOwner: boolean;
  buttonClass: string;
  verificationQuestion?: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [claimed, setClaimed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState("");

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

  function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) return toast.error("Please enter an identifying detail.");
    
    startTransition(async () => {
      const result = await verifyAndClaimItem(itemId, answer);
      if (result.error) {
        toast.error(result.error);
        // Do not close modal on error so they can try again or cancel
      } else {
        setClaimed(true);
        setShowModal(false);
        toast.success(
          isLost
            ? "Verification passed! You've reported finding this item! The owner will be notified."
            : "Verification passed! You've claimed this item! The finder will be notified."
        );
      }
    });
  }

  return (
    <>
      <Button
        className={`w-full h-11 shadow-lg ${buttonClass} text-white`}
        onClick={() => setShowModal(true)}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Opening...
          </>
        ) : isLost ? (
          "I Found This Item"
        ) : (
          "This Is Mine"
        )}
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-border/10 bg-muted/40">
              <div className="flex items-center gap-2 text-emerald-500">
                <Lock className="w-5 h-5" />
                <h3 className="font-semibold text-foreground">Verification Gateway</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                disabled={isPending}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                To prevent fraudulent claims, the person who reported this item provided a secret identifying detail that isn't shown publicly.
              </p>
              
              <div className="space-y-2">
                <label htmlFor="answer" className="text-sm font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20 block">
                  {verificationQuestion || "What is a unique or hidden detail about this item?"}
                </label>
                <input
                  id="answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="e.g., A spiderman sticker on the bottom..."
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-11" 
                  onClick={() => setShowModal(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Checking...
                    </>
                  ) : "Verify & Claim"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
