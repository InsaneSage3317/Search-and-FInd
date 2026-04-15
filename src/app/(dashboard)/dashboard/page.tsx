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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {userName}!</h1>
          <p className="text-muted-foreground">
            Track your reported items and search for lost belongings across NIT Silchar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {statCards.map((stat) => (
            <Card key={stat.name} className="border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
            <CardHeader>
              <CardTitle>I found something</CardTitle>
              <CardDescription>
                Help your fellow student by reporting an item you found on campus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" asChild>
                <Link href="/dashboard/report?type=found">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Report Found Item
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
            <CardHeader>
              <CardTitle>I lost something</CardTitle>
              <CardDescription>
                Create a detailed report of your lost item for our matching engine.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20" asChild>
                <Link href="/dashboard/report?type=lost">
                  <Search className="mr-2 h-4 w-4" />
                  Report Lost Item
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {recentItems.length === 0 ? (
          <Card className="border-dashed border-border/60 bg-transparent">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No recent activity</h3>
              <p className="text-sm text-muted-foreground max-w-xs text-center mt-1">
                When you report or find items, they will appear here for you to track.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Recent Activity</h2>
            <div className="space-y-2">
              {recentItems.map((item) => {
                const isLost = item.type === "LOST";
                return (
                  <Link key={item.id} href={`/dashboard/item/${item.id}`}>
                    <Card className="group border-border/40 bg-card/50 hover:bg-card/80 transition-all cursor-pointer">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className={`rounded-lg p-2 ${isLost ? "bg-blue-500/10" : "bg-emerald-500/10"}`}>
                          {isLost 
                            ? <PackageSearch className="h-5 w-5 text-blue-400" />
                            : <PackagePlus className="h-5 w-5 text-emerald-400" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate group-hover:text-emerald-400 transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className={`font-semibold ${isLost ? "text-blue-400" : "text-emerald-400"}`}>
                              {item.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {item.zone?.name ?? "Unknown"}
                            </span>
                            <span>
                              {formatShortDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            item.status === "MATCHED" ? "bg-amber-500/15 text-amber-400" :
                            item.status === "RESOLVED" ? "bg-emerald-500/15 text-emerald-400" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {item.status}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
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
