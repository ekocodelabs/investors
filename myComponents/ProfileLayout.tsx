import Image from "next/image";
import {
  LogOut,
  ShieldCheck,
  Mail,
  User as UserIcon,
  Crown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession, signOut } from "next-auth/react";
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

export function ProfileLayout() {
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

  // Dummy user data - to be replaced by database/session later
  const profileUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    tier: "Platinum Member",
    joined: "Est. 2024",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-emerald-900/20 p-10 relative overflow-hidden">
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Crown className="h-32 w-32 text-blue-500" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* High-End Avatar Section */}
          {/* <div className="relative h-24 w-24 mb-6 ring-1 ring-emerald-500/30 p-1">
            <div className="relative h-full w-full bg-zinc-900 overflow-hidden">
              <Image
                src="/images/profile-placeholder.jpg" // Ensure this exists in your public/images
                alt="Member Portrait"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="96px"
              />
            </div>
          </div> */}

          <div className="space-y-1 mb-8">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold">
                {profileUser.tier}
              </span>
            </div>
            <h2 className="text-3xl font-serif text-zinc-100 italic tracking-tight">
              {profileUser.firstName} {profileUser.lastName}
            </h2>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
              {profileUser.joined}
            </p>
          </div>

          <Separator className="bg-blue-900/10 mb-8" />

          {/* User Details Grid */}
          <div className="w-full space-y-6 mb-10 text-left">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Mail className="h-3.5 w-3.5 text-zinc-700 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Email Address
                </span>
              </div>
              <span className="text-xs font-light text-zinc-300">
                {profileUser.email}
              </span>
            </div>

            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-700 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Account Security
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-blue-500">
                Verified
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 border-blue-900/40 text-zinc-300 hover:bg-blue-950/20 rounded-none text-[10px] uppercase tracking-[0.2em]"
              onClick={() => {
                /* Edit logic */
              }}
            >
              Update Credentials
            </Button>

            <Button
              className="w-full h-12 bg-white text-black hover:bg-zinc-200 rounded-none text-[10px] uppercase tracking-[0.2em] font-bold transition-all"
              onClick={() => signOut({ callbackUrl: "/loginpage" })}
            >
              <LogOut className="mr-2 h-4 w-4" /> Terminate Session
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[9px] text-zinc-700 uppercase tracking-[0.5em]">
        Authorized Access Only — Investors &copy; 2026
      </p>
    </div>
  );
}
