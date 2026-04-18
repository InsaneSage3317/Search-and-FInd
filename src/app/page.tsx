import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
    title: "Intelligent Matching",
    description: "Fuzzy text search and category-based scoring automatically suggest matches between lost and found reports.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Zone-Based Filtering",
    description: "Campus divided into smart zones — Library, Hostels, Labs, Canteen — to narrow results instantly.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Tiered Verification",
    description: "Hidden-detail Q&A for everyday items. Photo proof + admin mediation for high-value claims.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
      </svg>
    ),
    title: "Secure Handover",
    description: "Cryptographic PIN/QR code ensures only verified owners complete the physical pickup.",
  },
];

const steps = [
  { step: "01", title: "Report", description: "Describe your lost or found item with details and campus zone." },
  { step: "02", title: "Match", description: "Our engine scans all reports and surfaces potential matches." },
  { step: "03", title: "Verify", description: "Answer hidden-detail questions or provide proof of ownership." },
  { step: "04", title: "Recover", description: "Get a secure handover PIN and collect your item." },
];

const zones = [
  "Main Library", "Central Canteen", "Hostel 1-8", "Admin Block",
  "CSE Department", "ECE Department", "EE Department", "ME Department",
  "Civil Department", "Gym & Sports Complex", "Auditorium", "Main Gate",
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Neon Gradient orbs for dark mode */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-20 right-0 h-[400px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-32 sm:px-8 sm:py-40 lg:px-12 lg:py-48">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-2 text-sm font-bold text-primary tracking-wide">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                BUILT FOR NIT SILCHAR
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
                Never Lose What{" "}
                <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Matters
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground/80 font-medium tracking-tight">
                Smart matching, zone-based filtering, and verified claims — the campus lost &amp; found
                system that actually works.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg h-14 px-10"
                  asChild
                >
                  <Link href="/auth/signin">Report a Lost Item</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg h-14 px-10 border-2"
                  asChild
                >
                  <Link href="/auth/signin">I Found Something</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mx-auto mt-20 grid max-w-lg grid-cols-3 gap-12">
                {[
                  { value: "100%", label: "Campus Coverage" },
                  { value: "12+", label: "Smart Zones" },
                  { value: "Secure", label: "Verified Claims" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center group">
                    <div className="text-3xl font-bold text-primary sm:text-4xl transition-transform group-hover:scale-110">{stat.value}</div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-card/10 border-y border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center mb-20">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Intelligent by Design
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium">
                Every feature is engineered to maximize the chance of reuniting you with your belongings.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group relative border border-white/5 bg-card/40 backdrop-blur-md p-10 transition-all hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20"
                >
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground/80 font-medium">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-background">
          <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center mb-20">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Four Simple Steps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium">
                From reporting to recovery — we make it seamless.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.step} className="relative text-center group">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 text-2xl font-black text-primary shadow-inner transition-transform group-hover:rotate-6">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground font-medium">{s.description}</p>
                  {i < steps.length - 1 && (
                    <div className="pointer-events-none absolute right-[-2.5rem] top-8 hidden w-10 text-muted-foreground/20 lg:block">
                      <svg className="h-6 w-full" viewBox="0 0 32 16" fill="none"><path d="M0 8h28m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2.5" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Zones */}
        <section id="zones" className="bg-card/10 border-y border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Every Corner Covered
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium">
                12+ campus zones mapped for precise location filtering.
              </p>
            </div>

            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4">
              {zones.map((zone) => (
                <span
                  key={zone}
                  className="rounded-2xl border border-white/5 bg-card/60 backdrop-blur-sm px-8 py-3 text-sm font-bold text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary hover:border-primary/30 hover:scale-105 shadow-sm"
                >
                  {zone}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden rounded-[3rem] bg-card border border-white/5 p-16 text-center shadow-2xl shadow-black/50 sm:p-24 group">
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] transition-transform group-hover:scale-110" />
              <div className="pointer-events-none absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[100px] transition-transform group-hover:scale-110" />
              
              <h2 className="relative text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
                Ready to Find Yours?
              </h2>
              <p className="relative mt-4 text-xl text-sidebar-foreground/60 font-medium max-w-2xl mx-auto">
                Sign in with your NIT Silchar email and join the most efficient lost & found network on campus.
              </p>
              <div className="relative mt-12">
                <Button
                  size="lg"
                  className="text-lg h-16 px-16 rounded-2xl shadow-2xl shadow-primary/20"
                  asChild
                >
                  <Link href="/auth/signin">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
