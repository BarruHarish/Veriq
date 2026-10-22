# Veriq — Fair Returns Intelligence
**Talent AP Hackathon | Problem Statement R2: Returns Fraud vs. Genuine Grievance Sorter**

**Primary Tagline:** Every return. A fair decision.  
**Supporting Line:** Identify risk. Understand complaints. Decide with evidence.

Veriq is a returns intelligence platform that helps fashion e-commerce operations teams distinguish suspicious return patterns from genuine customer grievances and make evidence-based, fair routing decisions (**AUTO-APPROVE**, **INSPECT**, **ESCALATE**) while enforcing linguistic equity, non-punitive handling of new shoppers, and root-cause catalog fit insights.

---

## ⚡ Quick Start & Run Instructions

### Start the Application
```bash
# In the repository root:
npm run build
npm run start -- -p 3001
# Or in development mode:
npm run dev
```
Open **[http://localhost:3001](http://localhost:3001)** in your browser.

### Run Backend & Policy Validation Tests
```bash
python -m pytest tests/test_decision_engine.py
```

---

## 🛡️ Dataset Status & Ethical Safeguards

- **DEMO MODE · SYNTHETIC DATA:** Uses a deterministic fixture of 8 realistic return cases with multi-lingual customer reasoning (English, Hinglish, Telugu/Hinglish).
- **Zero Fabricated Scores:** No fake accuracy, precision, recall, or official cost-weighted losses are displayed.
- **Clear Separation:** Predicted categories (`abusive`, `genuine_quality_issue`, `genuine_fit_issue`, `genuine_wrong_item`) are displayed separately from routing actions (`AUTO-APPROVE`, `INSPECT`, `ESCALATE`).
- **Linguistic Equity:** Emotional tone or vernacular phrasing is never treated as independent proof of false grievance or fraud.
- **"Official model evaluation pending dataset upload"** is clearly shown where appropriate.

---

## 🧭 Workspace & Page Directory

| Route | Page Name | Primary Purpose |
| :--- | :--- | :--- |
| **`/`** | **Public Homepage** | Distinctive editorial landing page with hero, problem/solution, workflow, fairness principles, and interactive DecisionMap. |
| **`/overview`** | **Operations Overview** | Executive workload metrics, pending review queues, routing distributions, and category analytics. |
| **`/queue`** | **Returns Queue** | Searchable, filterable, sortable operations queue with direct links to the workbench. |
| **`/workbench`** | **Decision Workbench** | Flagship review interface: separated facts, policy conditions, customer translations, override modal with mandatory justification, and customer response assistant. |
| **`/fairness`** | **Fairness Center** | Subgroup audits across language dialects, customer tenure, and basket size with empirical rate distributions. |
| **`/fit-intelligence`** | **Fit Intelligence** | Sizing root-cause analytics for high-variance products, interactive sizing drawer, and CSV data export. |
| **`/evaluation`** | **Evaluation Center** | Asymmetric cost-matrix analysis, pending evaluation status, and technical guide on calibration and imbalance. |
| **`/dataset`** | **Dataset & Model** | CSV schema uploader, required-column checklist, column mapping UI, and truthful model training readiness status. |

---

## 🎨 Visual Identity & Brand Tokens

- **Brand Symbol**: Abstract V-shaped ribbon featuring purple-indigo to cyan-teal gradients.
- **Palette**: Deep navy ink (`#0F172A`), warm ivory background (`#F7F6F2`), fine parchment borders (`#E2E0D8`), and restrained brand violet (`#7C3AED`) and teal (`#0D9488`).
- **Typography**: Editorial serif (*Newsreader* / Georgia) for display headlines, *Plus Jakarta Sans* for readable interface copy, and *JetBrains Mono* for technical identifiers and coordinates.
- **Routing Status**:
  - Green (`#10B981`): Auto-Approve
  - Amber (`#F59E0B`): Inspect
  - Red (`#EF4444`): Escalate
