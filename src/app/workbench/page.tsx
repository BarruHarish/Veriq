"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle,
  Search,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Package,
  Ruler,
  AlertCircle,
  History,
  Languages,
  AlertTriangle,
  X,
} from "lucide-react";
import { useReturns } from "@/features/returns/returns-context";
import { formatCurrency } from "@/lib/utils";
import { EvidencePanel } from "@/features/returns/evidence-panel";
import { CustomerResolutionMessage } from "@/features/returns/customer-resolution-message";
import { HumanReviewStatus } from "@/types";

export default function DecisionWorkbenchPage() {
  const { returns, selectedId, selectedReturn, setSelectedId, updateDecision } = useReturns();
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [overrideReason, setOverrideReason] = useState("");

  // Confirmation modal state
  const [pendingAction, setPendingAction] = useState<HumanReviewStatus | null>(null);

  if (!selectedReturn) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading return request data...
      </div>
    );
  }

  const currentIndex = returns.findIndex((r) => r.id === selectedId);
  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedId(returns[currentIndex - 1].id);
      setReviewerNotes("");
      setOverrideReason("");
    }
  };
  const handleNext = () => {
    if (currentIndex < returns.length - 1) {
      setSelectedId(returns[currentIndex + 1].id);
      setReviewerNotes("");
      setOverrideReason("");
    }
  };

  // Determine if chosen action is an override of the model's suggested route
  const modelToStatusMap = {
    "AUTO-APPROVE": "APPROVED",
    INSPECT: "SENT_FOR_INSPECTION",
    ESCALATE: "ESCALATED",
  };
  const isSelectedAnOverride =
    pendingAction && modelToStatusMap[selectedReturn.predictedAction] !== pendingAction;

  const triggerActionModal = (status: HumanReviewStatus) => {
    setPendingAction(status);
  };

  const confirmAction = () => {
    if (!pendingAction) return;

    if (isSelectedAnOverride && !overrideReason.trim()) {
      alert("Policy requirement: Reviewer override reason is mandatory when deviating from the suggested route.");
      return;
    }

    updateDecision(selectedReturn.id, pendingAction, reviewerNotes, overrideReason);
    setPendingAction(null);
    setReviewerNotes("");
    setOverrideReason("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Interactive Decision Workbench
            </h1>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Operations Reviewer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Carefully inspect customer grievance evidence, separated facts, and policy conditions before recording an auditable operational decision.
          </p>
        </div>

        {/* Case Selector Dropdown & Nav */}
        <div className="flex items-center gap-2">
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setReviewerNotes("");
              setOverrideReason("");
            }}
            className="text-xs font-semibold bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
          >
            {returns.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} · {r.customerName} ({r.predictedAction})
              </option>
            ))}
          </select>

          <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm overflow-hidden">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200"
              title="Previous Case"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] px-2.5 font-medium text-slate-500">
              {currentIndex + 1} / {returns.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === returns.length - 1}
              className="p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
              title="Next Case"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Split Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Case Summary & Customer Message (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Case Summary */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-mono">Return ID</span>
                <div className="text-base font-bold text-slate-900">{selectedReturn.id}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono">Order ID</span>
                <div className="text-xs font-semibold text-slate-700">{selectedReturn.orderId}</div>
              </div>
            </div>

            {/* Profile & Financials */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" /> Customer Profile
                </div>
                <div className="font-semibold text-slate-800 mt-1">{selectedReturn.customerName}</div>
                <div className="text-[11px] text-slate-500">
                  Tenure: {selectedReturn.customerTenureMonths} mos ({selectedReturn.customerTenureTier})
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1">
                  <Package className="w-3 h-3 text-slate-400" /> Order Details
                </div>
                <div className="font-semibold text-slate-800 mt-1">{formatCurrency(selectedReturn.orderValue)}</div>
                <div className="text-[11px] text-slate-500">
                  Requested: {selectedReturn.requestDate} · {selectedReturn.deliveryDays}d transit
                </div>
              </div>
            </div>

            {/* History sufficiency */}
            <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs">
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <History className="w-3 h-3 text-slate-400" /> Account Return History
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    selectedReturn.hasSufficientHistory
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {selectedReturn.hasSufficientHistory ? "Sufficient History" : "Insufficient History"}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-slate-700">
                <span>
                  Prior returns: <strong>{selectedReturn.returnHistoryCount}</strong>
                </span>
                <span>
                  Historical return rate: <strong>{Math.round(selectedReturn.returnHistoryRate * 100)}%</strong>
                </span>
              </div>
            </div>

            {/* Customer Message Section (Original + Translation) */}
            <div className="p-3.5 rounded-md bg-indigo-50/50 border border-indigo-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-900">
                <span className="flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-indigo-600" />
                  Original Customer Message
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-indigo-200 text-indigo-700 font-mono">
                  {selectedReturn.detectedLanguage}
                </span>
              </div>

              {/* Exact unedited message */}
              <blockquote className="text-xs font-mono text-slate-900 bg-white p-2.5 rounded border border-indigo-100 leading-relaxed italic">
                "{selectedReturn.customerReason}"
              </blockquote>

              {/* Translation if available */}
              {selectedReturn.customerReasonTranslation && (
                <div className="pt-2 border-t border-indigo-100/60">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                    Verified English Translation:
                  </div>
                  <div className="text-xs text-slate-700 bg-white/70 p-2 rounded border border-indigo-50 leading-relaxed">
                    "{selectedReturn.customerReasonTranslation}"
                  </div>
                </div>
              )}
            </div>

            {/* Product & Size Chart Information */}
            <div className="p-3.5 rounded bg-slate-50 border border-slate-100 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Product Specifications & Sizing</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {selectedReturn.productCategory}
                </span>
              </div>

              <div className="text-slate-900 font-medium">{selectedReturn.productName}</div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                <div>
                  Ordered Size: <strong className="text-slate-800">{selectedReturn.sizeChart.orderedSize}</strong>
                </div>
                <div>
                  Fit Type: <strong className="text-slate-800">{selectedReturn.sizeChart.fitType}</strong>
                </div>
                <div>
                  Body Guidance:{" "}
                  <span className="text-slate-700">{selectedReturn.sizeChart.recommendedWaistOrChest}</span>
                </div>
                {selectedReturn.sizeChart.stretchPercentage && (
                  <div>
                    Stretch: <span className="text-slate-700">{selectedReturn.sizeChart.stretchPercentage}</span>
                  </div>
                )}
              </div>

              {selectedReturn.sizeChart.returnRiskNote && (
                <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200 leading-relaxed">
                  <strong className="text-slate-700">Catalog Sizing Note:</strong>{" "}
                  {selectedReturn.sizeChart.returnRiskNote}
                </div>
              )}
            </div>
          </div>

          {/* Audit Trail Timeline */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Audit Trail ({selectedReturn.auditTrail.length})
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Immutable Log</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedReturn.auditTrail.map((ev) => (
                <div key={ev.id} className="text-xs p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-700">{ev.actor}</span>
                    <span>{ev.timestamp}</span>
                  </div>
                  <div className="font-medium text-slate-800">{ev.action}</div>
                  {ev.overrideReason && (
                    <div className="text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded border border-amber-200">
                      <strong>Override Justification:</strong> {ev.overrideReason}
                    </div>
                  )}
                  {ev.notes && <div className="text-slate-500 text-[11px] italic">"{ev.notes}"</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Recommendation, Reviewer Controls, Evidence & Assistant (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main AI Recommendation & Reviewer Actions Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                  Suggested Route & Category Prediction
                </h2>
              </div>
              <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                Illustrative Logic · Synthetic Demo
              </span>
            </div>

            {/* Separate Predicted Category from Routing Recommendation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Category prediction */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Predicted Category
                </span>
                <div className="text-sm font-bold text-slate-800 mt-1 capitalize">
                  {selectedReturn.predictedCategory.replace(/_/g, " ")}
                </div>
                <div className="text-[10.5px] text-slate-500 mt-0.5">
                  Tone/language is evaluated separately from grievance validity.
                </div>
              </div>

              {/* Suggested routing action */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Suggested Routing Route
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`text-sm font-extrabold px-2.5 py-0.5 rounded border ${
                      selectedReturn.predictedAction === "AUTO-APPROVE"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : selectedReturn.predictedAction === "INSPECT"
                        ? "bg-amber-100 text-amber-900 border-amber-300"
                        : "bg-rose-100 text-rose-800 border-rose-300"
                    }`}
                  >
                    {selectedReturn.predictedAction}
                  </span>
                </div>
                <div className="text-[10.5px] text-slate-500 mt-0.5">
                  Provisional recommendation requiring human sign-off.
                </div>
              </div>
            </div>

            {/* Current Review State */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Current Review Decision
                </span>
                <div className="mt-0.5 flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      selectedReturn.humanReviewStatus === "APPROVED"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedReturn.humanReviewStatus === "SENT_FOR_INSPECTION"
                        ? "bg-amber-100 text-amber-800"
                        : selectedReturn.humanReviewStatus === "ESCALATED"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {selectedReturn.humanReviewStatus.replace(/_/g, " ")}
                  </span>
                  {selectedReturn.isOverridden && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                      OPERATOR OVERRIDE
                    </span>
                  )}
                </div>
              </div>

              {selectedReturn.reviewedBy && (
                <div className="text-right text-[11px] text-slate-500">
                  <div>Decided by {selectedReturn.reviewedBy}</div>
                  <div className="text-[10px] text-slate-400">{selectedReturn.reviewedAt}</div>
                </div>
              )}
            </div>

            {/* Grounded Explanation */}
            <div className="text-xs p-3 rounded-md bg-indigo-50/40 border border-indigo-100 text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-1">Recommendation Explanation:</strong>
              "{selectedReturn.explanation}"
            </div>

            {/* Reviewer Action Controls */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                  Operations Review Actions
                </span>
                <span className="text-[10px] text-slate-400">Requires confirmation</span>
              </div>

              {/* Notes Input */}
              <div>
                <input
                  type="text"
                  placeholder="Record reviewer notes before signing off decision..."
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => triggerActionModal("APPROVED")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Approve Return
                </button>

                <button
                  onClick={() => triggerActionModal("SENT_FOR_INSPECTION")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  Request Inspection
                </button>

                <button
                  onClick={() => triggerActionModal("ESCALATED")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Escalate Case
                </button>
              </div>
            </div>
          </div>

          {/* Separated Evidence Panel */}
          <EvidencePanel
            observedFacts={selectedReturn.observedFacts}
            policySignals={selectedReturn.policySignals}
            genuineEvidence={selectedReturn.genuineEvidence}
            riskIndicators={selectedReturn.riskIndicators}
            missingInformation={selectedReturn.missingInformation}
            applicablePolicyCondition={selectedReturn.applicablePolicyCondition}
          />

          {/* Customer Response Assistant */}
          <CustomerResolutionMessage
            category={selectedReturn.predictedCategory}
            customerName={selectedReturn.customerName}
            reviewStatus={selectedReturn.humanReviewStatus}
          />
        </div>
      </div>

      {/* Confirmation & Override Dialog */}
      {pendingAction && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Confirm Decision: {pendingAction.replace(/_/g, " ")}
                </h3>
              </div>
              <button
                onClick={() => setPendingAction(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              You are about to sign off decision <strong>{pendingAction.replace(/_/g, " ")}</strong> for return{" "}
              <strong>{selectedReturn.id}</strong> ({selectedReturn.customerName}).
            </p>

            {isSelectedAnOverride && (
              <div className="p-3 bg-amber-50 rounded border border-amber-200 space-y-2 text-xs">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Reviewer Override Notice</span>
                </div>
                <p className="text-amber-900 text-[11px] leading-relaxed">
                  The model recommended <strong>{selectedReturn.predictedAction}</strong>. An explicit justification is mandatory to complete this override.
                </p>
                <textarea
                  rows={2}
                  placeholder="State the operational reason for this override..."
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-amber-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setPendingAction(null)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="px-4 py-1.5 rounded-md text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              >
                Confirm & Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
