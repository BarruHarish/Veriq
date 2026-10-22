"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, AlertTriangle, CheckCircle2, Layers } from "lucide-react";
import { useReturns } from "@/features/returns/returns-context";

export function TopNav() {
  const router = useRouter();
  const { returns, setSelectedId } = useReturns();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredMatches = searchQuery.trim()
    ? returns.filter(
        (r) =>
          r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.customerReason.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSearchQuery("");
    setIsSearchOpen(false);
    router.push("/workbench");
  };

  return (
    <header className="h-14 border-b border-[#E2E0D8] bg-[#FAF9F6] px-6 flex items-center justify-between sticky top-0 z-20 font-sans">
      {/* Search Input */}
      <div className="relative w-80 md:w-96">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="text"
            placeholder="Search return ID, customer, product, reason..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E2E0D8] focus:outline-none focus:border-ink-900 text-ink-900 placeholder:text-ink-400 font-sans"
          />
        </div>

        {/* Dropdown */}
        {isSearchOpen && searchQuery.trim() && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#E2E0D8] shadow-md z-50 py-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-ink-500 border-b border-[#E2E0D8] flex justify-between items-center">
              <span>Matching Returns</span>
              <span>{filteredMatches.length} results</span>
            </div>
            {filteredMatches.length === 0 ? (
              <div className="p-3 text-xs text-ink-500 font-serif">
                No matching return requests found.
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {filteredMatches.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="w-full text-left px-3 py-2 hover:bg-ivory-100 flex items-center justify-between border-b border-ivory-200 last:border-b-0"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-ink-900">
                        {item.id} · <span className="font-serif font-normal text-ink-700">{item.customerName}</span>
                      </div>
                      <div className="text-[11px] text-ink-500 truncate max-w-[240px]">
                        {item.productName}
                      </div>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 border ${
                        item.predictedAction === "AUTO-APPROVE"
                          ? "bg-jade-50 text-jade-700 border-jade-200"
                          : item.predictedAction === "INSPECT"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {item.predictedAction}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E0D8] text-ink-600 text-xs font-mono">
          <Layers className="w-3.5 h-3.5 text-ink-500" />
          <span>Local Simulation (v0.2)</span>
        </div>

        {/* Operational Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-ink-600 hover:text-ink-900 hover:bg-ivory-200 transition-colors relative border border-[#E2E0D8] bg-white"
            title="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-cobalt-700"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-1.5 w-80 bg-white border border-[#E2E0D8] shadow-lg z-50 p-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E0D8]">
                <span className="text-xs font-mono uppercase font-bold text-ink-900">Operational Alerts</span>
                <span className="text-[10px] font-mono text-ink-400">Prototype Demo</span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Dataset Pending:</span> Official 60k challenge dataset awaiting upload.
                  </div>
                </div>
                <div className="p-2.5 bg-ivory-100 border border-ivory-300 text-ink-900 text-[11px] flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-jade-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Fit Alert:</span> Vintage Indigo Jeans shows 20% fit variance cluster.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-3 border-l border-[#E2E0D8]">
          <div className="w-7 h-7 bg-[#171717] text-white font-mono font-bold text-xs flex items-center justify-center">
            OP
          </div>
          <div className="hidden lg:block text-left text-xs leading-tight">
            <div className="font-serif font-bold text-ink-900">Ops Reviewer</div>
            <div className="text-[10px] font-mono text-ink-500">Talent AP R2</div>
          </div>
        </div>
      </div>
    </header>
  );
}
