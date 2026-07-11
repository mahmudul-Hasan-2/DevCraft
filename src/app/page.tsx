"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  ChevronDown,
  Terminal,
} from "lucide-react";

// Mock Data for Recharts Performance Analytics Section
const chartData = [
  { name: "Jan", volume: 4000 },
  { name: "Feb", volume: 5500 },
  { name: "Mar", volume: 4800 },
  { name: "Apr", volume: 7000 },
  { name: "May", volume: 8500 },
  { name: "Jun", volume: 11000 },
];

export default function LandingPage() {
  // FAQ state toggle mapping
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100 font-sans space-y-20">
      {/* SECTION 1: HERO SECTION (Limited to 65% height for visual flow) */}
      <header className="relative h-[65vh] py-20 flex items-center justify-center   bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

        <div className="relative max-w-4xl mx-auto text-center px-4 space-y-6 z-10 animate-fade-in">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
            Next-Gen Digital Architecture Protocol
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
            ENGINEER YOUR <br />
            <span className="text-zinc-500">DIGITAL LEGACY</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-400 font-medium leading-relaxed">
            Deploy, audit, and trade production-grade codebase modules and
            software premium assets inside a verified developer-first ecosystem.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="group flex items-center gap-2 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Explore Production Assets
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            >
              Read Architecture Manifesto
            </Link>
          </div>
        </div>
      </header>

      {/* SECTION 2: PLATFORM STATISTICS (Recharts Analytics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Ecosystem Metrics
            </h2>
            <h3 className="text-3xl font-black text-white tracking-tight">
              Macro Trading Volume Indice
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Real-time visualization of developer interaction metrics and
              liquidity distribution layers calculated quarterly across escrow
              contracts.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                <span className="block text-2xl font-black text-white">
                  $2.4M+
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Secured Escrow Volume
                </span>
              </div>
              <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                <span className="block text-2xl font-black text-white">
                  14.2K
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Audited Code Scripts
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full h-[280px] bg-zinc-900/20 border border-zinc-900 rounded-2xl p-4 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#52525b"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    color: "#f4f4f5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#a1a1aa"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-zinc-900">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Platform Features
          </h2>
          <p className="text-3xl font-black text-white tracking-tight">
            Engineered for absolute performance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl inline-block">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold text-white">
              Automated Vulnerability Checks
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every asset undergoing migration is programmatically
              cross-examined through systemic static-code analysis to prevent
              security exposure.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl inline-block">
              <Zap className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold text-white">
              Instant Protocol Deployment
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Skip traditional compliance barriers. Connect decentralized
              repositories instantly through unified system micro-webhooks
              seamlessly.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4 hover:border-zinc-800 transition-colors">
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl inline-block">
              <Layers className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold text-white">
              Multi-Chain Escrow Layer
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Safeguard project capital payouts. Funds remain localized inside
              programmable smart parameters till explicit peer approval criteria
              match.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: TOP CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-zinc-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Ecosystem Categories
            </h2>
            <p className="text-3xl font-black text-white tracking-tight">
              Structured asset indexing
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View All Indexes <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Full-Stack Templates",
              count: "1,420 Items",
              desc: "Production boilerplate configs",
            },
            {
              title: "API Microservices",
              count: "890 Items",
              desc: "Scalable standalone backends",
            },
            {
              title: "Web3 Smart Contracts",
              count: "612 Items",
              desc: "Audited cryptographic code",
            },
            {
              title: "AI/ML Model Pipelines",
              count: "405 Items",
              desc: "Data processing engineering logs",
            },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="p-5 bg-zinc-900/20 border border-zinc-900 hover:bg-zinc-900/40 transition-all rounded-2xl group cursor-pointer"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                {cat.count}
              </span>
              <h4 className="text-md font-bold text-white group-hover:text-zinc-300 transition-colors">
                {cat.title}
              </h4>
              <p className="text-xs text-zinc-400 mt-2">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-zinc-900">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Operation Pipeline
          </h2>
          <p className="text-3xl font-black text-white tracking-tight">
            Three steps to integration
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {[
            {
              step: "01",
              name: "List and Authenticate",
              text: "Upload repository parameters, dictate price limits, and initiate baseline cryptographic validation checks.",
            },
            {
              step: "02",
              name: "Escrow Synchronization",
              text: "Acquiring entity initiates verification process. Capital assets are safely locked in platform escrow layers.",
            },
            {
              step: "03",
              name: "Systematic Hand-off",
              text: "Source code assets automatically decouple to target destination, triggering instantaneous payout mechanics.",
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-3 relative">
              <span className="text-5xl font-black text-zinc-800 tracking-tighter block">
                {item.step}
              </span>
              <h4 className="text-md font-bold text-white">{item.name}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: PREMIUM TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-zinc-900">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Developer Endorsements
          </h2>
          <p className="text-3xl font-black text-white tracking-tight">
            Trusted by leading technical founders
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl space-y-4">
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "Acquiring modular boilerplate pipelines inside DevCraft radically
              compressed our engineering timeline by nearly three full sprints.
              Absolute architectural excellence."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-300">
                AM
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Alex Mercer</h5>
                <span className="text-[10px] text-zinc-500 block">
                  Lead Architect, QuantTech
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl space-y-4">
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "The automated contract escrow layer mitigates transactional risk
              entirely. Selling our optimization engine microservice was
              remarkably transparent."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-300">
                SK
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Sarah K.</h5>
                <span className="text-[10px] text-zinc-500 block">
                  CTO, CoreSaaS Labs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INTERACTIVE FAQ (Accordion Layout) */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Knowledge Base
          </h2>
          <p className="text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "How are codebases audited prior to platform indexing?",
              a: "Every listed asset undergoes automated validation pipeline indexing and static code compliance checking immediately upon submission parameter assignment.",
            },
            {
              q: "What parameters dictate escrow fund disbursement metrics?",
              a: "Capital inputs stay immobilized until purchasing developers run manual localized testing parameters and digitally sign hand-off authorization.",
            },
            {
              q: "Are platform listed assets covered under global IP licensing?",
              a: "Yes. All asset packages explicitly package legally binding commercial usage authorizations custom-tailored during listing setup schemas.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="border border-zinc-900 bg-zinc-900/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-white hover:bg-zinc-900/40 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-zinc-400 leading-relaxed bg-zinc-900/5 border-t border-zinc-900/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
