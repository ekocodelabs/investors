import {
  ShieldCheck,
  Zap,
  Lock,
  ChevronRight,
  Info,
  Timer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
  stakedCapital: string;
  averageAPY: string;
  availableToClaim: string;
};

const VAULTS = [
  {
    name: "Emerald Tier",
    apy: "0.0%",
    duration: "30 Days",
    minAmount: "5,000",
    status: "none",
    description: "Algorithmic node optimization for consistent yield.",
  },
  {
    name: "Malachite Executive",
    apy: "0.0%",
    duration: "90 Days",
    minAmount: "25,000",
    status: "none",
    description: "Priority validator access with insurance coverage.",
  },
];

export function StakingVaults() {
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
  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif italic text-zinc-100">
            Capital Appreciation
          </h2>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
            Staking & Yield Generation
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-blue-950/40 text-blue-800 border-blue-500/20 rounded-none text-[9px] uppercase px-3 py-1">
            Total Staked: {user?.stakedCapital || "$0.00"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ACTIVE STAKE MONITOR */}
        <Card className="lg:col-span-2 bg-[#0a0a0a] border-emerald-900/20 rounded-none overflow-hidden border-l-2 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-zinc-300">
                Active Position: Malachite-01
              </CardTitle>
              <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-tighter">
                <Timer className="h-3 w-3" /> Ends in 14 Days
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-blue-500/50 text-blue-500 text-[10px] rounded-none"
            >
              {user?.averageAPY} APY
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  Staked Capital
                </p>
                <p className="text-xl font-serif text-zinc-200">
                  {user?.stakedCapital}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  Accrued Reward
                </p>
                <p className="text-xl font-serif text-blue-500">
                  {user?.availableToClaim}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] text-zinc-500 uppercase">
                <span>Maturity Progress</span>
                <span>0%</span>
              </div>
              <Progress
                value={84}
                className="h-1 bg-zinc-900 overflow-hidden rounded-none"
              >
                <div className="h-full bg-blue-500" />
              </Progress>
            </div>
          </CardContent>
        </Card>

        {/* QUICK STAKE ACTION */}
        <Card className="bg-blue-950/10 border-blue-900/30 rounded-none flex flex-col justify-between">
          <CardHeader>
            <div className="p-2 w-fit bg-blue-900/20 mb-2">
              <Zap className="h-4 w-4 text-blue-500" />
            </div>
            <CardTitle className="text-sm font-serif text-zinc-200 italic">
              Deploy Capital
            </CardTitle>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Instant deployment into Profit Towers liquidity pools. Yield
              begins accruing immediately upon confirmation.
            </p>
          </CardHeader>
          <CardContent>
            <Link
              href="/deposit"
              className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors rounded px-4 py-2 bg-black"
            >
              Initialize New Stake
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* VAULT SELECTION */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="group relative bg-[#0a0a0a] border border-blue-900/10 p-6 transition-all hover:border-blue-500/40 cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-zinc-200 font-medium group-hover:text-blue-400 transition-colors">
                Blue Tier
              </h3>
              <p className="text-[10px] text-zinc-600 mt-1">
                Algorithmic node optimization for consistent yield.
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-serif text-blue-500">
                {user?.averageAPY}
              </span>
              <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">
                Est. Annual
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-blue-900/5 pt-4">
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3 text-zinc-700" />
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                30 Day Lockup
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <ShieldCheck className="h-3 w-3 text-blue-900" />
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                Min. $4000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
