import {
  ArrowUpRight,
  ArrowDownRight,
  History,
  Wallet2,
  ArrowRightLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TradeTiers } from "./Tradetier";

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
// Mock Data for Recent Settlements
const TRADE_HISTORY = [
  { id: 1, pair: "NVDA/USD", result: 4250.0, type: "win", time: "10:42 AM" },
  { id: 2, pair: "XAU/USD", result: -1120.5, type: "loss", time: "09:15 AM" },
  { id: 3, pair: "BTC/USDT", result: 8400.2, type: "win", time: "Yesterday" },
  { id: 4, pair: "OIL/USD", result: 610.0, type: "win", time: "Yesterday" },
  { id: 5, pair: "TSLA/USD", result: -2300.0, type: "loss", time: "Yesterday" },
];

export function TradeLayout() {
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

  const dailyPnL = parseFloat(user?.dailyProfit || "0");
  const withdrawalAvailable = parseFloat(user?.withdrawalProfit || "0");

  return (
    <>
      <TradeTiers />
      <div className="grid gap-6 md:grid-cols-12">
        {/* SECTION: PERFORMANCE SUMMARY */}
        <div className="md:col-span-4 space-y-6">
          <Card className="bg-emerald-950/10 border-emerald-900/30 rounded-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <History className="h-20 w-20 text-blue-500" />
            </div>
            <CardHeader>
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-blue-500">
                Today's Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-3xl font-serif ${dailyPnL >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {dailyPnL >= 0 ? "+" : "-"}$
                {Math.abs(dailyPnL).toLocaleString()}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-widest font-light">
                Settled P&L (Realized)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0a0a0a] border-emerald-900/20 rounded-none">
            <CardHeader>
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Available for Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-3xl font-serif text-zinc-100 italic">
                  ${withdrawalAvailable.toLocaleString()}
                </div>
                <p className="text-[10px] text-blue-600 mt-1 uppercase tracking-tight">
                  Fully Liquid Asset
                </p>
              </div>
              //give the link a button style and make it navigate to the
              withdrawal page
              <Link
                href="/withdraw"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Initiate Withdrawal
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* SECTION: SETTLED TRADES LIST */}
        <Card className="md:col-span-8 bg-[#0a0a0a] border-emerald-900/20 rounded-none">
          <CardHeader className="border-b border-emerald-900/10 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-serif italic text-zinc-300">
                Trade Ledger
              </CardTitle>
            </div>
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest">
              Real-time Settlement
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-87.5">
              <div className="divide-y divide-emerald-900/5">
                {user?.tradeHistory.map((trade) => (
                  <div
                    key={trade._id}
                    className="flex items-center justify-between p-5 hover:bg-emerald-950/10 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-none ${trade.isWin ? "bg-emerald-950/30" : "bg-red-950/20"}`}
                      >
                        {trade.isWin ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-200">
                          {trade.pair}
                        </div>
                        <div className="text-[10px] text-zinc-600 uppercase font-light">
                          {trade.time}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-sm font-mono font-medium ${trade.isWin ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {trade.isWin ? "+" : "-"}$
                        {Math.abs(trade.amount).toFixed(2)}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[8px] h-4 border-emerald-900/30 text-zinc-500 uppercase tracking-tighter"
                      >
                        Settled
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
