"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Market Data - Sourced from April 2026 reports
const MARKET_DATA = {
  crypto: [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$77,631.30",
      change: "+2.41%",
      trend: "up",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$4,102.15",
      change: "+1.85%",
      trend: "up",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$245.60",
      change: "-0.40%",
      trend: "down",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "$1.12",
      change: "+0.15%",
      trend: "up",
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "$12.45",
      change: "-1.10%",
      trend: "down",
    },
  ],
  stocks: [
    {
      name: "NVIDIA",
      symbol: "NVDA",
      price: "$208.27",
      change: "+4.23%",
      trend: "up",
    },
    {
      name: "Tesla",
      symbol: "TSLA",
      price: "$376.30",
      change: "-1.30%",
      trend: "down",
    },
    {
      name: "Apple",
      symbol: "AAPL",
      price: "$271.06",
      change: "-0.87%",
      trend: "down",
    },
    {
      name: "Microsoft",
      symbol: "MSFT",
      price: "$512.40",
      change: "+0.65%",
      trend: "up",
    },
    {
      name: "Amazon",
      symbol: "AMZN",
      price: "$198.15",
      change: "+1.20%",
      trend: "up",
    },
  ],
  others: [
    {
      name: "Gold",
      symbol: "XAU",
      price: "$4,709.27",
      change: "+0.24%",
      trend: "up",
    },
    {
      name: "Silver",
      symbol: "XAG",
      price: "$75.63",
      change: "+0.33%",
      trend: "up",
    },
    {
      name: "WTI Crude Oil",
      symbol: "OIL",
      price: "$110.70",
      change: "-0.75%",
      trend: "down",
    },
    {
      name: "Natural Gas",
      symbol: "GAS",
      price: "$2.805",
      change: "+0.18%",
      trend: "up",
    },
    {
      name: "Brent Oil",
      symbol: "BRENT",
      price: "$103.67",
      change: "+2.50%",
      trend: "up",
    },
  ],
};

export function MarketLayout() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif italic text-black">Global Markets</h2>
        <Badge
          variant="outline"
          className="border-blue-500/30 text-blue-800 text-[10px] uppercase tracking-widest px-3 py-1"
        >
          Live Analysis
        </Badge>
      </div>

      <Tabs defaultValue="crypto" className="w-full">
        <TabsList className="bg-[#6c74e4] border border-blue-900/20 w-fit p-1 rounded-none mb-4">
          <TabsTrigger
            value="crypto"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white rounded-none text-[10px] uppercase tracking-widest px-6"
          >
            Crypto
          </TabsTrigger>
          <TabsTrigger
            value="stocks"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white rounded-none text-[10px] uppercase tracking-widest px-6"
          >
            Stocks
          </TabsTrigger>
          <TabsTrigger
            value="others"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white rounded-none text-[10px] uppercase tracking-widest px-6"
          >
            Commodities
          </TabsTrigger>
        </TabsList>

        {Object.entries(MARKET_DATA).map(([key, assets]) => (
          <TabsContent
            key={key}
            value={key}
            className="mt-0 ring-offset-background focus-visible:outline-none"
          >
            <div className="border border-emerald-900/10 bg-[#0a0a0a]/50">
              <Table>
                <TableHeader className="bg-[#0f0f0f]">
                  <TableRow className="hover:bg-transparent border-emerald-900/10">
                    <TableHead className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] py-4">
                      Asset
                    </TableHead>
                    <TableHead className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] py-4 text-right">
                      Price
                    </TableHead>
                    <TableHead className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] py-4 text-right">
                      24h Change
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow
                      key={asset.symbol}
                      className="border-emerald-900/5 hover:bg-blue-950/10 transition-colors cursor-pointer group"
                    >
                      <TableCell className="py-5">
                        <div className="flex flex-col">
                          <span className="text-zinc-200 font-medium tracking-wide">
                            {asset.name}
                          </span>
                          <span className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase">
                            {asset.symbol}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-zinc-100">
                        {asset.price}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${asset.trend === "up" ? "text-emerald-800" : "text-red-500"}`}
                      >
                        {asset.change}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
