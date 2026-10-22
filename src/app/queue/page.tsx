"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { useReturns } from "@/features/returns/returns-context";
import { formatCurrency } from "@/lib/utils";
import { RoutingAction, ReturnCategory } from "@/types";

export default function ReturnsQueuePage() {
  const router = useRouter();
  const { returns, selectedId, setSelectedId } = useReturns();

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<"id" | "orderValue" | "customerTenureMonths">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filter & search
  const filtered = useMemo(() => {
    return returns.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.customerName.toLowerCase().includes(search.toLowerCase()) ||
        item.productName.toLowerCase().includes(search.toLowerCase()) ||
        item.customerReason.toLowerCase().includes(search.toLowerCase());

      const matchesAction =
        actionFilter === "ALL" || item.predictedAction === actionFilter;

      const matchesCategory =
        categoryFilter === "ALL" || item.predictedCategory === categoryFilter;

      return matchesSearch && matchesAction && matchesCategory;
    });
  }, [returns, search, actionFilter, categoryFilter]);

  // Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") {
        return sortOrder === "asc"
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }
      return sortOrder === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [filtered, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleRowClick = (id: string) => {
    setSelectedId(id);
    router.push("/workbench");
  };

  const toggleSort = (field: "id" | "orderValue" | "customerTenureMonths") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Returns Operations Queue
            </h1>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Interactive Table
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse, search, and filter incoming sample return requests. Click any row to open the Decision Workbench.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Showing <strong>{sorted.length}</strong> of {returns.length} sample requests</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search request ID, customer, product, reason..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Action Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Action:</span>
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Actions</option>
              <option value="AUTO-APPROVE">AUTO-APPROVE</option>
              <option value="INSPECT">INSPECT</option>
              <option value="ESCALATE">ESCALATE</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Categories</option>
              <option value="FIT_SIZING">Fit & Sizing</option>
              <option value="QUALITY_DEFECT">Quality Defect</option>
              <option value="WRONG_ITEM">Wrong Item</option>
              <option value="SUSPECTED_WARDROBING">Suspected Wardrobing</option>
            </select>
          </div>

          {(search || actionFilter !== "ALL" || categoryFilter !== "ALL") && (
            <button
              onClick={() => {
                setSearch("");
                setActionFilter("ALL");
                setCategoryFilter("ALL");
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 underline px-1"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th
                  onClick={() => toggleSort("id")}
                  className="py-3 px-3 cursor-pointer hover:text-slate-800"
                >
                  <div className="flex items-center gap-1">
                    Request ID <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Product & Category</th>
                <th
                  onClick={() => toggleSort("orderValue")}
                  className="py-3 px-3 cursor-pointer hover:text-slate-800"
                >
                  <div className="flex items-center gap-1">
                    Order Value <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("customerTenureMonths")}
                  className="py-3 px-3 cursor-pointer hover:text-slate-800"
                >
                  <div className="flex items-center gap-1">
                    Customer Tenure <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Customer Reason (Original Text)</th>
                <th className="py-3 px-3">Suggested Action</th>
                <th className="py-3 px-3">Review Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No sample return requests match the selected filters.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item.id)}
                      className={`hover:bg-indigo-50/40 cursor-pointer transition-colors ${
                        isSelected ? "bg-indigo-50/70" : ""
                      }`}
                    >
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {item.id}
                        {isSelected && (
                          <span className="ml-1.5 text-[9px] font-bold text-indigo-700 bg-indigo-100 px-1 py-0.2 rounded">
                            ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-800">{item.productName}</div>
                        <div className="text-[10px] text-slate-400">{item.productCategory}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800">
                        {formatCurrency(item.orderValue)}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <div>{item.customerTenureMonths} mos</div>
                        <div className="text-[10px] text-slate-400">{item.customerTenureTier}</div>
                      </td>
                      <td className="py-3 px-3 max-w-xs">
                        <div className="text-slate-700 truncate font-mono text-[11px]">
                          "{item.customerReason}"
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Language: {item.detectedLanguage}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded border ${
                            item.predictedAction === "AUTO-APPROVE"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : item.predictedAction === "INSPECT"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {item.predictedAction}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded ${
                            item.humanReviewStatus === "APPROVED"
                              ? "bg-emerald-100 text-emerald-800"
                              : item.humanReviewStatus === "SENT_FOR_INSPECTION"
                              ? "bg-amber-100 text-amber-800"
                              : item.humanReviewStatus === "ESCALATED"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.humanReviewStatus.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(item.id);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-800 bg-white hover:bg-indigo-50 border border-slate-200 px-2 py-1 rounded transition-colors"
                        >
                          Review <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
