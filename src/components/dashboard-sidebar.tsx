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
    <div className="flex h-full w-72 flex-col bg-[#F9FAFB] text-[#111827] border-r border-[#E5E7EB]">
      <div className="flex h-24 shrink-0 items-center px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#10B981] text-white">
            <Search className="h-6 w-6" strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#111827]">FindIt</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col px-6 py-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-primary-foreground" : "text-sidebar-foreground group-hover:text-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto space-y-2">
          <div className="px-5 py-6 text-[11px] font-black uppercase tracking-[0.25em] text-foreground/20">
            System
          </div>
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-primary-foreground" : "text-sidebar-foreground group-hover:text-foreground")} />
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group mt-4 flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold text-destructive/70 transition-all hover:bg-destructive/5 hover:text-destructive"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="p-8">
        <div className="flex items-center gap-4 rounded-3xl border border-sidebar-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <Avatar className="h-11 w-11 shadow-inner border-2 border-background">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-black uppercase">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-black text-foreground tracking-tight">{user.name}</span>
            <span className="truncate text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Campus User</span>
          </div>
        </div>
      </div>
    </div>
  );
}
