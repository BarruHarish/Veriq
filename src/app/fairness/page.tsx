"use client";

import React, { useState } from "react";
import {
  Scale,
  AlertTriangle,
  Info,
  ShieldCheck,
  Languages,
  Clock,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useReturns } from "@/features/returns/returns-context";

export default function FairnessCenterPage() {
  const { returns } = useReturns();
  const [activeTab, setActiveTab] = useState<"language" | "tenure" | "value">("language");

  const total = returns.length;

  // Language Breakdown
  const languageGroups = ["English", "Hinglish", "Telugu/Hinglish"];
  const languageData = languageGroups.map((lang) => {
    const subset = returns.filter((r) => r.detectedLanguage === lang);
    const count = subset.length;
    const autoApprove = subset.filter((r) => r.predictedAction === "AUTO-APPROVE").length;
    const inspect = subset.filter((r) => r.predictedAction === "INSPECT").length;
    const escalate = subset.filter((r) => r.predictedAction === "ESCALATE").length;
    return {
      group: lang,
      count,
      autoApprovePct: count ? Math.round((autoApprove / count) * 100) : 0,
      inspectPct: count ? Math.round((inspect / count) * 100) : 0,
      escalatePct: count ? Math.round((escalate / count) * 100) : 0,
    };
  });

  // Tenure Breakdown
  const tenureTiers = ["New (0-3m)", "Mid (4-12m)", "Established (12m+)"] as const;
  const tenureData = tenureTiers.map((tier) => {
    const subset = returns.filter((r) => r.customerTenureTier === tier);
    const count = subset.length;
    const autoApprove = subset.filter((r) => r.predictedAction === "AUTO-APPROVE").length;
    const inspect = subset.filter((r) => r.predictedAction === "INSPECT").length;
    const escalate = subset.filter((r) => r.predictedAction === "ESCALATE").length;
    return {
      group: tier,
      count,
      autoApprovePct: count ? Math.round((autoApprove / count) * 100) : 0,
      inspectPct: count ? Math.round((inspect / count) * 100) : 0,
      escalatePct: count ? Math.round((escalate / count) * 100) : 0,
    };
  });

  // Order Value Breakdown
  const valueTiers = ["Low (<₹1k)", "Mid (₹1k-₹3k)", "High (>₹3k)"] as const;
  const valueData = valueTiers.map((tier) => {
    const subset = returns.filter((r) => r.valueTier === tier);
    const count = subset.length;
    const autoApprove = subset.filter((r) => r.predictedAction === "AUTO-APPROVE").length;
    const inspect = subset.filter((r) => r.predictedAction === "INSPECT").length;
    const escalate = subset.filter((r) => r.predictedAction === "ESCALATE").length;
    return {
      group: tier,
      count,
      autoApprovePct: count ? Math.round((autoApprove / count) * 100) : 0,
      inspectPct: count ? Math.round((inspect / count) * 100) : 0,
      escalatePct: count ? Math.round((escalate / count) * 100) : 0,
    };
  });

  const activeDataset =
    activeTab === "language"
      ? languageData
      : activeTab === "tenure"
      ? tenureData
      : valueData;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Fairness & Bias Audit Center
            </h1>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Auditing Suite
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empirical monitoring of decision routing parity across language, customer tenure, and purchase basket size.
          </p>
        </div>

        <div className="text-xs bg-amber-50 text-amber-900 border border-amber-200 rounded-md px-3 py-1.5 font-medium flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Demo observations only — Not proof of algorithmic fairness</span>
        </div>
      </div>

      {/* Critical Guidance Banner */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 text-xs text-slate-700 leading-relaxed space-y-1.5">
        <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-tight text-[11px]">
          <Scale className="w-4 h-4 text-indigo-600" />
          <span>Core Ethical Guardrails</span>
        </div>
        <p>
          <strong>Rate differences are investigation signals, not proof of discrimination.</strong> In retail fraud analytics, true fraud risk may correlate with order value tiers, but must never disproportionately penalize vernacular expressions (Hinglish, transliterated regional phrases) or brand-new genuine shoppers.
        </p>
        <p className="text-slate-500 text-[11px]">
          Official disparate impact ratios, true positive parity, and error-rate parity require the held-out 60,000 challenge ground-truth dataset. Below charts report live metrics computed over active synthetic sample cases.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab("language")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "language"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>Customer Language (Hinglish vs. English)</span>
        </button>

        <button
          onClick={() => setActiveTab("tenure")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "tenure"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Customer Tenure Tiers</span>
        </button>

        <button
          onClick={() => setActiveTab("value")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "value"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Order Value Tiers</span>
        </button>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                Routing Action Rates by {activeTab.toUpperCase()} (%)
              </h2>
              <span className="text-[10px] text-slate-400">Sample distribution (n={total})</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-4">
              Comparing Auto-Approve, Inspect, and Escalate percentages across subgroups.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeDataset} margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
                  <XAxis dataKey="group" fontSize={11} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
                  <YAxis fontSize={11} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} unit="%" />
                  <Tooltip
                    contentStyle={{ fontSize: "11px", borderRadius: "6px" }}
                    formatter={(val: any) => [`${val}%`, ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                  <Bar dataKey="autoApprovePct" name="Auto-Approve" fill="#10b981" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="inspectPct" name="Inspect" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="escalatePct" name="Escalate" fill="#ef4444" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Synthetic sample observation</span>
            <span className="text-indigo-600 font-medium">NLP Intent Fairness Active</span>
          </div>
        </div>

        {/* Breakdown Summary Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight mb-2">
              Cohort Breakdown Table
            </h3>
            <div className="space-y-3">
              {activeDataset.map((item) => (
                <div key={item.group} className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>{item.group}</span>
                    <span className="text-[10px] text-slate-500">n={item.count}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-center pt-1 border-t border-slate-200">
                    <div>
                      <span className="text-slate-400 block">Approve</span>
                      <strong className="text-emerald-700">{item.autoApprovePct}%</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Inspect</span>
                      <strong className="text-amber-700">{item.inspectPct}%</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Escalate</span>
                      <strong className="text-rose-700">{item.escalatePct}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5 text-[11px]">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Audit Requirement Note</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              When full challenge data is connected, this module calculates Disparate Impact (Four-Fifths Rule) and equalized odds error matrices to guarantee that genuine complaints in regional languages receive the same auto-approval velocity as English complaints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
