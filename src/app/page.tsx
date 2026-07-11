"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  ShoppingCart,
  ShieldCheck,
  Cpu,
  Code,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Layers,
  FolderHeart,
  Database,
  HelpCircle,
  ChevronDown,
  Radio,
  Users2,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function Home() {
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 1. Statistics Data
  const stats = [
    {
      icon: <Users2 className="h-5 w-5 text-accent" />,
      value: "24,500+",
      label: "Verified Developers",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-accent" />,
      value: "$1.2M+",
      label: "Creator Earnings",
    },
    {
      icon: <Activity className="h-5 w-5 text-accent" />,
      value: "0.003s",
      label: "Avg Query Latency",
    },
  ];

  // 2. Core Architecture Features
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: "Stateless Security",
      desc: "Every asset and transaction is secured via JWT and strict multi-layer authentication handlers.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-emerald-400" />,
      title: "Overhead-Free Scaling",
      desc: "Built with Native MongoDB Driver to bypass Mongoose overheads, ensuring lightning-fast database queries.",
    },
    {
      icon: <Code className="h-6 w-6 text-emerald-400" />,
      title: "100% Type-Safe Templates",
      desc: "All source files, hooks, and boilerplates are thoroughly verified with strict TypeScript architecture.",
    },
  ];

  // 3. Asset Categories
  const categories = [
    {
      icon: <Layers className="h-5 w-5" />,
      name: "Next.js Boilerplates",
      count: "142 items",
    },
    {
      icon: <Database className="h-5 w-5" />,
      name: "Backend Modules",
      count: "89 items",
    },
    {
      icon: <FolderHeart className="h-5 w-5" />,
      name: "Premium UI Kits",
      count: "210 items",
    },
  ];

  // 4. Dummy Marketplace Products
  const dummyProducts = [
    {
      id: 1,
      title: "Next.js 14 SaaS Boilerplate",
      price: "$49",
      category: "Fullstack",
      lang: "TypeScript",
    },
    {
      id: 2,
      title: "Native MongoDB Auth Module",
      price: "$19",
      category: "Backend",
      lang: "Node.js",
    },
    {
      id: 3,
      title: "Shadcn UI Premium Dashboard",
      price: "$29",
      category: "Frontend",
      lang: "React",
    },
  ];

  // 5. Technical FAQs
  const faqs = [
    {
      q: "How do I access the source code after purchasing?",
      a: "Once your transaction is verified through our secure payment gateway, the system automatically provisions instant zip downloads and Git repository access to your dashboard.",
    },
    {
      q: "Are these code structures strictly type-safe?",
      a: "Yes. Every single asset listed on DevCraft undergoes rigorous manual review and automated linting to guarantee zero TypeScript or build-time compilation errors.",
    },
    {
      q: "What is the marketplace commission rate for sellers?",
      a: "DevCraft charges a flat 8% platform fee per successful trade. No hidden subscriptions, no upfront listing costs.",
    },
  ];

  return (
    <div className="font-mono text-xs selection:bg-accent selection:text-primary space-y-20">
      {/* ==========================================
          SECTION 1: HERO BANNER (Height: 65vh)
         ========================================== */}
      <section className="relative bg-primary text-white h-[65vh] flex items-center overflow-hidden border-b pb-3 border-gray-900">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium bg-accent/10 text-accent border border-accent/20 animate-pulse">
                <Zap className="h-3 w-3" /> Next.js 14 & TypeScript Powered
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white font-sans">
                Buy & Sell <br />
                Premium <span className="text-accent">Dev Assets</span>
              </h1>
              <p className="text-gray-400 text-xs max-w-xl leading-relaxed font-sans">
                The ultimate marketplace for tech professionals. Discover, list,
                and trade production-ready Next.js components, TypeScript
                templates, and optimized backend modules.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-emerald-600 text-primary font-bold px-5 py-3 rounded-global transition-all shadow-lg shadow-accent/20"
                >
                  Browse Marketplace <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 hover:bg-white/5 text-white px-5 py-3 rounded-global transition-all"
                >
                  Start Selling
                </Link>
              </div>
            </div>

            {/* Interactive Code Mockup */}
            <div className="hidden md:flex justify-center items-center">
              <div className="p-5 bg-slate-900/60 border border-gray-800/80 rounded-global max-w-md w-full text-emerald-400 space-y-1.5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800/60 mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/85" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/85" />
                    <div className="w-2 h-2 rounded-full bg-green-500/85" />
                    <span className="text-gray-500 ml-2 text-[10px]">
                      marketplace/asset.ts
                    </span>
                  </div>
                  <span className="text-gray-600 text-[9px]">Verified Eco</span>
                </div>
                <p className="text-purple-400">
                  const <span className="text-blue-400">devAsset</span> = &#123;
                </p>
                <p className="pl-4 text-gray-300">
                  title:{" "}
                  <span className="text-amber-300">"SaaS Boilerplate"</span>,
                </p>
                <p className="pl-4 text-gray-300">
                  database:{" "}
                  <span className="text-amber-300">"Native MongoDB"</span>,
                </p>
                <p className="pl-4 text-gray-300">
                  isTypeSafe: <span className="text-amber-300">true</span>,
                </p>
                <p className="text-purple-400">&#125;;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: LIVE STATISTICS HIGH-BAR
         ========================================== */}
      <section className="bg-slate-950 border-b border-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 py-2 md:border-r last:border-0 border-gray-800"
              >
                <div className="p-2 bg-slate-900 rounded">{stat.icon}</div>
                <div className="text-left">
                  <p className="text-base font-extrabold text-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: CORE FEATURES ARCHITECTURE
         ========================================== */}
      <section className="py-20 bg-slate-900 border-b border-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl font-extrabold text-white font-sans">
              Engineered for High-Performance Devs
            </h2>
            <p className="text-gray-400 font-sans">
              A secured, robust ecosystem designed to trade production-ready
              source codes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 bg-primary/40 border border-gray-800 rounded-global hover:border-emerald-500/30 transition-all group"
              >
                <div className="p-2.5 bg-slate-800 w-fit rounded mb-4 group-hover:bg-emerald-500/10 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 font-sans">
                  {feat.title}{" "}
                  <ArrowUpRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                </h3>
                <p className="text-gray-500 font-sans leading-relaxed text-[11px]">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: TOP EXPLORE CATEGORIES
         ========================================== */}
      <section className="py-16 bg-primary border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white font-sans">
              Browse by Stack Architecture
            </h2>
            <p className="text-gray-500 text-[11px] font-sans">
              Filter through modules that map to your infrastructure pipeline.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-900 border border-gray-800 rounded-global hover:bg-slate-900/80 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-accent">{cat.icon}</div>
                  <span className="text-white font-semibold text-[11px] font-sans">
                    {cat.name}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 bg-slate-950 px-2 py-0.5 rounded border border-gray-800 group-hover:text-accent group-hover:border-accent/30">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: TRENDING PREMIUM PRODUCTS
         ========================================== */}
      <section className="py-20 bg-slate-900 border-b border-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl font-extrabold text-white font-sans">
                Trending Repositories
              </h2>
              <p className="text-gray-400 font-sans">
                Hand-picked verified codebase assets ready to push to
                production.
              </p>
            </div>
            <Link
              href="/explore"
              className="text-accent hover:underline text-[11px] font-semibold mt-2 sm:mt-0"
            >
              View All Repos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyProducts.map((product) => (
              <div
                key={product.id}
                className="bg-primary/60 border border-gray-800 rounded-global overflow-hidden flex flex-col justify-between hover:border-gray-700 transition-all"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {product.category}
                    </span>
                    <span className="text-gray-500 text-[10px]">
                      {product.lang}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white flex items-start gap-2 font-sans">
                    <Terminal className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                    {product.title}
                  </h3>
                </div>
                <div className="p-4 bg-slate-950/60 border-t border-gray-800/80 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-white">
                    {product.price}
                  </span>
                  <button className="flex items-center gap-1.5 bg-accent hover:bg-emerald-600 text-primary font-bold px-3 py-1.5 rounded text-[10px] transition-colors">
                    <ShoppingCart className="h-3 w-3" /> Get Asset
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: PLATFORM TECHNICAL FAQs
         ========================================== */}
      <section className="py-20 bg-primary border-b border-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl font-extrabold text-white font-sans">
              System Documentation & FAQ
            </h2>
            <p className="text-gray-500 font-sans">
              Everything you need to know about purchasing and uploading
              modules.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-800 bg-slate-900 rounded-global overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-4 flex items-center justify-between text-white hover:bg-slate-800/50"
                >
                  <span className="font-semibold text-[11px] flex items-center gap-2 font-sans">
                    <HelpCircle className="h-3.5 w-3.5 text-accent" /> {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${openFaq === index ? "rotate-180 text-accent" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 pt-1 text-gray-400 font-sans leading-relaxed text-[11px] border-t border-gray-800/40 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: NEWSLETTER & PIPELINE CTA
         ========================================== */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900 border border-gray-800 text-[10px] text-gray-400">
            <Radio className="h-3 w-3 text-accent animate-pulse" />{" "}
            DEV_STREAM_PIPELINE
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-sans tracking-tight">
            Never Miss Production-Ready Releases
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-sans leading-relaxed">
            Subscribe to receive hot-fixes, fresh TypeScript boilerplate alerts,
            and elite developer toolkits directly in your inbox. No spam. Only
            source files.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-md mx-auto flex items-center gap-2 border border-gray-800 bg-primary/80 p-1.5 rounded-global"
          >
            <input
              type="email"
              placeholder="dev@domain.com"
              className="bg-transparent text-white px-3 py-2 w-full focus:outline-none placeholder:text-gray-600 text-[11px]"
              required
            />
            <button
              type="submit"
              className="bg-accent hover:bg-emerald-600 text-primary font-bold px-4 py-2 rounded text-[11px] transition-colors whitespace-nowrap"
            >
              Connect Webhook
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
