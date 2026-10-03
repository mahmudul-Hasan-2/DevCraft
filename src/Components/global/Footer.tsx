"use client";

import Link from "next/link";
import { Terminal, Cpu, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] text-slate-400 font-mono text-xs border-t border-slate-800/80 py-12 selection:bg-cyan-500/20 selection:text-cyan-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info & System Status */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="font-extrabold tracking-wider text-white text-sm">
                DEV<span className="text-cyan-400">CRAFT //{">"}</span>
              </span>
            </div>
            <p className="text-[12px] text-slate-400 max-w-sm font-sans leading-relaxed">
              A premium repository built on clean abstractions, rigid TypeScript
              types, and zero-overhead native architecture.
            </p>
            {/* System Live Monitoring Mock */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational (MongoDB Node)</span>
            </div>
          </div>

          {/* Core Routes Links */}
          <div>
            <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-4 border-l-2 border-cyan-400 pl-2.5">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-[11px]">
              <li>
                <Link
                  href="/explore"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group w-fit"
                >
                  <span className="text-slate-500 group-hover:text-cyan-400">
                    ~_
                  </span>
                  explore_marketplace
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/items/add"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group w-fit"
                >
                  <span className="text-slate-500 group-hover:text-cyan-400">
                    ~_
                  </span>
                  list_your_asset
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group w-fit"
                >
                  <span className="text-slate-500 group-hover:text-cyan-400">
                    ~_
                  </span>
                  identity_auth
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Infrastructure Metrics */}
          <div>
            <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-4 border-l-2 border-slate-700 pl-2.5">
              Architecture
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-slate-500" />
                <span>Engine: Next.js v14+</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-slate-500" />
                <span>Database: Native Driver</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold text-[10px] bg-cyan-400/10 px-1 rounded">
                  TS
                </span>
                <span>Strict Type Checked</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Timestamp */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} DEVCRAFT_MARKETPLACE.
            ALL_RIGHTS_RESERVED.
          </div>
          <div className="bg-slate-900/80 px-3 py-1.5 border border-slate-800 rounded-lg text-[10px] flex items-center gap-2">
            <span className="text-slate-400">BUILD_STATUS:</span>
            <span className="text-cyan-400 font-bold">SUCCESSFUL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
