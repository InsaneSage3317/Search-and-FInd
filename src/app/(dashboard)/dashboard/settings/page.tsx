import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Shield, Award, Star, Settings as SettingsIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/auth/signin");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile and platform preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-emerald-400" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/40">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <User className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg">{user.name || "Anonymous User"}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-center">
                <div className="text-xs text-orange-400 uppercase font-bold tracking-widest mb-1">Role</div>
                <div className="font-bold text-foreground">{user.role}</div>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                <div className="text-xs text-blue-400 uppercase font-bold tracking-widest mb-1">ID</div>
                <div className="font-mono text-[10px] text-foreground truncate">{user.id}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reputation Card (Gamification Placeholder) */}
        <Card className="border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award className="h-24 w-24 text-emerald-400 rotate-12" />
          </div>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-emerald-400">
              <Star className="h-5 w-5 fill-current" />
              Campus Reputation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Trust Level</span>
                <span className="font-bold text-emerald-400">Level 1: Novice</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full w-1/4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-3 rounded-lg bg-background/50 border border-border/40">
                <div className="p-2 rounded-lg bg-emerald-500/10 h-min">
                  <Star className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Earn Your First Badge</h4>
                  <p className="text-xs text-muted-foreground italic">Successful recoveries increase your campus trust score.</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Reputation integration coming soon in NIT Silchar v2.0
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Settings Placeholder */}
        <Card className="md:col-span-2 border-border/40 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Platform Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <div className="p-3 rounded-full bg-muted/20">
                <Shield className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Security Settings</h3>
                <p className="text-xs text-muted-foreground max-w-xs">Two-factor authentication and active session management will be available shortly.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
