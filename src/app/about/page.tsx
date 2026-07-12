"use client";

import { Info, Shield, Zap, Users } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Secure Management",
      desc: "Your assets are protected with strict user isolation and robust MongoDB security protocols.",
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: "Blazing Fast Performance",
      desc: "Built on Next.js 14+ with instant state updates and server-side synchronized refreshing.",
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "User-Centric UI",
      desc: "An intuitive dark-themed interface crafted with Tailwind CSS for ultimate user experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Info className="h-3.5 w-3.5" /> About Our Platform
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Manage Assets with Confidence
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
            Welcome to the ultimate Asset Management Dashboard. We empower
            developers and creators to organize, track, and optimize their
            digital inventory seamlessly.
          </p>
        </div>

        <hr className="border-zinc-800" />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl shadow-xl space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl w-fit">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-100">{feat.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="p-8 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-blue-950/20 border border-zinc-800 rounded-2xl space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">Our Core Mission</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
            We believe that managing assets shouldn't be a tedious chore. By
            bridging high-performance data processing with clean UI components,
            we build a workflow that feels natural, fast, and entirely localized
            to your account privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
