import React, { useState } from "react";
import { Copy, Check, MessageSquare } from "lucide-react";
import { ReturnCategory, HumanReviewStatus } from "@/types";

interface CustomerResolutionMessageProps {
  category: ReturnCategory;
  customerName: string;
  reviewStatus: HumanReviewStatus;
}

const TEMPLATES: Record<string, string> = {
  genuine_quality_issue:
    "We're sorry the product did not meet your expectations. We'll review the reported quality concern and guide you through the next steps.",
  genuine_fit_issue:
    "Sorry the fit wasn't right. We've received your return request and will help you with the next steps or size replacement.",
  genuine_wrong_item:
    "We're sorry the delivered item may not match your order. We'll review the order details and guide you through the appropriate resolution.",
  abusive:
    "Thanks for sharing the details. We need to review a few order details before confirming the next step.",
  APPROVED:
    "Good news! Your return request has been approved. Please pack the item securely in its original packaging. Our courier partner will collect it within 24-48 hours.",
  SENT_FOR_INSPECTION:
    "Thank you for your patience. Your request has been scheduled for a quick physical inspection at our returns bay. We will update you immediately once verified.",
  ESCALATED:
    "Thank you for contacting us. Your return case is undergoing verification with our senior resolutions specialist. We will provide a definitive update within 1 business day."
};

export function CustomerResolutionMessage({
  category,
  customerName,
  reviewStatus,
}: CustomerResolutionMessageProps) {
  // Pick template based on review status if decided, otherwise category
  const initialText =
    reviewStatus !== "PENDING_REVIEW" && TEMPLATES[reviewStatus]
      ? TEMPLATES[reviewStatus]
      : TEMPLATES[category] || TEMPLATES["genuine_fit_issue"];

  const [message, setMessage] = useState(initialText);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    const text =
      reviewStatus !== "PENDING_REVIEW" && TEMPLATES[reviewStatus]
        ? TEMPLATES[reviewStatus]
        : TEMPLATES[category] || TEMPLATES["genuine_fit_issue"];
    setMessage(text);
  }, [category, reviewStatus]);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-tight">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
          <span>Customer Response Assistant</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Respectful & Non-Accusatory</span>
      </div>

      <div className="text-[11px] text-slate-500">
        Editable polite response drafted for {customerName} based on status (
        <strong className="text-slate-700">
          {reviewStatus !== "PENDING_REVIEW" ? reviewStatus.replace(/_/g, " ") : category.replace(/_/g, " ")}
        </strong>
        ). Review before copying:
      </div>

      <div className="relative">
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 leading-relaxed font-sans"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <span className="text-[10.5px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
          Policy: Never promise an unverified refund date or accuse the customer.
        </span>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-sm shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-indigo-600" />
              <span>Copy Response</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
