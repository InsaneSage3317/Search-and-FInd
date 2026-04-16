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
    initials: session?.user?.name?.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2) || "U",
  };

  return (
    <div className="flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-20 shrink-0 items-center px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <svg className="h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">FindIt</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-6">
        <div className="space-y-1.5 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/10" 
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto space-y-1.5 px-2">
          <div className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/30">
            System
          </div>
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/10" 
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground")} />
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-destructive/80 transition-all hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5 shrink-0 transition-colors" />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-6">
        <div className="flex items-center gap-3 rounded-2xl bg-sidebar-accent px-4 py-4 ring-1 ring-sidebar-border transition-colors hover:bg-sidebar-accent/80">
          <Avatar className="h-10 w-10 ring-2 ring-sidebar-border ring-offset-2 ring-offset-sidebar">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold uppercase">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-bold text-sidebar-foreground tracking-tight">{user.name}</span>
            <span className="truncate text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">Campus User</span>
          </div>
        </div>
      </div>
    </div>
  );
}
