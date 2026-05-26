"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  // If user is already authenticated, redirect to dashboard
  // if (session) {
  //   redirect("/dashboard");
  // }
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("loginemail");
    const password = formData.get("loginpassword");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirect so we can handle errors
    });

    if (result?.error) {
      setError("Login failed: " + result.error);
      alert("Invalid credentials or unauthorized access.");
      setIsLoading(false);
    } else {
      // Success: Redirect to dashboard
      router.push("/dashboard");
      router.refresh(); // Clears any cached layout state
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-[#050505]">
      {/* Form Side */}
      <div className="flex items-center justify-center py-12 px-6">
        <div className="mx-auto grid w-95 gap-8">
          <div className="space-y-2 text-center">
            {/* Emerald Accent on Logo/Name */}
            <h1 className="text-4xl font-serif tracking-tighter text-blue-500 italic">
              Profit Towers
            </h1>
            <p className="text-white text-[10px] uppercase tracking-[0.3em]">
              Wealth Management Portal
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-zinc-400 text-[10px] uppercase tracking-widest ml-1"
                >
                  Client Identifier
                </Label>
                <Input
                  name="loginemail"
                  id="email"
                  type="email"
                  placeholder="name@profittowers.com"
                  className="bg-zinc-900/50 border-emerald-900/30 focus:border-blue-500 h-12 rounded-none transition-all text-white"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-zinc-400 text-[10px] uppercase tracking-widest ml-1"
                  >
                    Security Code
                  </Label>
                  <Link
                    href="/password"
                    className="text-[10px] text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
                  >
                    Reset
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    name="loginpassword"
                    id="password"
                    type={show ? "text" : "password"}
                    className="bg-zinc-900/50 border-emerald-900/30 focus:border-blue-500 text-white h-12 rounded-none transition-all"
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
              {/* Luxury Green Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-700 hover:bg-blue-600 text-white rounded-none font-light tracking-widest uppercase transition-all duration-500"
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </div>
          </form>

          <p className="text-center text-[11px] text-zinc-600 uppercase tracking-tight">
            Not a registered partner?{" "}
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Apply for access
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side - Styled with Green Overlay */}
      <div className="hidden lg:block relative overflow-hidden border-l border-emerald-900/20">
        <Image
          src="/images/signin.jpg"
          alt="Luxury architectural detail"
          loading="eager"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle Green Vignette */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900/20 to-black/80" />
      </div>
    </div>
  );
}
