"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDownRight, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export function DecisionMap() {
  return (
    <div className="w-full bg-white border border-[#E2E0D8] p-6 shadow-sm relative font-sans">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E0D8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-[10px] font-mono tracking-widest text-[#525252] uppercase font-semibold">
            Active Return Case Ingestion
          </span>
        </div>
        <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#EFECE6] text-[#525252] border border-[#E2E0D8] tracking-wider font-bold">
          SYNTHETIC DEMO
        </span>
      </div>

      {/* Case Header Strip */}
      <div className="mt-4 p-4 bg-[#FAF9F6] border border-[#E2E0D8]">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider font-semibold">
              RET-8941 · Denim & Jeans
            </div>
            <div className="text-base font-serif font-bold text-[#171717] mt-0.5">
              Vintage Indigo Slim Jeans
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs font-mono font-bold text-[#171717]">₹2,499</div>
            <div className="text-[10px] text-[#737373] font-mono">Size 32W · 2d Transit</div>
          </div>
        </div>

        {/* Customer Statement */}
        <div className="mt-3 pt-2.5 border-t border-[#E2E0D8] flex items-start gap-2">
          <span className="text-[10px] font-mono text-[#737373] shrink-0 uppercase tracking-wider mt-0.5 font-bold">
            Customer Voice:
          </span>
          <div className="text-xs text-[#262626] italic font-serif">
            "Jeans chala tight ga undi, size correct kaadu."
            <span className="not-italic text-[10.5px] text-[#525252] block font-sans mt-0.5 font-normal">
              Verified English Translation: <em>"Jeans are very tight, the size is not correct."</em>
            </span>
          </div>
        </div>
      </div>

      {/* Three Converging Evidence Channels */}
      <div className="mt-6">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#737373] mb-3 flex items-center gap-1.5 font-semibold">
          <span>Converging Evidence Channels</span>
          <ArrowDownRight className="w-3 h-3 text-[#737373]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Stream 1 */}
          <div className="p-3 bg-[#FAF9F6] border border-[#E2E0D8] relative">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#1d4ed8] font-bold">
              01 · Order Context
            </div>
            <ul className="mt-2 space-y-1 text-[11px] text-[#404040] leading-snug">
              <li className="flex items-start gap-1">
                <span className="text-[#737373] font-mono">▪</span>
                <span>Established buyer (18m tenure)</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#737373] font-mono">▪</span>
                <span>Prior return rate 12% (&lt; threshold)</span>
              </li>
            </ul>
          </div>

          {/* Stream 2 */}
          <div className="p-3 bg-[#FAF9F6] border border-[#E2E0D8] relative">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#047857] font-bold">
              02 · Customer Intent
            </div>
            <ul className="mt-2 space-y-1 text-[11px] text-[#404040] leading-snug">
              <li className="flex items-start gap-1">
                <span className="text-[#737373] font-mono">▪</span>
                <span>Direct physical fit grievance</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#737373] font-mono">▪</span>
                <span>Telugu vernacular clarity</span>
              </li>
            </ul>
          </div>

          {/* Stream 3 */}
          <div className="p-3 bg-[#FAF9F6] border border-[#E2E0D8] relative">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#d97706] font-bold">
              03 · Policy & Catalog
            </div>
            <ul className="mt-2 space-y-1 text-[11px] text-[#404040] leading-snug">
              <li className="flex items-start gap-1">
                <span className="text-[#737373] font-mono">▪</span>
                <span>Zero fraud velocity signatures</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-[#737373] font-mono">▪</span>
                <span>Catalog shows 20% fit variance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Connector Flow Indicator */}
        <div className="my-3 flex items-center justify-center">
          <div className="h-6 w-px bg-[#E2E0D8]"></div>
        </div>
      </div>

      {/* Central Decision Outcome */}
      <div className="p-4 bg-[#171717] text-[#FAF9F6] border border-[#262626]">
        <div className="flex items-center justify-between pb-2 border-b border-[#404040]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#EFECE6] font-semibold">
              Operational Recommendation
            </span>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 border border-amber-500/40">
            ROUTE: INSPECT
          </span>
        </div>

        <p className="mt-3 text-xs text-[#EFECE6] font-serif leading-relaxed italic">
          "Fit-related complaint identified on slim denim item. Available evidence is insufficient to determine whether product guidance is inaccurate or selected size is unsuitable. Route to physical inspection or size exchange rather than accusing the customer."
        </p>

        <div className="mt-3 pt-2.5 border-t border-[#404040] flex items-center justify-between text-[10px] font-mono text-[#C9C6BD]">
          <span>Human Sign-Off Required</span>
          <Link
            href="/workbench"
            className="text-white hover:underline flex items-center gap-1 font-sans font-semibold"
          >
            Open in Workbench <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
