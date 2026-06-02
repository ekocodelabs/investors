import Image from "next/image";
import { ArrowRight, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

export default function BodyLayout() {
  const services = [
    {
      title: "Portfolio Tracking",
      description: "Monitor all your investments in one secure dashboard.",
      icon: Wallet,
    },
    {
      title: "Market Analytics",
      description: "Powerful insights and market trends to guide decisions.",
      icon: TrendingUp,
    },
    {
      title: "Secure Investing",
      description: "Enterprise-grade security for your financial data.",
      icon: ShieldCheck,
    },
  ];

  return (
    <main className="bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              Trusted by 10,000+ Investors
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-7xl">
              Invest Smarter.
              <span className="block text-blue-500">Grow Faster.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-400">
              Build wealth with advanced portfolio management, real-time market
              insights, and intelligent investment tools designed for modern
              investors.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700">
                Start Investing
                <ArrowRight size={18} />
              </button>

              <button className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:border-blue-500">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl" />

            <Image
              src="/images/signin.jpg"
              alt="Investment Dashboard"
              width={700}
              height={700}
              priority
              className="relative mx-auto rounded-3xl border border-slate-800 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-4xl font-bold text-blue-500">$2.4B</h3>
            <p className="mt-2 text-slate-400">Assets Managed</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-4xl font-bold text-blue-500">150K+</h3>
            <p className="mt-2 text-slate-400">Active Investors</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="text-4xl font-bold text-blue-500">98%</h3>
            <p className="mt-2 text-slate-400">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-6 pb-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Investment Services</h2>

          <p className="mt-4 text-slate-400">
            Everything you need to manage and grow your portfolio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500"
            >
              <div className="mb-6 w-fit rounded-2xl bg-blue-600 p-3">
                <service.icon size={24} />
              </div>

              <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>

              <p className="text-slate-400">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
