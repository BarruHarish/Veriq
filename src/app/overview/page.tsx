"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CheckCircle,
  Search,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
  Scale,
  Sparkles,
  Shirt,
  Database,
  Layers,
  Inbox,
  UserCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { useReturns } from "@/features/returns/returns-context";
import { SYNTHETIC_PRODUCT_FIT_INSIGHTS } from "@/features/returns/sample-data";
import { formatCurrency } from "@/lib/utils";

export default function OverviewPage() {
  const { returns, setSelectedId } = useReturns();

  const totalCount = returns.length;
  const autoApproveCount = returns.filter((r) => r.predictedAction === "AUTO-APPROVE").length;
  const inspectCount = returns.filter((r) => r.predictedAction === "INSPECT").length;
  const escalateCount = returns.filter((r) => r.predictedAction === "ESCALATE").length;

  const reviewedCount = returns.filter((r) => r.humanReviewStatus !== "PENDING_REVIEW").length;
  const pendingCount = returns.filter((r) => r.humanReviewStatus === "PENDING_REVIEW").length;

  const categoryCounts: Record<string, number> = {};
  returns.forEach((r) => {
    categoryCounts[r.productCategory] = (categoryCounts[r.productCategory] || 0) + 1;
  });

  const categoryChartData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  const actionPieData = [
    { name: "AUTO-APPROVE", value: autoApproveCount, color: "#10b981" },
    { name: "INSPECT", value: inspectCount, color: "#f59e0b" },
    { name: "ESCALATE", value: escalateCount, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Operations Overview
            </h1>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Operational Workspace
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time workload metrics computed over active return records. Review pending cases and routing distributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/workbench"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Decision Workbench
          </Link>
          <Link
            href="/queue"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-md border border-slate-200 shadow-sm transition-colors"
          >
            <Inbox className="w-3.5 h-3.5 text-slate-400" />
            Returns Queue ({pendingCount})
          </Link>
        </div>
      </div>

      {/* Dataset & Model Status Callout */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100/70 text-amber-800 rounded-md mt-0.5 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
              <span>Environment Mode: Synthetic Demo Data</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                Official Dataset Pending
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              Official challenge dataset not uploaded. Decisions shown in demo mode are illustrative and are not produced by a trained model. Charts and metrics below reflect the active {totalCount} sample records.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <Link
            href="/dataset"
            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Inspect Dataset Status <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sample Records Pool */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Available Sample Records</span>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalCount}</span>
            <span className="text-[11px] text-slate-500">cases</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Pending review:</span>
            <span className="font-semibold text-amber-700">{pendingCount} cases</span>
          </div>
        </div>

        {/* Auto-Approve */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Auto-Approve
            </span>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
              {Math.round((autoApproveCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{autoApproveCount}</span>
            <span className="text-[11px] text-slate-500">low-risk genuine</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            Sub-₹1k or verified defect items
          </div>
        </div>

        {/* Inspect */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-amber-600" />
              Inspect
            </span>
            <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
              {Math.round((inspectCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{inspectCount}</span>
            <span className="text-[11px] text-slate-500">fit & quality review</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            Customer protected from wrongful accusation
          </div>
        </div>

        {/* Escalate */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Escalate
            </span>
            <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">
              {Math.round((escalateCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{escalateCount}</span>
            <span className="text-[11px] text-slate-500">high-risk flags</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            Luxury items & tag discrepancies
          </div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routing Distribution */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                Routing Distribution (Sample Data)
              </h2>
              <span className="text-[10px] text-slate-400">n={totalCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Provisional suggestion split calculated from active records.
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={actionPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {actionPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value} requests`, name]}
                    contentStyle={{ fontSize: "11px", borderRadius: "6px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-100 text-center">
            <div>
              <div className="text-[10px] text-slate-500">Approve</div>
              <div className="text-xs font-bold text-emerald-600">{autoApproveCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">Inspect</div>
              <div className="text-xs font-bold text-amber-600">{inspectCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">Escalate</div>
              <div className="text-xs font-bold text-rose-600">{escalateCount}</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                Returns by Category (Active Records)
              </h2>
              <span className="text-[10px] text-slate-400">Actual counts</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Category frequencies in the local dataset. Denim & Formal shirts lead return volume.
            </p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <XAxis
                    dataKey="name"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: "#e2e8f0" }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis fontSize={10} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
                  <Tooltip
                    contentStyle={{ fontSize: "11px", borderRadius: "6px" }}
                    formatter={(val: any) => [`${val} requests`, "Requests"]}
                  />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-[10.5px] text-slate-400 text-right">
            Synthetic demo fixture · Derived from 8 local return cases
          </div>
        </div>
      </div>

      {/* Recent Sample Requests & Fit Intelligence Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sample Requests */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                Recent Operations Requests
              </h2>
              <div className="text-[11px] text-slate-500">
                Click any case to open in Decision Workbench
              </div>
            </div>
            <Link
              href="/queue"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Full Queue <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {returns.slice(0, 5).map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedId(req.id)}
                className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3 transition-colors text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{req.id}</span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-slate-700 truncate">{req.customerName}</span>
                    <span className="text-[10px] text-slate-400">({req.detectedLanguage})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-sm">
                    "{req.customerReason}"
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-slate-800 font-medium">
                    {formatCurrency(req.orderValue)}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      req.predictedAction === "AUTO-APPROVE"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : req.predictedAction === "INSPECT"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {req.predictedAction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fit Intelligence Summary */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                  Fit Intelligence Quick Insights
                </h2>
              </div>
              <Link
                href="/fit-intelligence"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Inspect All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Proactively improve catalog sizing descriptions to reduce legitimate returns at the source.
            </p>

            <div className="mt-3 space-y-2.5">
              {SYNTHETIC_PRODUCT_FIT_INSIGHTS.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-md bg-slate-50 border border-slate-100 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">
                      {item.productName}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Root Theme: {item.primaryComplaintTheme}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-rose-600">
                      {Math.round(item.fitReturnRate * 100)}%
                    </span>
                    <div className="text-[10px] text-slate-400">fit rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <Scale className="w-3.5 h-3.5 text-indigo-600" />
              Ethical Standard:
            </span>
            <span>Customer sizing complaints are never treated as fraud signals.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
