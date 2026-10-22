export type RoutingAction = "AUTO-APPROVE" | "INSPECT" | "ESCALATE";

export type ReturnCategory = 
  | "abusive"
  | "genuine_quality_issue"
  | "genuine_fit_issue"
  | "genuine_wrong_item";

export type HumanReviewStatus = "PENDING_REVIEW" | "APPROVED" | "SENT_FOR_INSPECTION" | "ESCALATED";

export type CustomerLanguage = "English" | "Hinglish" | "Transliterated Hindi" | "Telugu/Hinglish";

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  notes?: string;
  overrideReason?: string;
}

export interface SizeChartInfo {
  orderedSize: string;
  recommendedWaistOrChest: string;
  fitType: "Slim" | "Regular" | "Relaxed" | "Athletic";
  stretchPercentage?: string;
  returnRiskNote?: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerTenureMonths: number;
  customerTenureTier: "New (0-3m)" | "Mid (4-12m)" | "Established (12m+)";
  orderValue: number;
  valueTier: "Low (<₹1k)" | "Mid (₹1k-₹3k)" | "High (>₹3k)";
  discountPercent: number;
  deliveryDays: number;
  requestDate: string;
  productName: string;
  productCategory: "Denim & Jeans" | "Formal Shirts" | "Ethnic Wear & Kurtas" | "Dresses" | "Footwear" | "Activewear";
  returnHistoryCount: number; // Previous returns count
  returnHistoryRate: number; // Historical return rate (0 - 1)
  hasSufficientHistory: boolean;
  
  // Customer text & translation
  customerReason: string;
  customerReasonTranslation?: string;
  detectedLanguage: CustomerLanguage;
  sizeChart: SizeChartInfo;
  
  // Model prediction outputs (illustrative synthetic)
  predictedAction: RoutingAction;
  predictedCategory: ReturnCategory;
  probabilities: {
    autoApprove: number;
    inspect: number;
    escalate: number;
  };
  
  // Categorized evidence breakdown
  observedFacts: string[];
  policySignals: string[];
  missingInformation: string[];
  riskIndicators: string[];
  genuineEvidence: string[];
  
  explanation: string;
  applicablePolicyCondition: string;
  
  // Human in the loop review state
  humanReviewStatus: HumanReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  overrideReason?: string;
  isOverridden?: boolean;
  auditTrail: AuditEvent[];
}

export interface ProductFitInsight {
  id: string;
  productName: string;
  category: string;
  totalOrdersSample: number;
  fitReturnCount: number;
  fitReturnRate: number;
  primaryComplaintTheme: string;
  currentSizeGuidance: string;
  suggestedGuidanceImprovement: string;
  status: "Needs Revision" | "Under Review" | "Optimized";
  evidenceCount: number;
  dateRange: string;
}
