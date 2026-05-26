"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Wallet,
  AlertCircle,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type LeanUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  totalPortfolioAssets: string;
  dailyProfit: string;
  weeklyProfit: string;
  withdrawalProfit: string;
  tradeHistory: Array<{
    time: string;
    pair: string;
    amount: number;
    isWin: boolean;
    _id: string;
  }>;
  transactionHistory: Array<{
    transactionID: string;
    pair: string;
    date: string;
    amount: string;
    status: "Completed" | "Pending" | "Failed";
    activity: "Deposit" | "Withdrawal" | "Trade Result";
    _id: string;
  }>;
  createdAt: string;
  __v: number;
};

export function WithdrawalModule() {
  const { data: session } = useSession();
  const [user, setUser] = useState<LeanUser | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, [session]);

  const router = useRouter();

  // Dummy data - in production this would come from your global state/database
  const LIQUID_BALANCE = user?.withdrawalProfit
    ? parseFloat(user.withdrawalProfit)
    : 0; // Assume 50% of total assets are liquid for withdrawal

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");

  const email = user?.email;

  const isInsufficient = parseFloat(amount) > LIQUID_BALANCE;
  const canSubmit =
    amount && address && network && !isInsufficient && parseFloat(amount) > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* NAVIGATION HEADER */}
      <div className="flex items-center justify-between border-b border-emerald-900/10 pb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/assets")}
            className="group hover:bg-emerald-950/20 text-black hover:text-blue-500 rounded-none px-2"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-black mb-1">
              <span>Assets</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-blue-800 font-bold">Outbound Transfer</span>
            </div>
            <h1 className="text-3xl font-serif italic text-black">
              Capital Withdrawal
            </h1>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* WITHDRAWAL FORM */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0a0a0a] border-emerald-900/20 rounded-none">
            <CardContent className="p-8 space-y-8">
              {/* Network Selection */}
              <div className="space-y-3">
                <label className="text-[10px] text-black uppercase tracking-[0.2em] ml-1">
                  Asset Network
                </label>
                <Select onValueChange={setNetwork}>
                  <SelectTrigger className="bg-black border-emerald-900/10 text-zinc-200 h-14 rounded-none focus:ring-blue-500 focus:border-blue-500 transition-all">
                    <SelectValue placeholder="Select Withdrawal Path" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-emerald-900/40 text-zinc-300 rounded-none">
                    <SelectItem
                      value="trc20"
                      className="focus:bg-emerald-900/20 focus:text-blue-400"
                    >
                      USDT (TRC20)
                    </SelectItem>
                    <SelectItem
                      value="erc20"
                      className="focus:bg-emerald-900/20 focus:text-blue-400"
                    >
                      USDT (ERC20)
                    </SelectItem>
                    <SelectItem
                      value="btc"
                      className="focus:bg-emerald-900/20 focus:text-blue-400"
                    >
                      Bitcoin (BTC)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Amount Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                    Amount to Transfer
                  </label>
                  <span
                    className="text-[9px] text-blue-500 uppercase tracking-widest cursor-pointer hover:text-blue-400 transition-colors"
                    onClick={() => setAmount(LIQUID_BALANCE.toString())}
                  >
                    Max Available
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-black border-emerald-900/10 text-zinc-100 h-14 rounded-none pl-12 focus:ring-blue-500"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-900 font-serif font-bold">
                    $
                  </span>
                </div>
              </div>
              {/* Address Input */}
              <div className="space-y-3">
                <label className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] ml-1">
                  Destination Address
                </label>
                <Input
                  placeholder="Paste external wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-black border-emerald-900/10 text-zinc-100 h-14 rounded-none focus:ring-blue-500"
                />
              </div>
              {/* Status Warning */}
              {isInsufficient && (
                <div className="flex items-start gap-3 bg-red-950/10 border border-red-900/30 p-4 text-red-500 animate-in fade-in duration-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                    Withdrawal exceeds available liquid capital. Please settle
                    open positions or stake maturity before proceeding.
                  </p>
                </div>
              )}
              <Button
                disabled={!canSubmit}
                className="w-full h-16 bg-white text-black hover:bg-blue-600 hover:text-white transition-all duration-700 rounded-none font-bold uppercase tracking-[0.4em] text-[11px] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                {isInsufficient
                  ? "Insufficient Funds"
                  : "Authorize Capital Release"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* SIDEBAR INFO */}
        <div className="space-y-6">
          <Card className="bg-blue-950/10 border-blue-900/20 rounded-none border-l-2 border-l-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-blue-500">
                Liquidity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-black uppercase mb-1">
                    Available for Outbound
                  </p>
                  <p className="text-2xl font-serif text-black italic">
                    ${LIQUID_BALANCE.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-blue-600 font-bold uppercase tracking-tighter">
                  <ShieldCheck className="h-3 w-3" /> Fully Liquid Asset
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 border border-blue-900/10 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
              Transfer Advisory
            </h4>
            <ul className="space-y-3">
              <li className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-tighter list-disc ml-3">
                Withdrawals are processed via institutional cold-storage within
                2-24 hours.
              </li>
              <li className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-tighter list-disc ml-3">
                Investors does not charge outbound fees; network gas fees apply.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
