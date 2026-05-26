"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/app/actions/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-[#050505]">
      {/* Image Side - Swapped to the left for Signup for visual variety */}
      <div className="hidden lg:block relative overflow-hidden border-r border-emerald-900/20">
        <Image
          src="/images/signup.jpg"
          alt="Exclusive lounge"
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-black via-transparent to-emerald-900/10" />
        <div className="absolute bottom-10 left-10 max-w-sm">
          <p className="text-blue-500 font-cambria italic text-2xl tracking-tight">
            "Precision in every trade, excellence in every strategy."
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center py-12 px-6">
        <div className="mx-auto grid w-105 gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-cambria text-zinc-100 tracking-tight">
              Investors
            </h2>
            <p className="text-white text-xs font-light">
              Join the ranks of elite global investors.
            </p>
          </div>

          <form action={registerUser} className="grid gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-zinc-500 text-[10px] uppercase tracking-widest">
                  First Name
                </Label>
                <Input
                  name="firstName"
                  className="bg-zinc-900/50 border-emerald-900/20 focus:border-blue-500 h-11 rounded-none text-white "
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-zinc-500 text-[10px] uppercase tracking-widest">
                  Last Name
                </Label>
                <Input
                  name="lastName"
                  className="bg-zinc-900/50 border-emerald-900/20 focus:border-blue-500 h-11 rounded-none text-white"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-zinc-500 text-[10px] uppercase tracking-widest">
                Global Email
              </Label>
              <Input
                name="email"
                type="email"
                className="bg-zinc-900/50 border-emerald-900/20 focus:border-blue-500 h-11 rounded-none text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-zinc-500 text-[10px] uppercase tracking-widest">
                Choose Passcode
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  type={show ? "text" : "password"}
                  className="bg-zinc-900/50 border-emerald-900/20 focus:border-blue-500 h-11 rounded-none text-white"
                />
                <button
                  type="button" // Important: prevents form submission
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-500 transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 w-full h-12 bg-blue-800 hover:bg-blue-700 text-zinc-100 rounded-none font-medium tracking-[0.2em] uppercase text-xs"
            >
              Request Membership
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-[11px] text-zinc-600 uppercase tracking-widest">
              Existing Member?{" "}
              <Link
                href="/loginpage"
                className="text-zinc-300 hover:text-blue-500 transition-colors underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
