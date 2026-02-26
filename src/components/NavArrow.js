"use client";

export default function NavArrow({ dir, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous page" : "Next page"}
      className={[
        "h-10 w-10 rounded-full border font-mono text-base sm:h-11 sm:w-11 sm:text-lg",
        "flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-200",
        disabled
          ? "border-gold/6 cursor-not-allowed text-white/10 opacity-40"
          : "border-gold/22 hover:border-gold/50 hover:text-gold cursor-pointer text-white/45 hover:shadow-[0_0_24px_rgba(201,169,110,0.12)]",
      ].join(" ")}
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );
}
