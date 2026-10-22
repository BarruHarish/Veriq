"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Database,
  Layers,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface ParsedCSVPreview {
  fileName: string;
  rowCount: number;
  columns: string[];
  sampleRows: Record<string, string>[];
}

const REQUIRED_FIELDS = [
  { field: "order_id", desc: "Unique retail transaction identifier", status: "Required" },
  { field: "customer_id", desc: "Customer account identifier for tenure lookups", status: "Required" },
  { field: "order_value", desc: "Total basket merchandise value (INR)", status: "Required" },
  { field: "customer_reason", desc: "Free-text return explanation (any language)", status: "Required" },
  { field: "product_category", desc: "Catalog category classification", status: "Required" },
  { field: "delivery_days", desc: "Transit duration from dispatch to delivery", status: "Recommended" },
  { field: "ground_truth_label", desc: "Official validation label (Genuine / Fraud)", status: "Validation Only" },
];

export default function DatasetModelPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ParsedCSVPreview | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>({
    order_id: "",
    customer_id: "",
    order_value: "",
    customer_reason: "",
    product_category: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;
      const lines = text.split("\n").filter((l) => l.trim().length > 0);
      if (lines.length > 0) {
        const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
        const rows = lines.slice(1, 6).map((line) => {
          const cells = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
          const rowObj: Record<string, string> = {};
          headers.forEach((h, idx) => {
            rowObj[h] = cells[idx] || "";
          });
          return rowObj;
        });

        setPreviewData({
          fileName: file.name,
          rowCount: lines.length - 1,
          columns: headers,
          sampleRows: rows,
        });

        // Auto map columns if identical
        const newMap: Record<string, string> = {};
        REQUIRED_FIELDS.forEach((rf) => {
          const match = headers.find((h) => h.toLowerCase() === rf.field.toLowerCase());
          if (match) newMap[rf.field] = match;
        });
        setColumnMappings((prev) => ({ ...prev, ...newMap }));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Dataset Onboarding & Model Pipeline
            </h1>
            <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Schema & Pipeline UI
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Connect the official 60,000-record challenge dataset, map schema fields, and track machine learning training readiness.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white border border-slate-200 rounded px-3 py-1.5 shadow-sm">
          Pipeline Mode: <strong className="text-slate-800">FastAPI ML Ready</strong>
        </div>
      </div>

      {/* Dataset Status Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-amber-950">
            Official Dataset Status: {previewData ? "Client-Side Preview Loaded (Demo Only)" : "Official dataset not uploaded."}
          </div>
          <p className="text-slate-600 leading-relaxed">
            The application currently operates in <strong>DEMO MODE</strong> using an internal deterministic fixture of 8 realistic return cases. Uploading a CSV below generates an immediate client-side preview and schema verification. Official machine learning model training is locked until backend FastAPI training cluster connection is established.
          </p>
        </div>
      </div>

      {/* Upload and Schema Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: CSV Upload & File Status (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-indigo-600" />
              Upload Challenge Dataset (CSV)
            </h2>
            <span className="text-[10px] text-slate-400">Up to 60,000 rows</span>
          </div>

          {/* Drag & Drop / Input area */}
          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-lg p-6 text-center transition-colors bg-slate-50/50">
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="text-xs font-semibold text-slate-800">
              Drag and drop your challenge CSV here, or browse
            </div>
            <p className="text-[11px] text-slate-500 mt-1 mb-3">
              Supports raw or cleaned returns datasets (.csv format)
            </p>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer transition-colors shadow-sm">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Select CSV File</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {selectedFile && (
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded text-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-semibold text-slate-900">{selectedFile.name}</span>
                <div className="text-[11px] text-slate-500">
                  Size: {(selectedFile.size / 1024).toFixed(1)} KB · Rows: {previewData?.rowCount || "Counting..."}
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Valid CSV
              </span>
            </div>
          )}

          {/* Model Training Status Box */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">Model Training Pipeline:</span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                DISABLED IN DEMO MODE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Client-side CSV preview does not equal official model training. Full model training requires high-compute Python backend orchestration with LightGBM, DeBERTa-v3 NLP for Hinglish reasoning, and Platt calibration.
            </p>
            <button
              disabled
              className="w-full py-2 bg-slate-100 border border-slate-200 text-slate-400 rounded-md text-xs font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              title="Disabled: Requires backend ML server"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Train Model (Requires FastAPI ML Server)</span>
            </button>
          </div>
        </div>

        {/* Right: Required Schema Checklist & Column Mapping (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Required Schema Checklist & Column Mapping
            </h2>
            <span className="text-[10px] text-slate-400">Schema v1.2</span>
          </div>

          <div className="space-y-2.5">
            {REQUIRED_FIELDS.map((rf) => (
              <div
                key={rf.field}
                className="p-2.5 rounded bg-slate-50 border border-slate-100 flex items-center justify-between text-xs gap-3"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold font-mono text-slate-800 text-[11px]">
                    {rf.field}
                  </div>
                  <div className="text-[10px] text-slate-500">{rf.desc}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {previewData?.columns ? (
                    <select
                      value={columnMappings[rf.field] || ""}
                      onChange={(e) =>
                        setColumnMappings({
                          ...columnMappings,
                          [rf.field]: e.target.value,
                        })
                      }
                      className="text-xs bg-white border border-slate-200 rounded px-2 py-1 text-slate-700"
                    >
                      <option value="">Map column...</option>
                      {previewData.columns.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Upload CSV to map</span>
                  )}

                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      rf.status === "Required"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {rf.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSV Sample Rows Preview Table (if uploaded) */}
      {previewData && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
              Client-Side Preview: First 5 Rows of "{previewData.fileName}"
            </h3>
            <span className="text-[10px] text-slate-400">
              Total {previewData.rowCount} records parsed in browser
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase">
                  {previewData.columns.map((col) => (
                    <th key={col} className="py-2 px-3 font-semibold font-mono">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-700">
                {previewData.sampleRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    {previewData.columns.map((col) => (
                      <td key={col} className="py-2 px-3 truncate max-w-xs">
                        {row[col] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
