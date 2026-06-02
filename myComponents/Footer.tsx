import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>

              <span className="font-bold text-white">InvestPro</span>
            </div>

            <p className="text-sm text-slate-400">
              Modern investing platform helping users build wealth through
              smarter financial decisions.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Platform</h4>

            <div className="space-y-2">
              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Markets
              </Link>

              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Portfolio
              </Link>

              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Analytics
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>

            <div className="space-y-2">
              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                About
              </Link>

              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Careers
              </Link>

              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Legal</h4>

            <div className="space-y-2">
              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Privacy
              </Link>

              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Terms
              </Link>

              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400"
              >
                Security
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Investors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
