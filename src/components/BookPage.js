"use client";
import { forwardRef } from "react";
import { stopFlip } from "./utils";

// BookPage: lightweight wrapper required by react-pageflip — keeps visual
// structure, shadows and prevents inner clicks from triggering flips.
export const BookPage = forwardRef(function BookPage(
  { children, side = "right" },
  ref,
) {
  return (
    <div
      ref={ref}
      className={[
        "relative h-full w-full overflow-hidden select-none",
        side === "left" ? "bg-[#141414]" : "bg-[#111111]",
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {side === "left" && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l from-black/45 to-transparent"
        />
      )}
      {side === "right" && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r from-black/45 to-transparent"
        />
      )}

      {side === "right" && (
        <div
          aria-hidden
          className="bg-gold/5 pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-px"
        />
      )}
      {side === "left" && (
        <div
          aria-hidden
          className="bg-gold/5 pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-px"
        />
      )}

      <div
        className="relative z-20 h-full w-full overflow-x-hidden overflow-y-auto [scrollbar-color:rgba(201,169,110,0.18)_transparent] [scrollbar-width:thin]"
        onMouseDown={stopFlip}
        onTouchStart={stopFlip}
      >
        {children}
      </div>
    </div>
  );
});

export default BookPage;
