"use client";

export const SectionLabel = ({ children }) => (
  <p className="text-gold/70 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
    {children}
  </p>
);

export const PageNum = ({ n }) => (
  <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-white/10">
    {String(n).padStart(2, "0")}
  </p>
);

export const GoldDivider = () => <div className="bg-gold/30 my-3 h-px w-8" />;
