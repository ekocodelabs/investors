import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Live market data as of April 2026
const MARKETS = [
  { pair: "Gold / USD", price: "$4,713.58", change: "+1.2%", trend: "up" },
  { pair: "Bitcoin / USD", price: "$77,631.30", change: "+2.4%", trend: "up" },
  { pair: "Brent Oil", price: "$96.32", change: "-0.5%", trend: "down" },
  { pair: "S&P 500", price: "7,177.25", change: "+0.8%", trend: "up" },
  { pair: "Nvidia (NVDA)", price: "$1,342.10", change: "+4.1%", trend: "up" },
];

type LeanUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  totalPortfolioAssets: string;
  dailyProfit: string;
  weeklyProfit: string;
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

export function DashboardOverview() {
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

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-100">
            Welcome to Your Dashboard
          </h1>
          <p className="text-zinc-500 mt-2">
            Please log in to view your portfolio details.
          </p>
        </div>
      </div>
    );
  }

  console.log("Authenticated User:", user);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* SECTION 1: ASSET METRICS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#0a0a0a] border-emerald-900/20 col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Total Portfolio Value
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-serif text-zinc-100">
                {user?.totalPortfolioAssets || "$0.00"}
              </div>
            </div>
            <Link
              href="/deposit"
              className="bg-blue-600 hover:bg-blue-500 text-black rounded-none h-10 px-6 font-bold tracking-widest uppercase text-[10px]"
            >
              <Plus className="mr-2 h-4 w-4" /> Deposit
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-emerald-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Daily P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-serif text-blue-500">
              {user?.dailyProfit || "+$0.00"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-emerald-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Weekly P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-serif text-zinc-100">
              {user?.weeklyProfit || "$0.00"}
            </div>
            <p className="text-[10px] text-blue-500/50 mt-1 uppercase tracking-tighter">
              Outperforming Benchmark
            </p>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 2: MARKET WATCHLIST */}
      <Card className="bg-[#0a0a0a] border-emerald-900/20">
        <CardHeader className="flex flex-row items-center justify-between border-b border-emerald-900/10 pb-4">
          <CardTitle className="text-sm font-serif italic text-zinc-300">
            Priority Markets
          </CardTitle>
          <Button
            asChild
            variant="ghost"
            className="text-blue-500 hover:text-blue-400 hover:bg-emerald-950/20 text-[10px] uppercase tracking-widest"
          >
            <Link href="/markets">
              View All Assets <ArrowUpRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <Table>
          <TableBody>
            {MARKETS.map((asset) => (
              <TableRow
                key={asset.pair}
                className="border-emerald-900/5 hover:bg-emerald-950/10 transition-colors cursor-pointer"
              >
                <TableCell className="font-medium text-zinc-300 py-4">
                  {asset.pair}
                </TableCell>
                <TableCell className="text-right text-zinc-100 font-mono">
                  {asset.price}
                </TableCell>
                <TableCell
                  className={`text-right ${asset.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                >
                  {asset.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* SECTION 3: AURELIAN STAKING (Luxury Concept) */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 bg-linear-to-br from-blue-950/20 to-black border-blue-900/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Coins className="h-32 w-32 text-blue-500" />
          </div>
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-blue-800 font-bold">
                Profit Towers Vaults
              </span>
            </div>
            <h3 className="text-2xl font-serif text-zinc-100 mb-4 leading-tight">
              Earn institutional-grade yield <br /> with Malachite Staking.
            </h3>
            <p className="text-black text-sm font-light max-w-md leading-relaxed mb-6">
              Our proprietary algorithmic staking protocol optimizes validator
              nodes in real-time, providing a targeted{" "}
              <span className="text-blue-400">8.4% APY</span> on eligible
              digital assets. Secured by cold-storage multi-sig architecture.
            </p>
            <div className="flex gap-4">
              <Button className="bg-transparent border border-blue-800 text-blue-500 hover:bg-blue-900/20 rounded-none text-[10px] uppercase tracking-widest px-8">
                Staking Tiers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Staking Stats Card */}
        <Card className="bg-blue-900/10 border-blue-900/30">
          <CardHeader>
            <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-blue-500">
              Staked Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs text-zinc-500 uppercase">
                Available to Claim
              </div>
              <div className="text-2xl font-serif text-black">0.00</div>
            </div>
            <Separator className="bg-emerald-900/20" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[9px] text-zinc-600 uppercase">
                  Avg. APY
                </div>
                <div className="text-sm text-blue-400 font-mono">0</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-600 uppercase">Status</div>
                <div className="text-sm text-blue-400 flex items-center gap-1 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />{" "}
                  none
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://w3.org"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-px w-full ${className}`} />;
}
