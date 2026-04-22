"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Domain check regex for NIT Silchar emails (e.g., student@ece.nits.ac.in)
    const NITS_EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.)?nits\.ac\.in$/;

    // Client-side domain check
    if (!NITS_EMAIL_REGEX.test(email)) {
      setError("Only NIT Silchar institute emails (@*.nits.ac.in) are allowed.");
      setLoading(false);
      return;
    }

    const result = await signIn("nodemailer", {
      email,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setError("Failed to send login link. Please ensure your email is correct.");
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Background orbs */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-emerald-500/8 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <span className="text-xl font-bold">Find<span className="text-emerald-400">It</span></span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-border/40 bg-card/50 p-8 shadow-xl backdrop-blur-sm">
          <h1 className="text-center text-2xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Sign in with your NIT Silchar email
          </p>

          {success ? (
            <div className="mt-8 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">Check your inbox!</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We've sent a secure, magic login link to <strong>{email}</strong>. Click the link inside to instantly sign in!
              </p>
              <Button
                variant="outline"
                onClick={() => setSuccess(false)}
                className="mt-4 w-full h-11 border-border/50 text-muted-foreground"
              >
                Try a different email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Institute Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name_ug_25@ece.nits.ac.in"
                  required
                  className="mt-1.5 flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60 transition-all"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all h-11"
              >
                {loading ? "Sending Magic Link..." : "Send Magic Link"}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Only <span className="font-medium text-foreground">@*.nits.ac.in</span> emails are accepted.
          </p>
        </div>
      </div>
    </div>
  );
}
