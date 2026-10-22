import { ReturnRequest, HumanReviewStatus, RoutingAction } from "@/types";
import { INITIAL_SYNTHETIC_RETURNS } from "@/features/returns/sample-data";

const STORAGE_KEY = "returnwise_demo_reviews_v2";

export interface DecisionEngineServiceInterface {
  getAllRequests(): ReturnRequest[];
  getRequestById(id: string): ReturnRequest | undefined;
  updateReviewDecision(
    requestId: string,
    action: HumanReviewStatus,
    reviewerNotes: string,
    overrideReason?: string,
    reviewerName?: string
  ): ReturnRequest;
  resetToDefaults(): void;
}

class LocalSimulatedDecisionEngine implements DecisionEngineServiceInterface {
  private requests: ReturnRequest[] = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.requests = JSON.parse(stored);
          return;
        }
      } catch (e) {
        console.warn("Could not read from localStorage, using in-memory dataset", e);
      }
    }
    this.requests = JSON.parse(JSON.stringify(INITIAL_SYNTHETIC_RETURNS));
  }

  private persist() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.requests));
      } catch (e) {
        console.warn("Could not write to localStorage", e);
      }
    }
  }

  getAllRequests(): ReturnRequest[] {
    if (this.requests.length === 0) {
      this.init();
    }
    return [...this.requests];
  }

  getRequestById(id: string): ReturnRequest | undefined {
    return this.getAllRequests().find((r) => r.id === id);
  }

  updateReviewDecision(
    requestId: string,
    action: HumanReviewStatus,
    reviewerNotes: string,
    overrideReason?: string,
    reviewerName: string = "Operations Analyst (You)"
  ): ReturnRequest {
    const reqIndex = this.requests.findIndex((r) => r.id === requestId);
    if (reqIndex === -1) {
      throw new Error(`Return request ${requestId} not found`);
    }

    const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";
    const existing = this.requests[reqIndex];

    const actionLabels: Record<HumanReviewStatus, string> = {
      APPROVED: "Manually Approved Return",
      SENT_FOR_INSPECTION: "Routed to Physical Depot Inspection",
      ESCALATED: "Escalated to Senior Fraud Specialist",
      PENDING_REVIEW: "Marked as Pending Review"
    };

    // Check if the decision is an override against the model recommendation
    const modelActionMap: Record<HumanReviewStatus, RoutingAction> = {
      APPROVED: "AUTO-APPROVE",
      SENT_FOR_INSPECTION: "INSPECT",
      ESCALATED: "ESCALATE",
      PENDING_REVIEW: existing.predictedAction
    };

    const isOverridden = modelActionMap[action] !== existing.predictedAction;

    const newAudit = {
      id: `aud-${Date.now()}`,
      timestamp: now,
      actor: reviewerName,
      action: actionLabels[action] || action,
      notes: reviewerNotes.trim() ? reviewerNotes : undefined,
      overrideReason: isOverridden && overrideReason ? overrideReason : undefined
    };

    const updated: ReturnRequest = {
      ...existing,
      humanReviewStatus: action,
      reviewedBy: reviewerName,
      reviewedAt: now,
      reviewerNotes: reviewerNotes || existing.reviewerNotes,
      overrideReason: overrideReason || existing.overrideReason,
      isOverridden,
      auditTrail: [newAudit, ...existing.auditTrail]
    };

    this.requests[reqIndex] = updated;
    this.persist();
    return updated;
  }

  resetToDefaults(): void {
    this.requests = JSON.parse(JSON.stringify(INITIAL_SYNTHETIC_RETURNS));
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // ignore
      }
    }
  }
}

export const decisionEngineService = new LocalSimulatedDecisionEngine();
