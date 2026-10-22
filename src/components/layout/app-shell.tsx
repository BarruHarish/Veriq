"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { ToastBanner } from "@/components/layout/toast-banner";
import { ReturnsProvider } from "@/features/returns/returns-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return (
      <ReturnsProvider>
        {children}
        <ToastBanner />
      </ReturnsProvider>
    );
  }

  return (
    <ReturnsProvider>
      <div className="flex min-h-screen">
        {/* Persistent left sidebar for authenticated workspace */}
        <Sidebar />

        {/* Main workspace content area */}
        <div className="flex-1 ml-64 flex flex-col min-h-screen bg-slate-50">
          <TopNav />
          <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <ToastBanner />
        </div>
      </div>
    </ReturnsProvider>
  );
}
