import React from "react";
import { CheckCircle2, AlertTriangle, HelpCircle, FileText, ShieldAlert } from "lucide-react";

interface EvidencePanelProps {
  observedFacts: string[];
  policySignals: string[];
  genuineEvidence: string[];
  riskIndicators: string[];
  missingInformation: string[];
  applicablePolicyCondition: string;
}

export function EvidencePanel({
  observedFacts,
  policySignals,
  genuineEvidence,
  riskIndicators,
  missingInformation,
  applicablePolicyCondition,
}: EvidencePanelProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold text-slate-800 tracking-tight uppercase flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            Separated Evidence Panel
          </h3>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Distinguishing observed facts from inferences
          </div>
        </div>
        <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          Ground-Truth Signals
        </span>
      </div>

      {/* Applicable Policy Section */}
      <div className="p-2.5 rounded bg-indigo-50/50 border border-indigo-100 text-xs">
        <span className="font-semibold text-indigo-950 block text-[11px] uppercase tracking-wider">
          Applicable Return Policy Condition:
        </span>
        <p className="text-indigo-900 mt-0.5 leading-relaxed text-[11px]">
          {applicablePolicyCondition}
        </p>
      </div>

      {/* 1. Observed Facts */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
          <span className="w-2 h-2 rounded-full bg-slate-700"></span>
          <span>Observed Facts ({observedFacts.length})</span>
        </div>
        <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc marker:text-slate-400">
          {observedFacts.map((fact, idx) => (
            <li key={idx} className="leading-relaxed">
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Genuine Complaint Indicators */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Evidence Supporting Genuine Complaint ({genuineEvidence.length})</span>
        </div>
        <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc marker:text-emerald-500">
          {genuineEvidence.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Relevant Policy Signals */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-800">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          <span>Relevant Policy Signals ({policySignals.length})</span>
        </div>
        <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc marker:text-indigo-400">
          {policySignals.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Potential Risk Indicators */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Potential Risk Indicators ({riskIndicators.length})</span>
        </div>
        <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc marker:text-rose-400">
          {riskIndicators.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Missing or Uncertain Information */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Missing or Uncertain Information ({missingInformation.length})</span>
        </div>
        <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc marker:text-amber-500">
          {missingInformation.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-[10.5px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed">
        <strong>Fairness Principle:</strong> Missing or ambiguous information is never treated as proof of fraud. When critical facts are missing, policy requires routing to human inspection.
      </div>
    </div>
  );
}
