import { 
  PlusCircle, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  PackageSearch,
  PackagePlus,
  MapPin,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDashboardStats, getRecentActivity } from "@/app/actions/items";
import { auth } from "@/auth";
import { formatShortDate } from "@/lib/date-utils";

export default async function DashboardPage() {
  try {
    const [stats, recentItems, session] = await Promise.all([
      getDashboardStats(),
      getRecentActivity(),
      auth(),
    ]);

    const userName = session?.user?.name 
      ? session.user.name.split(" ").filter(Boolean)[0] 
      : "Finder";

    const statCards = [
      { name: "Reported Items", value: String(stats.reported), icon: Clock, color: "text-blue-400" },
      { name: "Active Matches", value: String(stats.matches), icon: AlertCircle, color: "text-amber-400" },
      { name: "Items Recovered", value: String(stats.recovered), icon: CheckCircle2, color: "text-emerald-400" },
    ];

    return (
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black tracking-tight text-foreground">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground text-xl font-medium tracking-tight">
            Manage your campus reports and help find lost belongings across NIT Silchar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-8 sm:grid-cols-3">
          {statCards.map((stat) => (
            <Card key={stat.name} className="shadow-md hover:shadow-xl transition-all border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-4 p-8">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">{stat.name}</CardTitle>
                <div className="rounded-2xl bg-primary/5 p-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-10 sm:grid-cols-2">
          <Card className="relative overflow-hidden border-none bg-card shadow-lg hover:shadow-2xl transition-all group/action p-4">
            <div className="absolute right-[-30px] top-[-30px] opacity-[0.03] group-hover/action:opacity-[0.07] group-hover/action:scale-110 transition-all">
              <PlusCircle className="h-56 w-56 text-primary" />
            </div>
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-3xl font-black tracking-tight">I found something</CardTitle>
              <CardDescription className="text-lg font-medium text-muted-foreground/70">
                Help your fellow student by reporting an item you found on campus.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0">
              <Button className="h-14 px-10 text-lg font-black" asChild>
                <Link href="/dashboard/report?type=found">
                  <PlusCircle className="mr-3 h-6 w-6" />
                  Report Found Item
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none bg-card shadow-lg hover:shadow-2xl transition-all group/action p-4">
            <div className="absolute right-[-30px] top-[-30px] opacity-[0.03] group-hover/action:opacity-[0.07] group-hover/action:scale-110 transition-all">
              <Search className="h-56 w-56 text-foreground" />
            </div>
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-3xl font-black tracking-tight">I lost something</CardTitle>
              <CardDescription className="text-lg font-medium text-muted-foreground/70">
                Create a detailed report of your lost item for our matching engine.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0">
              <Button variant="outline" className="h-14 px-10 text-lg font-black border-2" asChild>
                <Link href="/dashboard/report?type=lost">
                  <Search className="mr-3 h-6 w-6" />
                  Report Lost Item
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {recentItems.length === 0 ? (
          <Card className="border-dashed border-2 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted/50 p-6 mb-6">
                <Clock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">No recent activity yet</h3>
              <p className="text-muted-foreground max-w-sm text-center mt-2">
                Your reported items and active matches will appear here once you start using the system.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
              <Button variant="ghost" className="text-primary font-bold" asChild>
                <Link href="/dashboard/history">View all history <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-6">
              {recentItems.map((item) => {
                const isLost = item.type === "LOST";
                return (
                  <Link key={item.id} href={`/dashboard/item/${item.id}`}>
                    <Card className="group border-none bg-card hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-lg">
                      <CardContent className="flex items-center gap-8 p-8">
                        <div className={`rounded-3xl p-5 ${isLost ? "bg-sidebar-accent" : "bg-primary/10"}`}>
                          {isLost 
                            ? <PackageSearch className="h-7 w-7 text-sidebar-foreground" />
                            : <PackagePlus className="h-7 w-7 text-primary" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-xl truncate group-hover:text-primary transition-colors leading-tight tracking-tight">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-5 mt-2 text-sm text-muted-foreground font-bold">
                            <span className={`px-3 py-1 rounded-xl text-[11px] uppercase tracking-widest ${isLost ? "bg-sidebar-accent text-sidebar-foreground" : "bg-primary/10 text-primary"}`}>
                              {item.type}
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary/40" /> {item.zone?.name ?? "Unknown"}
                            </span>
                            <span>
                              {formatShortDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className={`text-[11px] font-black px-4 py-1.5 rounded-2xl uppercase tracking-[0.1em] ${
                            item.status === "MATCHED" ? "bg-amber-100 text-amber-700" :
                            item.status === "RESOLVED" ? "bg-emerald-100 text-emerald-800" :
                            "bg-slate-100 text-slate-600"
                          }`}>
                            {item.status}
                          </span>
                          <div className="rounded-2xl bg-sidebar-accent p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <ArrowRight className="h-5 w-5" />
                          </div>
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
    console.error("DashboardPage Fetch Error:", error);
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Finder!</h1>
          <p className="text-muted-foreground">
            Track your reported items and search for lost belongings across NIT Silchar.
          </p>
        </div>
        <Card className="border-dashed border-border/60 bg-transparent">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-destructive/10 p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
            <p className="text-sm text-muted-foreground max-w-xs text-center mt-1">
              We couldn&apos;t load your dashboard data. Please try refreshing the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}
