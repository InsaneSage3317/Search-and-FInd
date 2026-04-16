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
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground text-lg">
            Manage your campus reports and help find lost belongings across NIT Silchar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          {statCards.map((stat) => (
            <Card key={stat.name} className="border-none shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.name}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color === 'text-blue-400' ? 'text-primary' : stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-8 sm:grid-cols-2">
          <Card className="relative overflow-hidden border-none bg-primary/5 shadow-sm hover:shadow-md transition-all group/action">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover/action:scale-110 transition-transform">
              <PlusCircle className="h-40 w-40 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">I found something</CardTitle>
              <CardDescription className="text-base">
                Report an item you found on campus to help its owner.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-12 text-base" asChild>
                <Link href="/dashboard/report?type=found">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Report Found Item
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none bg-sidebar/5 shadow-sm hover:shadow-md transition-all group/action">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover/action:scale-110 transition-transform text-sidebar">
              <Search className="h-40 w-40" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">I lost something</CardTitle>
              <CardDescription className="text-base">
                Post a report for your lost item to start matching.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full h-12 text-base border-2" asChild>
                <Link href="/dashboard/report?type=lost">
                  <Search className="mr-2 h-5 w-5" />
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
            <div className="grid gap-4">
              {recentItems.map((item) => {
                const isLost = item.type === "LOST";
                return (
                  <Link key={item.id} href={`/dashboard/item/${item.id}`}>
                    <Card className="group border-none bg-card hover:bg-muted/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
                      <CardContent className="flex items-center gap-6 p-6">
                        <div className={`rounded-2xl p-4 ${isLost ? "bg-sidebar/10" : "bg-primary/10"}`}>
                          {isLost 
                            ? <PackageSearch className="h-6 w-6 text-sidebar" />
                            : <PackagePlus className="h-6 w-6 text-primary" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors leading-tight">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground">
                            <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-widest ${isLost ? "bg-sidebar/10 text-sidebar" : "bg-primary/10 text-primary"}`}>
                              {item.type}
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                              <MapPin className="h-4 w-4 text-muted-foreground/60" /> {item.zone?.name ?? "Unknown"}
                            </span>
                            <span className="font-medium">
                              {formatShortDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                            item.status === "MATCHED" ? "bg-amber-100 text-amber-700" :
                            item.status === "RESOLVED" ? "bg-emerald-100 text-emerald-700" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {item.status}
                          </span>
                          <div className="rounded-full bg-muted p-2 group-hover:bg-primary/10 transition-colors">
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
