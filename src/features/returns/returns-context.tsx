"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ReturnRequest, HumanReviewStatus } from "@/types";
import { decisionEngineService } from "@/services/decisionEngine";

interface ReturnsContextType {
  returns: ReturnRequest[];
  selectedId: string;
  selectedReturn: ReturnRequest | undefined;
  setSelectedId: (id: string) => void;
  updateDecision: (id: string, status: HumanReviewStatus, notes: string, overrideReason?: string) => void;
  resetAll: () => void;
  toastMessage: string | null;
  clearToast: () => void;
}

const ReturnsContext = createContext<ReturnsContextType | undefined>(undefined);

export function ReturnsProvider({ children }: { children: React.ReactNode }) {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string>("RET-8941");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const list = decisionEngineService.getAllRequests();
    setReturns(list);
    if (list.length > 0 && !list.find((r) => r.id === selectedId)) {
      setSelectedId(list[0].id);
    }
  }, []);

  const clearToast = () => setToastMessage(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const updateDecision = (id: string, status: HumanReviewStatus, notes: string, overrideReason?: string) => {
    try {
      const updated = decisionEngineService.updateReviewDecision(id, status, notes, overrideReason);
      setReturns(decisionEngineService.getAllRequests());
      showToast(`Decision recorded: ${status.replace(/_/g, " ")} for ${id}`);
    } catch (e: any) {
      showToast(`Error updating decision: ${e.message}`);
    }
  };

  const resetAll = () => {
    decisionEngineService.resetToDefaults();
    const fresh = decisionEngineService.getAllRequests();
    setReturns(fresh);
    if (fresh.length > 0) setSelectedId(fresh[0].id);
    showToast("Reset all demo review actions to baseline state");
  };

  const selectedReturn = returns.find((r) => r.id === selectedId) || returns[0];

  return (
    <ReturnsContext.Provider
      value={{
        returns,
        selectedId,
        selectedReturn,
        setSelectedId,
        updateDecision,
        resetAll,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </ReturnsContext.Provider>
  );
}

export function useReturns() {
  const context = useContext(ReturnsContext);
  if (!context) {
    throw new Error("useReturns must be used within a ReturnsProvider");
  }
  return context;
}
