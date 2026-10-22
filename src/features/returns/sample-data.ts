import { ReturnRequest, ProductFitInsight } from "@/types";

export const INITIAL_SYNTHETIC_RETURNS: ReturnRequest[] = [
  {
    id: "RET-8941",
    orderId: "ORD-992140",
    customerName: "Aarav Sharma",
    customerTenureMonths: 18,
    customerTenureTier: "Established (12m+)",
    orderValue: 2499,
    valueTier: "Mid (₹1k-₹3k)",
    discountPercent: 15,
    deliveryDays: 3,
    requestDate: "2026-10-18",
    productName: "Vintage Indigo Slim Jeans",
    productCategory: "Denim & Jeans",
    returnHistoryCount: 2,
    returnHistoryRate: 0.12,
    hasSufficientHistory: true,
    customerReason: "Jeans chala tight ga undi, size correct kaadu.",
    customerReasonTranslation: "Jeans are very tight, the size is not correct.",
    detectedLanguage: "Telugu/Hinglish",
    sizeChart: {
      orderedSize: "32W",
      recommendedWaistOrChest: "32 inches",
      fitType: "Slim",
      stretchPercentage: "1% Elastane",
      returnRiskNote: "Catalog audit indicates waist runs 1.2 inches smaller than standard Indian vanity sizing."
    },
    predictedAction: "INSPECT",
    predictedCategory: "genuine_fit_issue",
    probabilities: {
      autoApprove: 0.28,
      inspect: 0.64,
      escalate: 0.08,
    },
    observedFacts: [
      "Customer purchased size 32W and initiated return within 48 hours of transit delivery",
      "Customer account has 18 months history with 16 lifetime orders",
      "Complaint explicitly references tight waistline in Telugu/Hinglish phrasing"
    ],
    policySignals: [
      "Item belongs to Denim category which permits fit-related exchange or return",
      "No duplicate serial claim detected across phone or delivery address"
    ],
    missingInformation: [
      "Physical measurement photo not yet uploaded",
      "Customer body waist measurement was not recorded during checkout"
    ],
    riskIndicators: [
      "Return rate is 12%, which is within acceptable retail tolerance (<15%)"
    ],
    genuineEvidence: [
      "Language pattern ('chala tight ga undi') is direct linguistic evidence of personal fit discomfort",
      "Vintage Indigo Slim Jeans has 20% aggregate fit return rate in internal catalog analytics"
    ],
    applicablePolicyCondition: "Apparel Fit Exchange Policy (Section 4.1): Fit grievances on slim bottoms receive inspection or frictionless exchange offer.",
    explanation: "The request indicates a genuine fit-related complaint. Available evidence is insufficient to determine whether the product guidance is inaccurate or the selected size is unsuitable. Review is recommended rather than accusing the customer.",
    humanReviewStatus: "PENDING_REVIEW",
    auditTrail: [
      {
        id: "aud-1",
        timestamp: "2026-10-18 08:30 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated initial recommendation: INSPECT (Confidence: 64%)"
      }
    ]
  },
  {
    id: "RET-8942",
    orderId: "ORD-992141",
    customerName: "Pooja Verma",
    customerTenureMonths: 24,
    customerTenureTier: "Established (12m+)",
    orderValue: 899,
    valueTier: "Low (<₹1k)",
    discountPercent: 30,
    deliveryDays: 2,
    requestDate: "2026-10-19",
    productName: "Classic Oxford Cotton Shirt",
    productCategory: "Formal Shirts",
    returnHistoryCount: 1,
    returnHistoryRate: 0.04,
    hasSufficientHistory: true,
    customerReason: "The shirt quality is very poor. Stitching near collar came loose right out of the packet.",
    customerReasonTranslation: undefined,
    detectedLanguage: "English",
    sizeChart: {
      orderedSize: "M",
      recommendedWaistOrChest: "40 inches chest",
      fitType: "Regular",
      returnRiskNote: "Standard fit, low sizing variance."
    },
    predictedAction: "AUTO-APPROVE",
    predictedCategory: "genuine_quality_issue",
    probabilities: {
      autoApprove: 0.88,
      inspect: 0.10,
      escalate: 0.02,
    },
    observedFacts: [
      "Order value is ₹899 (sub-₹1,000 category)",
      "24-month customer tenure with 96% completion rate across 25 prior orders",
      "Stitch flaw reported immediately upon unboxing"
    ],
    policySignals: [
      "Low-value threshold policy: sub-₹1,000 items with genuine defect evidence qualify for immediate auto-resolution"
    ],
    missingInformation: [
      "Laboratory textile tear-resistance inspection not required for low-value merchandise"
    ],
    riskIndicators: [
      "None. Zero fraud velocity signals on this customer account"
    ],
    genuineEvidence: [
      "Customer photos show frayed stitching on collar seam matching known Batch #B41 QA recall notice",
      "Long loyalty record with 1 lifetime return across 2 years"
    ],
    applicablePolicyCondition: "Instant Loyalty Resolution Policy: Established buyers with documented quality issues on low-cost orders receive immediate approval.",
    explanation: "High-confidence genuine quality defect from an established low-return customer on an economical order. Auto-approve protects brand trust and minimizes reverse logistics handling overhead.",
    humanReviewStatus: "APPROVED",
    reviewedBy: "Sonia Mehta (Ops Lead)",
    reviewedAt: "2026-10-19 08:45 IST",
    reviewerNotes: "Approved under instant loyalty warranty policy.",
    auditTrail: [
      {
        id: "aud-2a",
        timestamp: "2026-10-19 08:35 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated recommendation: AUTO-APPROVE (Confidence: 88%)"
      },
      {
        id: "aud-2b",
        timestamp: "2026-10-19 08:45 IST",
        actor: "Sonia Mehta (Ops Lead)",
        action: "Confirmed AUTO-APPROVE decision"
      }
    ]
  },
  {
    id: "RET-8943",
    orderId: "ORD-992142",
    customerName: "Rohan Kapoor",
    customerTenureMonths: 1,
    customerTenureTier: "New (0-3m)",
    orderValue: 8499,
    valueTier: "High (>₹3k)",
    discountPercent: 5,
    deliveryDays: 1,
    requestDate: "2026-10-19",
    productName: "Raw Silk Embroidered Sherwani",
    productCategory: "Ethnic Wear & Kurtas",
    returnHistoryCount: 0,
    returnHistoryRate: 0.0,
    hasSufficientHistory: false,
    customerReason: "Received a different item from what I ordered. Color and embroidery is completely different.",
    customerReasonTranslation: undefined,
    detectedLanguage: "English",
    sizeChart: {
      orderedSize: "40 Reg",
      recommendedWaistOrChest: "42 inches chest",
      fitType: "Regular",
      returnRiskNote: "High-value luxury ethnic wear. Mandatory barcode verification."
    },
    predictedAction: "ESCALATE",
    predictedCategory: "genuine_wrong_item",
    probabilities: {
      autoApprove: 0.05,
      inspect: 0.32,
      escalate: 0.63,
    },
    observedFacts: [
      "High order value: ₹8,499 luxury ceremonial wear",
      "Account tenure: 1 month (0 prior completed purchases)",
      "Customer initiated return within 12 hours of delivery citing wrong item delivery"
    ],
    policySignals: [
      "High-Value Policy: Any return claim exceeding ₹5,000 requires warehouse dispatch weight cross-check"
    ],
    missingInformation: [
      "Insufficient history: Brand new account with no baseline metrics",
      "Courier tamper-evident security tape verification number missing from return portal",
      "Unboxing video requested but not uploaded"
    ],
    riskIndicators: [
      "Significant weight discrepancy: Dispatch manifest indicates 1.4kg; return carrier pre-scan logged 0.6kg"
    ],
    genuineEvidence: [
      "Customer submitted photo of parcel packaging showing faded barcode sticker label",
      "Dispatch station logged label printer paper jam on shipping date"
    ],
    applicablePolicyCondition: "High-Value Goods Verification Policy: High-ticket items with weight discrepancies route to senior operations review before refund authorization.",
    explanation: "High-value luxury item with conflicting warehouse dispatch weight and claims of wrong item. Escalated to prevent substitution loss while validating courier tamper tape without accusing the customer.",
    humanReviewStatus: "PENDING_REVIEW",
    auditTrail: [
      {
        id: "aud-3",
        timestamp: "2026-10-19 08:40 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated initial recommendation: ESCALATE (Confidence: 63%)"
      }
    ]
  },
  {
    id: "RET-8944",
    orderId: "ORD-992143",
    customerName: "Sneha Nair",
    customerTenureMonths: 8,
    customerTenureTier: "Mid (4-12m)",
    orderValue: 1899,
    valueTier: "Mid (₹1k-₹3k)",
    discountPercent: 20,
    deliveryDays: 4,
    requestDate: "2026-10-20",
    productName: "High-Rise Stretch Ankle Jeggings",
    productCategory: "Denim & Jeans",
    returnHistoryCount: 1,
    returnHistoryRate: 0.20,
    hasSufficientHistory: true,
    customerReason: "Jeans bahut tight hai, waist pe mark aa raha hai.",
    customerReasonTranslation: "Jeans are very tight, leaving marks on my waist.",
    detectedLanguage: "Hinglish",
    sizeChart: {
      orderedSize: "28W",
      recommendedWaistOrChest: "28 inches",
      fitType: "Slim",
      stretchPercentage: "3% Spandex",
      returnRiskNote: "Fabric provides compression fit; customers frequently report waistband pinching."
    },
    predictedAction: "INSPECT",
    predictedCategory: "genuine_fit_issue",
    probabilities: {
      autoApprove: 0.35,
      inspect: 0.58,
      escalate: 0.07,
    },
    observedFacts: [
      "Mid-tier value (₹1,899)",
      "Customer tenure is 8 months with 5 prior orders",
      "Complaint specifies tight elastic compression band"
    ],
    policySignals: [
      "Fit Exchange eligibility active within 7 days of delivery"
    ],
    missingInformation: [
      "Whether customer prefers store credit or immediate size 30W replacement"
    ],
    riskIndicators: [
      "None. Return history (20%) is standard for online fashion bottomwear"
    ],
    genuineEvidence: [
      "Authentic Hinglish colloquial phrase ('waist pe mark aa raha hai') precisely mirrors bottomwear elastic complaints",
      "High-Rise Jeggings have 18.2% aggregate fit returns in catalog"
    ],
    applicablePolicyCondition: "Standard Apparel Sizing Policy: Fit claims without defect require physical QA check or size exchange.",
    explanation: "Authentic fit dissatisfaction driven by high compression waistband. Inspect allows offering an exchange for 30W or physical quality check without alienating a valued customer.",
    humanReviewStatus: "PENDING_REVIEW",
    auditTrail: [
      {
        id: "aud-4",
        timestamp: "2026-10-20 08:50 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated recommendation: INSPECT (Confidence: 58%)"
      }
    ]
  },
  {
    id: "RET-8945",
    orderId: "ORD-992144",
    customerName: "Vikram Malhotra",
    customerTenureMonths: 15,
    customerTenureTier: "Established (12m+)",
    orderValue: 1299,
    valueTier: "Mid (₹1k-₹3k)",
    discountPercent: 10,
    deliveryDays: 2,
    requestDate: "2026-10-20",
    productName: "Breathable Mesh Runner Shoes",
    productCategory: "Footwear",
    returnHistoryCount: 3,
    returnHistoryRate: 0.15,
    hasSufficientHistory: true,
    customerReason: "Wrong colour delivered. Ordered Navy Blue but got Charcoal Black.",
    customerReasonTranslation: undefined,
    detectedLanguage: "English",
    sizeChart: {
      orderedSize: "UK 9",
      recommendedWaistOrChest: "Foot length 27.5 cm",
      fitType: "Regular",
      returnRiskNote: "Footwear SKU barcodes occasionally overlap on dark navy vs charcoal boxes."
    },
    predictedAction: "AUTO-APPROVE",
    predictedCategory: "genuine_wrong_item",
    probabilities: {
      autoApprove: 0.79,
      inspect: 0.18,
      escalate: 0.03,
    },
    observedFacts: [
      "Order value: ₹1,299",
      "Customer tenure: 15 months",
      "Submitted photo clearly displays Charcoal Black shoe box with Navy Blue order slip"
    ],
    policySignals: [
      "Verified warehouse mispick policy: direct replacement or return auto-approved when SKU mismatch is photographic fact"
    ],
    missingInformation: [
      "Inbound courier pickup receipt"
    ],
    riskIndicators: [
      "None"
    ],
    genuineEvidence: [
      "Internal warehouse picker error logs acknowledge bin confusion between SKU-BLU-9 and SKU-BLK-9"
    ],
    applicablePolicyCondition: "Logistics Fulfillment Error Policy: Verified warehouse pick discrepancies auto-resolve with prepaid pickup.",
    explanation: "Warehouse pick error confirmed by SKU photo. Auto-approving ensures rapid customer relief and triggers automatic SKU bin relocation in inventory.",
    humanReviewStatus: "PENDING_REVIEW",
    auditTrail: [
      {
        id: "aud-5",
        timestamp: "2026-10-20 08:52 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated recommendation: AUTO-APPROVE (Confidence: 79%)"
      }
    ]
  },
  {
    id: "RET-8946",
    orderId: "ORD-992145",
    customerName: "Kavita Reddy",
    customerTenureMonths: 2,
    customerTenureTier: "New (0-3m)",
    orderValue: 4599,
    valueTier: "High (>₹3k)",
    discountPercent: 0,
    deliveryDays: 3,
    requestDate: "2026-10-20",
    productName: "Chanderi Silk Party Anarkali",
    productCategory: "Ethnic Wear & Kurtas",
    returnHistoryCount: 2,
    returnHistoryRate: 0.66,
    hasSufficientHistory: false,
    customerReason: "Your service is pathetic and worst clothes sent! Fitting bilkul match nahi hua aur colour dulled lag raha hai.",
    customerReasonTranslation: "Your service is pathetic and worst clothes sent! Fitting did not match at all and colour looks dulled.",
    detectedLanguage: "Hinglish",
    sizeChart: {
      orderedSize: "L (40)",
      recommendedWaistOrChest: "Bust 40, Waist 34",
      fitType: "Regular",
      returnRiskNote: "Delicate dry-clean-only fabric. High risk of single-event wear."
    },
    predictedAction: "ESCALATE",
    predictedCategory: "abusive",
    probabilities: {
      autoApprove: 0.10,
      inspect: 0.35,
      escalate: 0.55,
    },
    observedFacts: [
      "Order value: ₹4,599 luxury party dress",
      "Customer used aggressive phrasing ('pathetic and worst clothes sent')",
      "Return requested immediately on Monday morning after weekend wedding dates"
    ],
    policySignals: [
      "High-value partywear seal tag condition must be physically verified prior to refund"
    ],
    missingInformation: [
      "Insufficient history: Customer has only 3 total orders, 2 of which were returned",
      "Physical tag condition unverified until physical depot arrival"
    ],
    riskIndicators: [
      "Security tag reported missing or broken in preliminary return questionnaire",
      "Customer tenure is short (2 months) with high return frequency"
    ],
    genuineEvidence: [
      "Customer notes colour discrepancy; Chanderi silk fabric is known to reflect studio flash differently than indoor lighting"
    ],
    applicablePolicyCondition: "Special Occasion Wear Policy: Garments with unsealed security tags require manual depot inspection. (Note: Emotional or abusive language alone is not treated as proof of fraud).",
    explanation: "Potential post-event return signature on luxury partywear combined with new customer history. Escalation routed to specialist inspection team to verify perfume scent and security tag integrity with fair human review.",
    humanReviewStatus: "ESCALATED",
    reviewedBy: "Farhan Ali (Fraud Operations)",
    reviewedAt: "2026-10-20 09:05 IST",
    reviewerNotes: "Transferred to physical depot inspection bay for seal tag check.",
    auditTrail: [
      {
        id: "aud-6a",
        timestamp: "2026-10-20 08:55 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated recommendation: ESCALATE (Confidence: 55%)"
      },
      {
        id: "aud-6b",
        timestamp: "2026-10-20 09:05 IST",
        actor: "Farhan Ali (Fraud Operations)",
        action: "Escalated to specialized returns bay for physical tag check"
      }
    ]
  },
  {
    id: "RET-8947",
    orderId: "ORD-992146",
    customerName: "Deepak Joshi",
    customerTenureMonths: 11,
    customerTenureTier: "Mid (4-12m)",
    orderValue: 1450,
    valueTier: "Mid (₹1k-₹3k)",
    discountPercent: 10,
    deliveryDays: 3,
    requestDate: "2026-10-21",
    productName: "Tailored Linen Casual Shirt",
    productCategory: "Formal Shirts",
    returnHistoryCount: 1,
    returnHistoryRate: 0.10,
    hasSufficientHistory: true,
    customerReason: "Collar buttons broken on delivery.",
    customerReasonTranslation: undefined,
    detectedLanguage: "English",
    sizeChart: {
      orderedSize: "L",
      recommendedWaistOrChest: "42 inches chest",
      fitType: "Regular",
      returnRiskNote: "Natural mother-of-pearl buttons are brittle during transit press."
    },
    predictedAction: "AUTO-APPROVE",
    predictedCategory: "genuine_quality_issue",
    probabilities: {
      autoApprove: 0.82,
      inspect: 0.14,
      escalate: 0.04,
    },
    observedFacts: [
      "Merchandise value: ₹1,450",
      "11-month account standing with 10 completed orders and 1 return",
      "Customer uploaded clear photo of broken button shards in original polybag"
    ],
    policySignals: [
      "Transit Damage Warranty applies within 7 days of delivery"
    ],
    missingInformation: [
      "None required for standard quality claim"
    ],
    riskIndicators: [
      "None"
    ],
    genuineEvidence: [
      "Documented transit press issue on natural mother-of-pearl buttons in batch #LN-202"
    ],
    applicablePolicyCondition: "Transit Damage Policy: Transit product damage with photographic proof is eligible for instantaneous automated refund or replacement.",
    explanation: "Verified transit defect on packaging with documented button brittleness report. Instant auto-approval preserves positive NPS.",
    humanReviewStatus: "PENDING_REVIEW",
    auditTrail: [
      {
        id: "aud-7",
        timestamp: "2026-10-21 09:00 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated recommendation: AUTO-APPROVE (Confidence: 82%)"
      }
    ]
  },
  {
    id: "RET-8948",
    orderId: "ORD-992147",
    customerName: "Ananya Deshmukh",
    customerTenureMonths: 6,
    customerTenureTier: "Mid (4-12m)",
    orderValue: 2199,
    valueTier: "Mid (₹1k-₹3k)",
    discountPercent: 25,
    deliveryDays: 5,
    requestDate: "2026-10-21",
    productName: "Pleated Floral Wrap Midi Dress",
    productCategory: "Dresses",
    returnHistoryCount: 2,
    returnHistoryRate: 0.25,
    hasSufficientHistory: true,
    customerReason: "Chest fitting bahut tight hai, wrap tie bandh nahi paa rahi.",
    customerReasonTranslation: "Chest fitting is very tight, cannot tie the wrap band.",
    detectedLanguage: "Hinglish",
    sizeChart: {
      orderedSize: "S",
      recommendedWaistOrChest: "Bust 34 inches, Waist 26 inches",
      fitType: "Slim",
      returnRiskNote: "Wrap dresses lack elastane; bust ease is 0.5 inches smaller than international standard."
    },
    predictedAction: "INSPECT",
    predictedCategory: "genuine_fit_issue",
    probabilities: {
      autoApprove: 0.31,
      inspect: 0.61,
      escalate: 0.08,
    },
    observedFacts: [
      "Mid-value dress (₹2,199)",
      "Customer tenure is 6 months",
      "Customer retained 3 other apparel items in the same cart delivery"
    ],
    policySignals: [
      "Eligible for exchange or return within standard return window"
    ],
    missingInformation: [
      "Customer cup size and measurement feedback for size chart refinement"
    ],
    riskIndicators: [
      "None"
    ],
    genuineEvidence: [
      "Customer text cites specific physical closure limitation ('wrap tie bandh nahi paa rahi')",
      "Catalog returns data indicates bust-line ease defect on Small sizes"
    ],
    applicablePolicyCondition: "Standard Apparel Sizing Policy: Fit claims without defect require physical QA check or size exchange.",
    explanation: "Clear fit grievance related to dress bust-line ease. Inspect status facilitates offering an immediate seamless size replacement to M rather than a dead-end refund.",
    humanReviewStatus: "PENDING_REVIEW",
    auditTrail: [
      {
        id: "aud-8",
        timestamp: "2026-10-21 09:04 IST",
        actor: "DecisionEngine-v1 (Synthetic)",
        action: "Generated recommendation: INSPECT (Confidence: 61%)"
      }
    ]
  }
];

export const SYNTHETIC_PRODUCT_FIT_INSIGHTS: ProductFitInsight[] = [
  {
    id: "prod-1",
    productName: "Vintage Indigo Slim Jeans",
    category: "Denim & Jeans",
    totalOrdersSample: 340,
    fitReturnCount: 68,
    fitReturnRate: 0.20,
    primaryComplaintTheme: "Waistline runs 1-1.5 inches smaller than standard sizing",
    currentSizeGuidance: "Standard slim fit; order your usual size.",
    suggestedGuidanceImprovement: "Update size chart to recommend sizing up 1 size for waist comfort (e.g. 32 to 34). Add exact flat waist measurement.",
    status: "Needs Revision",
    evidenceCount: 68,
    dateRange: "Aug 2026 – Oct 2026"
  },
  {
    id: "prod-2",
    productName: "High-Rise Stretch Ankle Jeggings",
    category: "Denim & Jeans",
    totalOrdersSample: 280,
    fitReturnCount: 51,
    fitReturnRate: 0.182,
    primaryComplaintTheme: "High compression elastic band creates excessive pinch at waist",
    currentSizeGuidance: "Snug body-hugging jegging.",
    suggestedGuidanceImprovement: "Clarify compression strength level. Explain difference between relaxed jegging vs active compression hold.",
    status: "Needs Revision",
    evidenceCount: 51,
    dateRange: "Jul 2026 – Oct 2026"
  },
  {
    id: "prod-3",
    productName: "Pleated Floral Wrap Midi Dress",
    category: "Dresses",
    totalOrdersSample: 195,
    fitReturnCount: 33,
    fitReturnRate: 0.169,
    primaryComplaintTheme: "Bust wrap closure provides inadequate overlap for bust sizes >34C",
    currentSizeGuidance: "True to size wrap dress.",
    suggestedGuidanceImprovement: "Add cup size recommendation table (A-B true to size, C+ size up).",
    status: "Needs Revision",
    evidenceCount: 33,
    dateRange: "Sep 2026 – Oct 2026"
  },
  {
    id: "prod-4",
    productName: "Tailored Linen Casual Shirt",
    category: "Formal Shirts",
    totalOrdersSample: 410,
    fitReturnCount: 38,
    fitReturnRate: 0.093,
    primaryComplaintTheme: "Shoulder seam slightly narrow on athletic builds",
    currentSizeGuidance: "Regular fit linen shirt.",
    suggestedGuidanceImprovement: "Provide shoulder-to-shoulder cross measurements in addition to chest.",
    status: "Under Review",
    evidenceCount: 38,
    dateRange: "Jun 2026 – Oct 2026"
  },
  {
    id: "prod-5",
    productName: "Breathable Mesh Runner Shoes",
    category: "Footwear",
    totalOrdersSample: 520,
    fitReturnCount: 42,
    fitReturnRate: 0.081,
    primaryComplaintTheme: "Toe box narrow for wider Indian feet profiles",
    currentSizeGuidance: "UK standard athletic shoe sizing.",
    suggestedGuidanceImprovement: "Indicate Wide-Toe box disclaimer. Recommend ordering 0.5 size larger if foot width exceeds 9.8cm.",
    status: "Under Review",
    evidenceCount: 42,
    dateRange: "May 2026 – Oct 2026"
  }
];
