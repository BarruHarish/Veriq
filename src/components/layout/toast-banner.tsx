"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useReturns } from "@/features/returns/returns-context";

export function ToastBanner() {
  const { toastMessage, clearToast } = useReturns();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="font-medium">{toastMessage}</span>
      <button
        onClick={clearToast}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
