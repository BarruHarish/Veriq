import React from "react";
import Image from "next/image";

export interface VeriqLogoProps {
  className?: string;
  variant?: "horizontal" | "compact" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
  withDescriptor?: boolean;
}

export function VeriqLogo({
  className = "",
  variant = "horizontal",
  size = "md",
  light = false,
  withDescriptor = true,
}: VeriqLogoProps) {
  // Height sizing mapping for razor-sharp pixel fidelity
  const heights = {
    sm: { header: 28, icon: 26, wordmarkText: "text-[20px]" },
    md: { header: 36, icon: 34, wordmarkText: "text-[26px]" },
    lg: { header: 44, icon: 42, wordmarkText: "text-[32px]" },
    xl: { header: 54, icon: 50, wordmarkText: "text-[38px]" },
  }[size];

  // 1. Icon Only variant (using official high-res cropped V symbol)
  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center shrink-0 ${className}`}>
        <Image
          src="/veriq-icon.png"
          alt="Veriq V Symbol"
          width={heights.icon}
          height={heights.icon}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  // 2. Full Horizontal Brand Mark (matches the user's official uploaded logo image)
  if (variant === "horizontal") {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <Image
          src="/veriq-brand-header.png"
          alt="Veriq — Fair Returns Intelligence"
          width={Math.round(heights.header * 3.25)}
          height={heights.header}
          className="object-contain h-auto"
          style={{ height: `${heights.header}px`, width: "auto" }}
          priority
        />
      </div>
    );
  }

  // 3. Compact variant (Icon + pure Wordmark for tighter spaces like sidebar)
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <Image
        src="/veriq-icon.png"
        alt="Veriq"
        width={heights.icon}
        height={heights.icon}
        className="object-contain shrink-0"
        priority
      />
      <span
        className={`font-sans font-extrabold tracking-tight leading-none ${heights.wordmarkText} ${
          light ? "text-white" : "text-[#0F172A]"
        }`}
        style={{ letterSpacing: "-0.03em" }}
      >
        veri<span className="relative">q<span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7C3AED] ml-0.5 align-top"></span></span>
      </span>
    </div>
  );
}
