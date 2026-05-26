"use client";

import React from "react";
import { Percent, ShieldCheck, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Structured institutional tiers
const YIELD_TIERS = [
  {
    tier: "Silver Vault",
    range: "$5,000 – $24,999",
    weekly: "1.25%",
    apy: "65.0%",
  },
  {
    tier: "Emerald Prime",
    range: "$25,000 – $99,999",
    weekly: "1.65%",
    apy: "85.8%",
  },
  {
    tier: "Malachite Sovereign",
    range: "$100,000+",
    weekly: "2.10%",
    apy: "109.2%",
  },
];

export function TradeTiers() {
  return (
    <Card className="bg-[#0a0a0a] border border-emerald-900/20 rounded-none overflow-hidden ">
      <CardHeader className="border-b border-emerald-900/10 bg-[#0d0d0d]/50 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-blue-500" strokeWidth={1.5} />
            <CardTitle className="text-sm font-serif italic text-zinc-300">
              Weekly Yield Matrix
            </CardTitle>
          </div>
          <span className="text-[8px] border border-emerald-800/40 text-blue-500 uppercase tracking-widest px-2 py-0.5 rounded-none font-mono">
            Fixed Variable
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] font-bold px-1 mb-3">
            Institutional Tier Structure
          </p>

          <div className="space-y-1.5">
            {YIELD_TIERS.map((item) => (
              <div
                key={item.tier}
                className="flex items-center justify-between p-4 bg-black/40 border border-emerald-900/5 hover:border-emerald-900/30 transition-all duration-300 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-blue-800 group-hover:text-emerald-500 transition-colors"
                      strokeWidth={1.5}
                    />
                    <span className="text-xs text-zinc-300 font-medium tracking-wide">
                      {item.tier}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-tight">
                    {item.range}
                  </p>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="text-xs font-mono font-bold text-white">
                    {item.weekly}{" "}
                    <span className="text-[9px] text-zinc-600 font-light">
                      / wk
                    </span>
                  </span>
                  <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter">
                    Est. APY: {item.apy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote Disclaimers */}
        <div className="flex items-start gap-2 pt-2 text-[9px] text-zinc-600 leading-normal uppercase tracking-tight">
          <HelpCircle className="h-3 w-3 text-zinc-700 shrink-0 mt-0.5" />
          <p>
            Yield percentages are applied directly to your principal deployed
            assets every Friday at 16:00 UTC. Compounding auto-renews weekly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
