import Link from "next/link";
import { BarChart3 } from "lucide-react";

interface NavbarProps {
  session: any;
}

export default function Navbar({ session }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-500/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-bold text-white">Investors</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-blue-400"
          >
            Markets
          </Link>

          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-blue-400"
          >
            Services
          </Link>

          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-blue-400"
          >
            Pricing
          </Link>

          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-blue-400"
          >
            Resources
          </Link>

          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-blue-400"
          >
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href={session ? "/dashboard" : "/loginpage"}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {session ? "Dashboard" : "Login"}
        </Link>
      </div>
    </header>
  );
}
