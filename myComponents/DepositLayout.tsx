"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  Bitcoin,
  ShieldCheck,
  ArrowLeft,
  Info,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NETWORKS = [
  {
    id: "usdt-trc20",
    name: "USDT",
    network: "TRC20 (Tron)",
    address: "xxxxxxxxxxxxxxxxxxxxx",
    symbol: "T",
    color: "text-emerald-500",
  },
  {
    id: "usdt-erc20",
    name: "USDT",
    network: "ERC20 (Ethereum)",
    address: "xxxxxxxxxxxxxxxxxxxxx",
    symbol: "E",
    color: "text-blue-500",
  },
  {
    id: "btc",
    name: "Bitcoin",
    network: "BTC Mainnet",
    address: "xxxxxxxxxxxxxxxxxxxxx",
    symbol: "₿",
    color: "text-orange-500",
  },
];

export function DepositModule() {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* NAVIGATION HEADER */}
      <div className="flex items-center justify-between border-b border-blue-900/10 pb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/assets")}
            className="group hover:bg-blue-950/20 text-zinc-500 hover:text-blue-500 rounded-none px-2 transition-all"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-black mb-1">
              <span>Assets</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-blue-800 font-bold">Inbound Transfer</span>
            </div>
            <h1 className="text-3xl font-serif italic text-black">
              Secure Deposit
            </h1>
          </div>
        </div>
      </div>

      {/* NETWORK SELECTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NETWORKS.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Card className="bg-[#0a0a0a] border border-blue-900/20 hover:border-blue-500/50 transition-all duration-500 cursor-pointer group rounded-none overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-14 w-14 flex items-center justify-center border border-blue-900/30 bg-black group-hover:border-blue-500/40 transition-colors">
                      {item.id === "btc" ? (
                        <Bitcoin className={`h-7 w-7 ${item.color}`} />
                      ) : (
                        <span
                          className={`text-2xl font-bold font-serif ${item.color}`}
                        >
                          {item.symbol}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-zinc-200 font-serif italic text-xl">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                      Network:{" "}
                      <span className="text-zinc-300 font-medium">
                        {item.network}
                      </span>
                    </p>
                  </div>
                </CardContent>
                <div className="h-1 w-full bg-blue-950 group-hover:bg-blue-600 transition-colors duration-500" />
              </Card>
            </DialogTrigger>

            <DialogContent className="bg-[#050505] border border-blue-900/40 text-zinc-100 rounded-none max-w-105">
              <DialogHeader>
                <div className="mx-auto h-14 w-14 bg-blue-950/20 flex items-center justify-center mb-4 border border-blue-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <ShieldCheck className="h-7 w-7 text-blue-500" />
                </div>
                <DialogTitle className="text-center font-serif text-2xl italic tracking-tight">
                  {item.name} Inbound Address
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500 text-[10px] uppercase tracking-[0.2em] pt-2">
                  Aurelian Vault • {item.network}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8 space-y-6">
                <div className="bg-black border border-blue-900/10 p-8 flex flex-col items-center gap-6">
                  {/* QR Placeholder with High-End texture */}
                  <div className="h-44 w-44 bg-zinc-950 flex items-center justify-center border border-zinc-900 relative shadow-inner">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://transparenttextures.com')]" />
                    <span className="text-[9px] text-zinc-700 uppercase tracking-[0.3em] font-medium">
                      Ecrypted QR
                    </span>
                  </div>

                  <div className="w-full space-y-3">
                    <p className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] text-center font-bold">
                      Transfer Address
                    </p>
                    <div className="flex items-center gap-3 bg-zinc-950 p-4 border border-zinc-900 hover:border-blue-900/50 transition-colors">
                      <code className="text-[11px] font-mono text-zinc-400 truncate flex-1 tracking-tight">
                        {item.address}
                      </code>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCopy(item.address, item.id)}
                        className="h-9 w-9 hover:bg-blue-950/50 text-blue-500"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-blue-950/10 border border-blue-900/30 p-5">
                  <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest">
                    Ensure your source wallet supports the{" "}
                    <span className="text-blue-500 font-bold underline underline-offset-4 decoration-blue-900">
                      {item.network}
                    </span>
                    . Mismatched networks will lead to catastrophic asset loss.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
