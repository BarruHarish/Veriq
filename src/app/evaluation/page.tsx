"use client";

import React, { useState } from "react";
import {
  BarChart3,
  AlertTriangle,
  Scale,
  CheckCircle2,
  HelpCircle,
  Clock,
  Shield,
  FileSpreadsheet,
} from "lucide-react";

export default function EvaluationCenterPage() {
  const [selectedExplainer, setSelectedExplainer] = useState<string>("cost");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Evaluation & Cost Matrix Center
            </h1>
            <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
              Official Evaluation Pending
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official evaluation pending — upload the challenge dataset and verify the published cost matrix.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white border border-slate-200 rounded px-3 py-1.5 shadow-sm">
          Challenge: <strong className="text-slate-800">Problem Statement R2</strong>
        </div>
      </div>

      {/* Prominent Pending Callout */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2.5 bg-amber-100 text-amber-800 rounded-md shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Official Evaluation Awaiting Dataset Upload
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            In compliance with hackathon integrity guidelines, no fabricated benchmark scores, precision/recall claims, or official cost-weighted losses are displayed. Once the official 60,000-record dataset and published cost matrix are uploaded, verified validation metrics will generate here automatically.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
              Ground-truth: Not Connected
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
              Cost-Weighted Loss: Not Calculated
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
              Fairness Parity: Pending Labeled Cohorts
            </span>
          </div>
        </div>
      </div>

      {/* Explanatory Cost Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Illustrative Cost Matrix Architecture */}
        <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                Illustrative Asymmetric Cost Matrix
              </h2>
              <div className="text-[11px] text-slate-400">
                Example architectural specification · Not an official hackathon score
              </div>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
              Hypothetical Weights
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            In fashion e-commerce returns, misclassifying a genuine customer as suspicious inflicts heavy lifetime value destruction (NPS churn), whereas manual inspection incurs only fractional operational labor cost.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                  <th className="py-2.5 px-3 text-left">Actual State \ System Decision</th>
                  <th className="py-2.5 px-3 text-emerald-700">Auto-Approve</th>
                  <th className="py-2.5 px-3 text-amber-700">Inspect</th>
                  <th className="py-2.5 px-3 text-rose-700">Escalate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-3 text-left font-semibold bg-slate-50/50">Genuine Grievance</td>
                  <td className="py-3 px-3 text-emerald-600 font-bold bg-emerald-50/20">₹0 (Optimal)</td>
                  <td className="py-3 px-3 text-amber-700 bg-amber-50/20">₹25 (QA Labor)</td>
                  <td className="py-3 px-3 text-rose-700 font-bold bg-rose-50/30">₹500+ (High NPS Churn Penalty)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-left font-semibold bg-slate-50/50">Suspicious Return Pattern</td>
                  <td className="py-3 px-3 text-rose-700 font-bold bg-rose-50/30">₹Order Value (Full Fraud Loss)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold bg-emerald-50/20">₹25 (Interception Cost)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold bg-emerald-50/20">₹0 (Fraud Averted)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-amber-50/60 rounded border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
            <strong>Hackathon Compliance Notice:</strong> The cost values above illustrate how Veriq will optimize its probability thresholds once the jury publishes the official challenge penalty matrix.
          </div>
        </div>

        {/* Right Column: "How Evaluation Works" Educational Panel */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              How Evaluation Works in Production
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            {/* Topic 1 */}
            <div className="p-3 rounded-md bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 block">1. Why False Blocks Carry High Penalties</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Treating a loyal buyer with a legitimate sizing issue as fraudulent permanently destroys brand equity. Asymmetric cost penalties force the model to prefer "INSPECT" over false escalation.
              </p>
            </div>

            {/* Topic 2 */}
            <div className="p-3 rounded-md bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 block">2. Why Raw Accuracy is Insufficient</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Because genuine returns constitute 85-95% of returns volume, a naive model that auto-approves everything achieves 90% accuracy while failing on fraud prevention. Macro-F1 and cost-weighted loss are required.
              </p>
            </div>

            {/* Topic 3 */}
            <div className="p-3 rounded-md bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 block">3. Why Probability Calibration Matters</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Uncalibrated deep learning networks produce overconfident probabilities. Platt scaling or isotonic regression ensures that a 70% risk estimate reflects true empirical risk.
              </p>
            </div>

            {/* Topic 4 */}
            <div className="p-3 rounded-md bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 block">4. Fair Held-Out Evaluation</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Fairness audits across language dialects (Hinglish/transliterated terms) must be verified on out-of-sample data to ensure linguistic equity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
