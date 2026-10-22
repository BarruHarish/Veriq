"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Sparkles,
  Scale,
  Shirt,
  BarChart3,
  Database,
  RefreshCw,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReturns } from "@/features/returns/returns-context";
import { VeriqLogo } from "@/components/ui/veriq-logo";

const navItems = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Returns Queue", href: "/queue", icon: Inbox },
  { name: "Decision Workbench", href: "/workbench", icon: Sparkles },
  { name: "Fairness Center", href: "/fairness", icon: Scale },
  { name: "Fit Intelligence", href: "/fit-intelligence", icon: Shirt },
  { name: "Evaluation Center", href: "/evaluation", icon: BarChart3 },
  { name: "Dataset & Model", href: "/dataset", icon: Database },
];

export function Sidebar() {
  const pathname = usePathname();
  const { returns, resetAll } = useReturns();

  const pendingCount = returns.filter((r) => r.humanReviewStatus === "PENDING_REVIEW").length;

  return (
    <aside className="w-64 border-r border-[#E2E0D8] bg-[#FAF9F6] flex flex-col h-screen fixed left-0 top-0 z-30 select-none font-sans">
      {/* Brand Header with VeriqLogo */}
      <div className="p-4 border-b border-[#E2E0D8] flex items-center justify-between bg-white">
        <Link href="/" className="flex items-center">
          <VeriqLogo size="md" variant="compact" />
        </Link>
      </div>

      {/* Demo Status Banner */}
      <div className="mx-3 mt-3 p-3 bg-white border border-[#E2E0D8] text-[11px] text-slate-800">
        <div className="font-mono text-[9px] uppercase tracking-wider text-amber-700 flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          DEMO MODE · SYNTHETIC DATA
        </div>
        <p className="mt-1 text-slate-600 text-[10.5px] leading-relaxed font-serif">
          Deterministic sample records. Official challenge dataset pending upload.
        </p>
      </div>

      {/* Nav list */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2 py-1 flex items-center justify-between">
          <span>Workspace</span>
          <Link href="/" className="hover:text-slate-900 flex items-center gap-1 text-[10px] text-slate-500">
            <Home className="w-3 h-3" />
            <span>Home</span>
          </Link>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors",
                isActive
                  ? "bg-[#0F172A] text-white font-medium"
                  : "text-slate-700 hover:text-slate-900 hover:bg-[#EFECE6]"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "w-3.5 h-3.5",
                    isActive ? "text-white" : "text-slate-400"
                  )}
                />
                <span className="tracking-tight">{item.name}</span>
              </div>
              {item.name === "Returns Queue" && pendingCount > 0 && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 text-[9px] font-mono font-bold",
                    isActive
                      ? "bg-white text-slate-900"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  )}
                >
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Reset State Control & Footer */}
      <div className="p-3 border-t border-[#E2E0D8] space-y-2 bg-white">
        <button
          onClick={resetAll}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-mono text-slate-700 hover:text-slate-900 hover:bg-[#FAF9F6] py-1.5 px-2 border border-[#E2E0D8] transition-colors"
          title="Reset simulated review choices back to starting state"
        >
          <RefreshCw className="w-3 h-3 text-slate-500" />
          <span>Reset Demo Actions</span>
        </button>

        <div className="p-2 text-[10px] font-mono text-slate-500 border border-[#E2E0D8] bg-[#FAF9F6]">
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>Talent AP Hackathon</span>
            <span>R2</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Returns Fraud vs. Grievance
          </div>
        </div>
      </div>
    </aside>
  );
}
