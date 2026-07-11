"use client";

import Link from "next/link";
import { Terminal, Cpu, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 font-mono text-xs border-t border-gray-900 py-12 mt-auto selection:bg-accent selection:text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info & System Status */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent animate-pulse" />
              <span className="font-extrabold tracking-wider text-white text-sm">
                DEV<span className="text-accent">CRAFT //{">"}</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-500 max-w-sm font-sans leading-relaxed">
              A premium repository built on clean abstractions, rigid TypeScript
              types, and zero-overhead native architecture.
            </p>
            {/* System Live Monitoring Mock */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational (MongoDB Node)</span>
            </div>
          </div>

          {/* Core Routes Links */}
          <div>
            <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-3 border-l-2 border-accent pl-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link
                  href="/explore"
                  className="hover:text-accent transition-colors flex items-center gap-1 group"
                >
                  ~_explore_marketplace{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/items/add"
                  className="hover:text-accent transition-colors flex items-center gap-1 group"
                >
                  ~_list_your_asset{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-accent transition-colors flex items-center gap-1 group"
                >
                  ~_identity_auth{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Infrastructure Metrics */}
          <div>
            <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-3 border-l-2 border-gray-700 pl-2">
              Architecture
            </h4>
            <ul className="space-y-1.5 text-[10px] text-gray-500">
              <li className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-gray-600" /> Engine: Next.js v14+
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-gray-600" /> Database: Native
                Driver
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-accent">TS</span> Strict Type Checked
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Timestamp */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600">
          <div>
            &copy; {new Date().getFullYear()} DEVCRAFT_MARKETPLACE.
            ALL_RIGHTS_RESERVED.
          </div>
          <div className="bg-slate-900 px-3 py-1 border border-gray-800 rounded text-[10px]">
            BUILD_STATUS:{" "}
            <span className="text-accent font-bold">SUCCESSFUL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
