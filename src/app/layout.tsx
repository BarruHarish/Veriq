import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "Veriq — Fair Returns Intelligence",
  description: "Every return. A fair decision. Distinguish suspicious return patterns from genuine customer grievances with fair, explainable intelligence.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Veriq — Fair Returns Intelligence",
    description: "Every return. A fair decision. Identify risk. Understand complaints. Decide with evidence.",
    siteName: "Veriq",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
