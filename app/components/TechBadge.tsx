"use client";

import React, { useState } from "react";

export interface TechBadgeProps {
  name: string;
  icon?: React.ReactNode;
  brandColor?: string;
  size?: "sm" | "md";
  className?: string;
}

export default function TechBadge({
  name,
  icon,
  brandColor,
  size = "md",
  className = "",
}: TechBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isSm = size === "sm";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      className={`group flex items-center ${
        isSm ? "h-8 px-2.5" : "h-10 px-3"
      } rounded-[8px] border border-[#161616]/12 hover:border-[#161616]/30 cursor-default transition-all duration-200 relative bg-white/70 hover:bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-0 select-none ${className}`}
    >
      {icon && (
        <span className="w-4 h-4 shrink-0 transition-transform duration-200 scale-100 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span
        style={{
          maxWidth: isHovered ? "160px" : "0px",
          marginLeft: isHovered ? "8px" : "0px",
          opacity: isHovered ? 1 : 0,
          transition:
            "max-width 250ms cubic-bezier(0.4, 0, 0.2, 1), margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "inline-block",
        }}
        className="text-xs font-normal text-[#161616]/80"
      >
        {name}
      </span>
    </div>
  );
}
