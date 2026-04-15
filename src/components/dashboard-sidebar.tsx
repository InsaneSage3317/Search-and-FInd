"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  History, 
  Map, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Report Item", href: "/dashboard/report", icon: PlusCircle },
  { name: "Search Items", href: "/dashboard/search", icon: Search },
  { name: "My History", href: "/dashboard/history", icon: History },
  { name: "Campus Map", href: "/dashboard/map", icon: Map },
];

const secondaryNavigation = [
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "user@nits.ac.in",
    initials: session?.user?.name?.split(" ").map(n => n[0]).join("") || "U",
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-border/40 bg-card/30 backdrop-blur-xl">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <span className="text-lg font-bold">Find<span className="text-emerald-400">It</span></span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-400" : "group-hover:text-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto space-y-1">
          <Separator className="my-4 opacity-40" />
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-400" : "group-hover:text-foreground")} />
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4 shrink-0 group-hover:text-destructive" />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 ring-1 ring-border/40">
          <Avatar className="h-9 w-9 border border-border/40">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 text-xs font-bold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-semibold text-foreground">{user.name}</span>
            <span className="truncate text-[10px] text-muted-foreground uppercase tracking-wider font-medium">NIT Silchar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
