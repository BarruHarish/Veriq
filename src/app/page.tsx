import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Shield,
  HelpCircle,
} from "lucide-react";
import { DecisionMap } from "@/components/decision-map";
import { VeriqLogo } from "@/components/ui/veriq-logo";

export default function EditorialHomePage() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717] flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      {/* Editorial Navigation */}
      <header className="border-b border-[#E2E0D8] bg-[#F7F6F2] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Brand Logo with V Ribbon Symbol */}
          <Link href="/" className="flex items-center">
            <VeriqLogo size="md" variant="horizontal" withDescriptor={true} />
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-slate-600">
            <a href="#decision-problem" className="hover:text-slate-900 transition-colors">
              The Problem
            </a>
            <a href="#workflow" className="hover:text-slate-900 transition-colors">
              Workflow
            </a>
            <a href="#capabilities" className="hover:text-slate-900 transition-colors">
              Capabilities
            </a>
            <a href="#fairness" className="hover:text-slate-900 transition-colors">
              Fairness
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/overview"
              className="text-xs font-mono uppercase tracking-wider text-slate-700 hover:text-slate-900 px-3 py-1.5 border border-[#E2E0D8] bg-white hover:bg-slate-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/overview"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm"
            >
              <span>Open Demo</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section: Editorial Composition */}
      <section className="pt-16 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-b border-[#E2E0D8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Official Brand Content & Rationale (6 cols) */}
          <div className="lg:col-span-6 space-y-8 lg:pr-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-slate-500 border-b border-slate-400 pb-1">
              <span>Veriq</span>
              <span>·</span>
              <span>Fair Returns Intelligence</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-serif font-extrabold text-[#0F172A] leading-[1.04] tracking-tight">
              Every return. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0D9488]">
                A fair decision.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-serif leading-relaxed max-w-md">
              Identify risk. Understand complaints. Decide with evidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/overview"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm"
              >
                <span>Explore the live demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="#decision-problem"
                className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-mono uppercase tracking-wider text-slate-800 border border-[#E2E0D8] bg-white hover:bg-slate-50 transition-colors"
              >
                Understand the approach
              </a>
            </div>

            <div className="pt-6 border-t border-[#E2E0D8] text-[11px] font-mono tracking-widest uppercase text-slate-500">
              EVIDENCE-LED · HUMAN-REVIEWED · FAIR BY DESIGN
            </div>
          </div>

          {/* Right Column: Custom Decision Map Visual (6 cols) */}
          <div className="lg:col-span-6">
            <DecisionMap />
          </div>
        </div>
      </section>

      {/* Distinctive Horizontal Trust Axioms */}
      <section className="border-b border-[#E2E0D8] bg-white py-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E0D8]">
          <div className="py-4 md:py-0 md:px-6 first:pl-0">
            <div className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
              New customer ≠ suspicious.
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Tenure deficiency is a data gap, never proof of adversarial intent.
            </p>
          </div>

          <div className="py-4 md:py-0 md:px-6">
            <div className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
              Another language ≠ higher risk.
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Hinglish and regional phrasing receive equal review rigor and velocity.
            </p>
          </div>

          <div className="py-4 md:py-0 md:px-6">
            <div className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
              Missing evidence ≠ fraud.
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Uncertainty prompts inspection and human validation—never false accusation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — The Decision Problem */}
      <section id="decision-problem" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-b border-[#E2E0D8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold">
              The Operational Conflict
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
              Fraud prevention without unfair accusations.
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-serif">
              Retail operations teams face a delicate tension: automated heuristics protect cashflow from serial return abuse, but blunt algorithms alienate loyal shoppers encountering genuine garment defects.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contrast Case 1: Genuine Grievance */}
            <div className="p-5 bg-white border border-[#E2E0D8] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E0D8]">
                <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold">
                  Genuine Fit Grievance
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  INSPECT / EXCHANGE
                </span>
              </div>
              <div className="text-xs font-serif italic text-slate-800">
                "Jeans bahut tight hai, waist pe mark aa raha hai."
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                Customer cited genuine waist pinching. Catalog audit verifies 18% sizing variance. Accusing this customer of fraud destroys long-term NPS.
              </div>
            </div>

            {/* Contrast Case 2: Suspicious Pattern */}
            <div className="p-5 bg-white border border-[#E2E0D8] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E0D8]">
                <span className="text-[10px] font-mono uppercase text-rose-700 font-bold">
                  Weight Mismatch Claim
                </span>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 border border-rose-200">
                  ESCALATE FOR QA
                </span>
              </div>
              <div className="text-xs font-serif italic text-slate-800">
                "Wrong item delivered. Received empty sleeve."
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                ₹8,499 item dispatched at 1.4kg carrier weight. Tamper-evident barcode missing. Escalation verifies carrier chain-of-custody without accusations.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Connected Process Workflow */}
      <section id="workflow" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-b border-[#E2E0D8]">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Operations Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Understand · Assess · Decide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A linear, auditable decision framework connecting customer text with operational resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#E2E0D8] space-y-3">
            <div className="text-xs font-mono font-bold text-[#7C3AED] pb-2 border-b border-[#E2E0D8]">
              01 · UNDERSTAND
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">
              Linguistic & Order Extraction
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extracts customer return reasons in any language (English, Hinglish, Telugu), joins order value, account tenure, transit days, and size specifications.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E2E0D8] space-y-3">
            <div className="text-xs font-mono font-bold text-[#7C3AED] pb-2 border-b border-[#E2E0D8]">
              02 · ASSESS
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">
              Evidence Separation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Separates observed facts from inferences. Analyzes genuine evidence, catalog discrepancy notes, and missing information before suggesting policy routes.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E2E0D8] space-y-3">
            <div className="text-xs font-mono font-bold text-[#7C3AED] pb-2 border-b border-[#E2E0D8]">
              03 · DECIDE
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">
              Auditable Human Sign-Off
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Operations reviewer reviews evidence, confirms or overrides with mandatory audit justification, and copies respectful response drafts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Product Showcases */}
      <section id="capabilities" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-b border-[#E2E0D8]">
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E0D8]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
                Workspace Capabilities
              </span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
                Purpose-Built for Operations
              </h2>
            </div>
            <Link
              href="/overview"
              className="text-xs font-mono uppercase tracking-wider text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 font-semibold"
            >
              Open Full Workspace <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Capability 1: Decision Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                01 · The Flagship Workflow
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Decision Workbench
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Split-pane operational layout featuring multi-lingual customer reasoning, unedited customer voice, product sizing charts, and mandatory reviewer override logging.
              </p>
              <Link
                href="/workbench"
                className="inline-flex items-center gap-1 text-xs font-mono text-slate-900 underline pt-1 font-medium"
              >
                Launch Workbench <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="lg:col-span-7 bg-white p-5 border border-[#E2E0D8] space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E2E0D8]">
                <span className="font-mono text-slate-500">Workbench Snapshot</span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 text-[10px]">
                  Observed Facts Separated
                </span>
              </div>
              <div className="p-3 bg-[#FAF9F6] border border-[#E2E0D8] text-xs space-y-1">
                <span className="font-mono text-[10px] text-slate-500 uppercase">Grounded Rationale:</span>
                <p className="text-slate-800 font-serif italic text-xs">
                  "Authentic fit dissatisfaction driven by high compression waistband. Inspect allows offering an exchange for 30W without alienating a valued customer."
                </p>
              </div>
            </div>
          </div>

          {/* Capability 2: Fit Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#E2E0D8]">
            <div className="lg:col-span-7 bg-white p-5 border border-[#E2E0D8] space-y-3 order-2 lg:order-1">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E2E0D8]">
                <span className="font-mono text-slate-500">Catalog Variance Root-Causes</span>
                <span className="font-mono text-[#7C3AED] text-[10px]">Top 5 Products</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-[#FAF9F6] border border-[#E2E0D8]">
                  <span className="font-medium text-slate-900">Vintage Indigo Slim Jeans</span>
                  <span className="font-mono font-bold text-rose-600">20.0% Fit Rate</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#FAF9F6] border border-[#E2E0D8]">
                  <span className="font-medium text-slate-900">High-Rise Stretch Jeggings</span>
                  <span className="font-mono font-bold text-rose-600">18.2% Fit Rate</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                02 · Upstream Reduction
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Fit & Sizing Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pinpoint high-variance products where returns stem from misleading size charts. Export actionable catalog fixes to eliminate returns before they occur.
              </p>
              <Link
                href="/fit-intelligence"
                className="inline-flex items-center gap-1 text-xs font-mono text-slate-900 underline pt-1 font-medium"
              >
                Inspect Fit Intelligence <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Final Statement */}
      <section className="py-24 px-6 lg:px-12 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 leading-tight">
          Every return. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0D9488]">
            A fair decision.
          </span>
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto font-serif leading-relaxed">
          Identify risk. Understand complaints. Decide with evidence.
        </p>
        <div>
          <Link
            href="/overview"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-mono uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm"
          >
            <span>Explore Veriq</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="pt-4 text-[11px] font-mono text-slate-500">
          Talent AP Hackathon Prototype · Problem Statement R2 · Official dataset & model evaluation pending.
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#E2E0D8] bg-[#F7F6F2] py-8 px-6 lg:px-12 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VeriqLogo size="sm" />
            <span>·</span>
            <span>Fair Returns Intelligence</span>
          </div>
          <div className="text-[11px]">
            Demo Mode · Synthetic Data Fixture · Official 60k Dataset Pending
          </div>
        </div>
      </footer>
    </div>
  );
}
