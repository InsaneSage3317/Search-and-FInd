import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

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
          {/* Gradient orbs */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-0 h-[300px] w-[400px] rounded-full bg-teal-500/8 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Built for NIT Silchar
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Never Lose What{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Matters
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Smart matching, zone-based filtering, and verified claims — the campus lost &amp; found
                system that actually works.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all text-base px-8"
                  asChild
                >
                  <Link href="/auth/signin">Report a Lost Item</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-border/60 text-base px-8"
                  asChild
                >
                  <Link href="/auth/signin">I Found Something</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
                {[
                  { value: "100%", label: "Campus Coverage" },
                  { value: "12+", label: "Smart Zones" },
                  { value: "Secure", label: "Verified Claims" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border/40 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Intelligent by Design
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every feature is engineered to maximize the chance of reuniting you with your belongings.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-border/40 bg-card/50 p-8 transition-all hover:border-emerald-500/30 hover:bg-card/80 hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Four Simple Steps
              </h2>
              <p className="mt-4 text-muted-foreground">
                From reporting to recovery — we make it seamless.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.step} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-xl font-bold text-emerald-400 ring-1 ring-emerald-500/20">
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  {i < steps.length - 1 && (
                    <div className="pointer-events-none absolute right-0 top-7 hidden w-8 text-border lg:block">
                      <svg className="h-4 w-full" viewBox="0 0 32 16" fill="none"><path d="M0 8h28m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Zones */}
        <section id="zones" className="border-t border-border/40 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Every Corner Covered
              </h2>
              <p className="mt-4 text-muted-foreground">
                12+ campus zones mapped for precise location filtering.
              </p>
            </div>

            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              {zones.map((zone) => (
                <span
                  key={zone}
                  className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-emerald-500/40 hover:text-foreground"
                >
                  {zone}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 p-12 text-center ring-1 ring-emerald-500/20 sm:p-16">
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
              <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Find What&apos;s Yours?
              </h2>
              <p className="relative mt-4 text-muted-foreground">
                Sign in with your NIT Silchar email and start reporting.
              </p>
              <div className="relative mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all text-base px-10"
                  asChild
                >
                  <Link href="/auth/signin">Get Started</Link>
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
