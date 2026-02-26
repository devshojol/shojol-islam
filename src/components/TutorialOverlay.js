"use client";

export default function TutorialOverlay({ onDismiss, isMobile }) {
  const mobileHints = [
    { icon: "👆", text: "Swipe left / right to flip pages" },
    { icon: "↔", text: "Tap a page corner to turn" },
  ];
  const desktopHints = [
    { icon: "←→", text: "Click the arrow buttons below" },
    { icon: "⌨", text: "Use keyboard arrow keys" },
    { icon: "🖱", text: "Drag or click page corners to flip" },
  ];
  const hints = isMobile ? mobileHints : desktopHints;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/88 p-5 backdrop-blur-sm">
      <div className="border-gold/12 w-full max-w-[320px] rounded-sm border bg-[#111111] px-6 py-8 text-center shadow-[0_40px_80px_rgba(0,0,0,0.85)] sm:max-w-[360px] sm:px-8 sm:py-10">
        <span
          className="mb-4 block text-3xl sm:text-4xl"
          role="img"
          aria-label="book"
        >
          📖
        </span>

        <h2 className="font-cormorant mb-1.5 text-[22px] font-light text-white/90 sm:text-[26px]">
          Welcome to my Portfolio
        </h2>
        <p className="mb-6 font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase sm:mb-8">
          Navigate like a real book
        </p>

        <ul className="mb-6 flex flex-col gap-2.5 text-left sm:mb-8 sm:gap-3">
          {hints.map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div className="border-gold/15 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border font-mono text-xs text-white/55 sm:h-9 sm:w-9 sm:text-sm">
                {icon}
              </div>
              <span className="font-mono text-[11px] text-white/40">
                {text}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onDismiss}
          className="bg-gold w-full cursor-pointer rounded-sm py-2.5 font-mono text-[10px] tracking-[0.25em] text-[#0d0d0d] uppercase transition-opacity duration-200 hover:opacity-85 sm:py-3 sm:text-[11px]"
        >
          Open Book
        </button>
      </div>
    </div>
  );
}
