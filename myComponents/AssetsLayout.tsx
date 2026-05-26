import {
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Wallet,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
};
// Senior Dev Tip: Define interfaces for your dummy data to make database migration easier later
interface Transaction {
  id: string;
  type: "Deposit" | "Withdrawal" | "Trade Result";
  asset: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "TX-9021",
    type: "Deposit",
    asset: "USDT",
    amount: "+$50,000.00",
    date: "Apr 26, 2026",
    status: "Completed",
  },
  {
    id: "TX-9022",
    type: "Trade Result",
    asset: "XAU/USD",
    amount: "+$4,230.12",
    date: "Apr 25, 2026",
    status: "Completed",
  },
  {
    id: "TX-9023",
    type: "Withdrawal",
    asset: "BTC",
    amount: "-$12,000.00",
    date: "Apr 24, 2026",
    status: "Pending",
  },
  {
    id: "TX-9024",
    type: "Deposit",
    asset: "ETH",
    amount: "+$15,000.00",
    date: "Apr 23, 2026",
    status: "Completed",
  },
  {
    id: "TX-9025",
    type: "Trade Result",
    asset: "NVDA",
    amount: "-$1,100.00",
    date: "Apr 22, 2026",
    status: "Completed",
  },
];

export function AssetsLayout() {
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
    <div className="space-y-8 max-w-300 mx-auto">
      {/* SECTION 1: MASTER BALANCES */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3 bg-[#0a0a0a] border-emerald-900/30 rounded-none p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium flex items-center gap-2">
                <Wallet className="h-3 w-3 text-blue-500" /> Net Asset Value
              </p>
              <h2 className="text-4xl font-serif text-zinc-100 italic">
                {user?.totalPortfolioAssets}
              </h2>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <Link
                href="/deposit"
                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-black font-bold uppercase tracking-widest text-[10px] h-12 px-8 rounded-none"
              >
                <ArrowDownLeft className="mr-2 h-4 w-4" /> Deposit
              </Link>
              <Link
                href="/withdraw"
                className="flex-1 md:flex-none border-blue-900/40 text-blue-500 hover:bg-blue-200 font-bold uppercase tracking-widest text-[10px] h-12 px-8 rounded-none"
              >
                <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-emerald-900/10 mt-6 pt-6">
            <div className="px-4 border-r border-emerald-900/10">
              <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">
                Daily Profit
              </p>
              <p className="text-xl font-mono text-white">
                {user?.dailyProfit}
              </p>
            </div>
            <div className="px-4">
              <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">
                Weekly Profit
              </p>
              <p className="text-xl font-mono text-zinc-200">
                {user?.weeklyProfit}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 2: TRANSACTION HISTORY */}
      <Card className="bg-[#0a0a0a] border-emerald-900/20 rounded-none overflow-hidden">
        <CardHeader className="border-b border-emerald-900/10 bg-[#0d0d0d] flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-blue-500" />
            <CardTitle className="text-sm font-serif italic text-zinc-300">
              Transaction History
            </CardTitle>
          </div>
          <Button
            variant="link"
            className="text-zinc-500 text-[10px] uppercase tracking-widest hover:text-blue-500 transition-colors"
          >
            Export Ledger
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-100">
            <Table>
              <TableHeader className="bg-[#0f0f0f]">
                <TableRow className="border-emerald-900/10 hover:bg-transparent">
                  <TableHead className="text-[9px] uppercase tracking-widest text-zinc-600 py-4">
                    Transaction ID
                  </TableHead>
                  <TableHead className="text-[9px] uppercase tracking-widest text-zinc-600 py-4">
                    Activity
                  </TableHead>
                  <TableHead className="text-[9px] uppercase tracking-widest text-zinc-600 py-4">
                    Asset
                  </TableHead>
                  <TableHead className="text-[9px] uppercase tracking-widest text-zinc-600 py-4 text-right">
                    Amount
                  </TableHead>
                  <TableHead className="text-[9px] uppercase tracking-widest text-zinc-600 py-4 text-right">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user?.transactionHistory.map((tx) => (
                  <TableRow
                    key={tx._id}
                    className="border-emerald-900/5 hover:bg-emerald-950/10 transition-colors"
                  >
                    <TableCell className="text-[10px] font-mono text-zinc-500">
                      {tx._id}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-zinc-300">
                      {tx.activity}
                    </TableCell>
                    <TableCell className="text-xs text-zinc-500">
                      {tx.pair}
                    </TableCell>
                    <TableCell
                      className={`text-right text-xs font-mono ${tx.amount.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {tx.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`text-[9px] uppercase px-2 py-0.5 rounded-none border ${
                          tx.status === "Completed"
                            ? "border-emerald-900/50 text-emerald-600"
                            : tx.status === "Pending"
                              ? "border-yellow-900/50 text-yellow-600"
                              : "border-red-900/50 text-red-600"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
