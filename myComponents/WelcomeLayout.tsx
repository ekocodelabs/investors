"use client";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* High-end ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-950/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-120 bg-[#0a0a0a] border border-emerald-900/20 p-12 text-center relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Institutional crest icon wrapper */}
        <div className="mx-auto h-16 w-16 bg-emerald-950/20 flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative">
          <ShieldCheck className="h-7 w-7 text-blue-500" strokeWidth={1.5} />
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-blue-400 animate-pulse" />
        </div>

        <div className="space-y-4 mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold">
            Application Approved
          </p>
          <h1 className="text-3xl font-serif text-zinc-100 italic tracking-tight">
            Welcome to Aurelian
          </h1>

          <div className="h-px w-12 bg-emerald-900/40 mx-auto my-4" />

          <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-sm mx-auto">
            Your private wealth management profile has been initialized securely
            within our network vaults.
          </p>
          <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-xs mx-auto pt-2">
            Please proceed to the secure authentication portal and sign in using
            your registered client credentials.
          </p>
        </div>

        {/* High-Contrast Action Button */}
        <Button
          asChild
          className="w-full h-14 bg-white text-black hover:bg-blues-600 hover:text-white transition-all duration-700 rounded-none font-bold uppercase tracking-[0.3em] text-[11px] group"
        >
          <Link
            href="/loginpage"
            className="flex items-center justify-center gap-2"
          >
            Access Vault Portal
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>

        <footer className="mt-8 pt-4 border-t border-emerald-900/5">
          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em]">
            Aurelian Capital Global Private Network
          </p>
        </footer>
      </div>
    </main>
  );
}
