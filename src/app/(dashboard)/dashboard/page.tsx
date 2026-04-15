import { 
  PlusCircle, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { name: "Reported Items", value: "0", icon: Clock, color: "text-blue-400" },
    { name: "Active Matches", value: "0", icon: AlertCircle, color: "text-amber-400" },
    { name: "Items Recovered", value: "0", icon: CheckCircle2, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Finder!</h1>
        <p className="text-muted-foreground">
          Track your reported items and search for lost belongings across NIT Silchar.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
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

      {/* Empty State / Recent Activity Placeholder */}
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
    </div>
  );
}
