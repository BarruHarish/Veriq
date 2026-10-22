"use client";

import React, { useState } from "react";
import {
  Shirt,
  Download,
  ArrowUpDown,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X,
  ExternalLink,
  Sliders,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { SYNTHETIC_PRODUCT_FIT_INSIGHTS } from "@/features/returns/sample-data";
import { ProductFitInsight } from "@/types";

export default function FitIntelligencePage() {
  const [products, setProducts] = useState<ProductFitInsight[]>(
    SYNTHETIC_PRODUCT_FIT_INSIGHTS
  );
  const [sortField, setSortField] = useState<"fitReturnRate" | "fitReturnCount">("fitReturnRate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedProduct, setSelectedProduct] = useState<ProductFitInsight | null>(null);

  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc"
      ? a[sortField] - b[sortField]
      : b[sortField] - a[sortField];
  });

  const toggleSort = (field: "fitReturnRate" | "fitReturnCount") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Product Name",
      "Category",
      "Total Orders Sample",
      "Fit Return Count",
      "Fit Return Rate %",
      "Complaint Theme",
      "Current Sizing Guidance",
      "Suggested Improvement",
      "Status",
    ];
    const rows = sortedProducts.map((p) => [
      `"${p.productName}"`,
      `"${p.category}"`,
      p.totalOrdersSample,
      p.fitReturnCount,
      (p.fitReturnRate * 100).toFixed(1),
      `"${p.primaryComplaintTheme.replace(/"/g, '""')}"`,
      `"${p.currentSizeGuidance.replace(/"/g, '""')}"`,
      `"${p.suggestedGuidanceImprovement.replace(/"/g, '""')}"`,
      p.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "veriq_fit_intelligence_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartData = sortedProducts.map((p) => ({
    name: p.productName.length > 18 ? p.productName.slice(0, 16) + "..." : p.productName,
    rate: Math.round(p.fitReturnRate * 100),
    count: p.fitReturnCount,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Fit & Sizing Intelligence
            </h1>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Top 5 High-Variance Products
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Isolate catalog-induced return spikes. Update size charts to reduce legitimate buyer returns at the source.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-md border border-slate-200 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV (Sample Data)
          </button>
        </div>
      </div>

      {/* Synthetic Demo Label Banner */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-950 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Synthetic Demo Observation:</span> These 5 sample products and return rates are deterministic illustrations designed to showcase sizing root-cause isolation. We do not claim that recommendations have reduced real retail returns.
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
              Sample Fit Return Rate Comparison (%)
            </h2>
            <p className="text-[11px] text-slate-500">
              Apparel items with &gt;15% fit returns indicate high probability of misleading or non-standard size charts.
            </p>
          </div>
          <span className="text-[10px] text-slate-400">Deterministic Fixtures</span>
        </div>

        <div className="h-52 w-full mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
              <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
              <YAxis fontSize={11} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} unit="%" />
              <Tooltip
                contentStyle={{ fontSize: "11px", borderRadius: "6px" }}
                formatter={(val: any) => [`${val}%`, "Fit Return Rate"]}
              />
              <Bar dataKey="rate" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sortable Products Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
            High-Impact Catalog Items Table
          </h2>
          <span className="text-[11px] text-slate-400">Click row for full improvement drawer</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Product Name & Category</th>
                <th
                  onClick={() => toggleSort("fitReturnCount")}
                  className="py-3 px-3 cursor-pointer hover:text-slate-800"
                >
                  <div className="flex items-center gap-1">
                    Fit Returns <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("fitReturnRate")}
                  className="py-3 px-3 cursor-pointer hover:text-slate-800"
                >
                  <div className="flex items-center gap-1">
                    Fit Rate % <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Primary Complaint Theme</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedProducts.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="hover:bg-indigo-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{p.productName}</div>
                    <div className="text-[10px] text-slate-400">{p.category}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    <strong>{p.fitReturnCount}</strong>{" "}
                    <span className="text-[10px] text-slate-400">/ {p.totalOrdersSample}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-rose-600">
                      {(p.fitReturnRate * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 max-w-sm text-slate-600 truncate">
                    {p.primaryComplaintTheme}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        p.status === "Needs Revision"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-medium underline"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detail Drawer / Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  {selectedProduct.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedProduct.productName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400">Sample Orders</span>
                <div className="font-bold text-slate-800">{selectedProduct.totalOrdersSample}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Fit Returns</span>
                <div className="font-bold text-slate-800">{selectedProduct.fitReturnCount}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Fit Return Rate</span>
                <div className="font-bold text-rose-600">
                  {(selectedProduct.fitReturnRate * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-800 block">Identified Root-Cause Theme:</span>
                <div className="text-slate-600 mt-0.5 bg-slate-50 p-2.5 rounded border border-slate-100">
                  {selectedProduct.primaryComplaintTheme}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block">Current Size Guidance:</span>
                <div className="text-slate-600 mt-0.5 bg-slate-50 p-2.5 rounded border border-slate-100">
                  "{selectedProduct.currentSizeGuidance}"
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 rounded-md border border-indigo-100">
                <span className="font-bold text-indigo-950 block">Suggested Guidance Improvement:</span>
                <p className="text-indigo-900 mt-1 leading-relaxed">
                  {selectedProduct.suggestedGuidanceImprovement}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
