"use client";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FlipbookPortfolio.jsx  —  react-pageflip + Tailwind CSS        ║
 * ║  Fully responsive: mobile · tablet · laptop · 4K                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * INSTALL:
 *   npm install react-pageflip
 *
 * tailwind.config.js → theme.extend:
 *   fontFamily: {
 *     cormorant: ['Cormorant Garamond', 'serif'],
 *     mono:      ['DM Mono', 'monospace'],
 *   },
 *   colors: {
 *     gold: {
 *       DEFAULT: '#c9a96e',
 *       muted:   'rgba(201,169,110,0.5)',
 *       dim:     'rgba(201,169,110,0.2)',
 *       glow:    'rgba(201,169,110,0.08)',
 *     },
 *   },
 *
 * app/globals.css:
 *   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import HTMLFlipBook from "react-pageflip";

// ─────────────────────────────────────────────────────────────────
// Breakpoint thresholds (px)
// ─────────────────────────────────────────────────────────────────
const BP = {
  mobile: 640, // < 640  → single-page portrait
  tablet: 1024, // 640–1024 → two-page spread, compact
  laptop: 1440, // 1024–1440 → two-page spread, comfortable
  // > 1440 → two-page spread, generous
};

// ─────────────────────────────────────────────────────────────────
// Calculate book page dimensions from current viewport
// Returns { pageW, pageH, isMobile, usePortrait }
// ─────────────────────────────────────────────────────────────────
function calcPageSize() {
  const vw = window.innerWidth;
  // Use visualViewport height when available — avoids browser chrome overlap on mobile
  const vh = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  const NAV_BAR = 72; // pixels reserved at bottom for navigation

  if (vw < BP.mobile) {
    // ── Mobile: full screen, single page ──────────────────────────
    // Leave room for bottom nav bar
    return {
      pageW: vw,
      pageH: vh - NAV_BAR,
      isMobile: true,
      usePortrait: true,
    };
  }

  if (vw < BP.tablet) {
    // ── Tablet (640–1024): two-page spread ────────────────────────
    // Each page = 46% of viewport width to leave margin on both sides
    const pageW = Math.floor(vw * 0.46);
    // Constrain height: must fit in viewport minus nav bar and vertical margins
    const maxH = vh - NAV_BAR - 48;
    // Enforce 3:4 aspect ratio (portrait page)
    const pageH = Math.min(Math.floor(pageW * (4 / 3)), maxH);
    return { pageW, pageH, isMobile: false, usePortrait: false };
  }

  if (vw < BP.laptop) {
    // ── Laptop (1024–1440): comfortable two-page spread ───────────
    const pageW = Math.floor(Math.min(vw * 0.42, 480));
    const maxH = vh - NAV_BAR - 64;
    const pageH = Math.min(Math.floor(pageW * (4 / 3)), maxH);
    return { pageW, pageH, isMobile: false, usePortrait: false };
  }

  // ── Large desktop / 4K (> 1440) ───────────────────────────────
  const pageW = Math.floor(Math.min(vw * 0.38, 560));
  const maxH = vh - NAV_BAR - 80;
  const pageH = Math.min(Math.floor(pageW * (4 / 3)), maxH);
  return { pageW, pageH, isMobile: false, usePortrait: false };
}

// ─────────────────────────────────────────────────────────────────
// Shared micro-components
// ─────────────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <p className="text-gold/70 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
    {children}
  </p>
);

const PageNum = ({ n }) => (
  <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-white/10">
    {String(n).padStart(2, "0")}
  </p>
);

const GoldDivider = () => <div className="bg-gold/30 my-3 h-px w-8" />;

// ─────────────────────────────────────────────────────────────────
// BookPage — wrapper required by react-pageflip (must be forwardRef)
// ─────────────────────────────────────────────────────────────────

const BookPage = forwardRef(function BookPage(
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
      {/* Paper grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Spine-side inner shadow */}
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

      {/* Outer page edge rule */}
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

      {/* Scrollable content — uses full page height */}
      <div className="relative z-20 h-full w-full overflow-x-hidden overflow-y-auto [scrollbar-color:rgba(201,169,110,0.18)_transparent] [scrollbar-width:thin]">
        {children}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
// PAGE 1 · About Me
// ─────────────────────────────────────────────────────────────────

const AboutPage = forwardRef(function AboutPage(_, ref) {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Figma", "AWS"];
  const stats = [
    ["6+", "Years"],
    ["40+", "Projects"],
    ["12", "Clients"],
  ];

  return (
    <BookPage ref={ref} side="left">
      {/*
        Padding scales with viewport:
        xs/mobile → px-5 py-6
        sm/tablet → px-7 py-8
        lg/laptop+ → px-10 py-10
      */}
      <div className="flex min-h-full flex-col gap-0 px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <PageNum n={1} />
        <SectionLabel>About Me</SectionLabel>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2.5 py-2 text-center sm:gap-3 sm:py-4">
          <div className="relative">
            <div className="border-gold/30 h-14 w-14 rounded-full border p-[3px] sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]">
              <div className="flex h-full w-full items-end justify-center overflow-hidden rounded-full bg-[#1c1c1c]">
                <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
                  <circle cx="40" cy="30" r="18" fill="#c9a96e" opacity="0.8" />
                  <ellipse
                    cx="40"
                    cy="72"
                    rx="26"
                    ry="18"
                    fill="#c9a96e"
                    opacity="0.55"
                  />
                </svg>
              </div>
            </div>
            <div className="border-gold/10 absolute -inset-[5px] rounded-full border" />
          </div>

          <h1 className="font-cormorant text-xl leading-none font-light tracking-wide text-white/90 sm:text-2xl lg:text-[30px]">
            Alexandra Voss
          </h1>
          <p className="font-mono text-[9px] leading-relaxed tracking-[0.16em] text-white/35 uppercase">
            Full-Stack Engineer &amp; Creative Technologist
          </p>
        </div>

        <GoldDivider />

        <p className="font-cormorant mb-4 text-center text-sm leading-[1.75] font-light text-white/65 sm:mb-5 sm:text-[15px] lg:text-[16px]">
          I craft digital experiences at the intersection of engineering
          precision and artistic intent. With 6 years shaping products at scale,
          I believe the best interfaces feel&nbsp;inevitable.
        </p>

        {/* Skills */}
        <div className="mb-4 flex flex-wrap justify-center gap-1.5 sm:mb-6 sm:gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="border-gold/10 hover:border-gold/30 hover:text-gold/70 cursor-default rounded-sm border px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase transition-all duration-200 sm:px-2.5 sm:py-1"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Stats — pushed to bottom */}
        <div className="border-gold/10 mt-auto flex justify-center gap-5 border-t pt-4 sm:gap-7 sm:pt-5">
          {stats.map(([n, l]) => (
            <div key={l} className="flex flex-col items-center gap-0.5">
              <span className="font-cormorant text-gold text-xl leading-none font-light sm:text-[24px]">
                {n}
              </span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/25 uppercase sm:text-[9px]">
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BookPage>
  );
});

// ─────────────────────────────────────────────────────────────────
// PAGE 2 · Projects
// ─────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: "Lumen",
    desc: "AI-powered design system for enterprise teams",
    tag: "Product",
    year: "2024",
  },
  {
    name: "Meridian",
    desc: "Real-time geospatial analytics dashboard",
    tag: "Data Viz",
    year: "2023",
  },
  {
    name: "Opus",
    desc: "Collaborative music production in the browser",
    tag: "Creative",
    year: "2023",
  },
];

const ProjectsPage = forwardRef(function ProjectsPage(_, ref) {
  return (
    <BookPage ref={ref} side="right">
      <div className="flex min-h-full flex-col px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <PageNum n={2} />
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="font-cormorant mb-5 text-2xl leading-none font-light tracking-tight text-white/90 sm:mb-7 sm:text-3xl lg:text-[36px]">
          Projects
        </h2>

        <div className="divide-gold/10 border-gold/10 flex flex-col divide-y border-t">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="group flex cursor-pointer items-start gap-3 py-3.5 sm:gap-4 sm:py-[14px]"
            >
              <span className="min-w-[18px] pt-0.5 font-mono text-[10px] text-white/15 sm:min-w-[20px]">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex gap-2 sm:gap-3">
                  <span className="text-gold/55 font-mono text-[9px] tracking-[0.2em] uppercase">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[9px] text-white/18">
                    {p.year}
                  </span>
                </div>
                <h3 className="font-cormorant group-hover:text-gold mb-1 text-[17px] leading-tight font-light text-white/85 transition-colors duration-200 sm:text-[19px]">
                  {p.name}
                </h3>
                <p className="font-mono text-[10px] leading-relaxed text-white/38 sm:text-[11px]">
                  {p.desc}
                </p>
              </div>
              <span className="group-hover:text-gold flex-shrink-0 pt-4 font-mono text-sm text-white/18 transition-all duration-200 group-hover:translate-x-1 sm:pt-5">
                →
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-4 sm:pt-5">
          <div className="bg-gold/10 h-px flex-1" />
          <span className="text-gold/25 font-mono text-[9px] tracking-[0.22em] whitespace-nowrap uppercase">
            View all work
          </span>
          <div className="bg-gold/10 h-px flex-1" />
        </div>
      </div>
    </BookPage>
  );
});

// ─────────────────────────────────────────────────────────────────
// PAGE 3 · Résumé
// ─────────────────────────────────────────────────────────────────

const JOBS = [
  {
    role: "Senior Engineer",
    co: "Vercel",
    period: "2022–Present",
    desc: "Led DX initiatives improving build performance by 40%.",
  },
  {
    role: "Frontend Lead",
    co: "Stripe",
    period: "2020–2022",
    desc: "Owned the Dashboard design system used by 4M+ merchants.",
  },
  {
    role: "Engineer",
    co: "Linear",
    period: "2018–2020",
    desc: "Built real-time collaborative features from scratch.",
  },
];

const ResumePage = forwardRef(function ResumePage(_, ref) {
  return (
    <BookPage ref={ref} side="left">
      <div className="flex min-h-full flex-col px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <PageNum n={3} />
        <SectionLabel>Experience</SectionLabel>
        <h2 className="font-cormorant mb-5 text-2xl leading-none font-light tracking-tight text-white/90 sm:mb-6 sm:text-3xl lg:text-[36px]">
          Résumé
        </h2>

        {/* Timeline */}
        <div className="relative mb-4 pl-5 sm:mb-5">
          <div className="bg-gold/15 absolute top-2 bottom-2 left-[3px] w-px" />
          {JOBS.map((job) => (
            <div key={job.co} className="relative pb-4 last:pb-0 sm:pb-5">
              <div className="bg-gold/60 border-gold/25 absolute top-[6px] -left-[18px] h-[7px] w-[7px] rounded-full border" />
              <div className="mb-0.5 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0">
                <span className="font-cormorant text-[15px] font-light text-white/85 sm:text-[16px]">
                  {job.role}
                </span>
                <span className="font-mono text-[9px] tracking-wider whitespace-nowrap text-white/18">
                  {job.period}
                </span>
              </div>
              <span className="text-gold/50 mb-1 block font-mono text-[9px] tracking-[0.22em] uppercase sm:mb-1.5">
                {job.co}
              </span>
              <p className="font-mono text-[10px] leading-relaxed text-white/38 sm:text-[11px]">
                {job.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="border-gold/10 mb-4 border-t pt-3.5 sm:mb-5 sm:pt-4">
          <p className="text-gold/50 mb-2 font-mono text-[9px] tracking-[0.28em] uppercase">
            Education
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-cormorant text-[14px] font-light text-white/75 sm:text-[15px]">
              B.S. Computer Science
            </span>
            <span className="font-mono text-[10px] text-white/28">
              MIT · 2018
            </span>
          </div>
        </div>

        {/* Download CTA */}
        <a
          href="#"
          className="text-gold border-gold/20 hover:bg-gold/5 hover:border-gold/40 mt-auto inline-flex items-center gap-2.5 self-start rounded-sm border px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200"
        >
          Download CV <span className="text-base leading-none">↓</span>
        </a>
      </div>
    </BookPage>
  );
});

// ─────────────────────────────────────────────────────────────────
// PAGE 4 · Contact
// ─────────────────────────────────────────────────────────────────

const LINKS = [
  ["GitHub", "github.com/avoss"],
  ["LinkedIn", "linkedin.com/in/avoss"],
  ["Email", "hello@avoss.dev"],
];

const ContactPage = forwardRef(function ContactPage(_, ref) {
  const [sent, setSent] = useState(false);

  return (
    <BookPage ref={ref} side="right">
      <div className="flex min-h-full flex-col px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <PageNum n={4} />
        <SectionLabel>Get In Touch</SectionLabel>
        <h2 className="font-cormorant mb-4 text-2xl leading-none font-light tracking-tight text-white/90 sm:mb-5 sm:text-3xl lg:text-[36px]">
          Contact
        </h2>

        {!sent ? (
          <form
            className="mb-4 flex flex-col gap-3 sm:mb-5 sm:gap-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {[
              { label: "Name", type: "text", ph: "Your name" },
              { label: "Email", type: "email", ph: "your@email.com" },
            ].map(({ label, type, ph }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={ph}
                  required
                  className="border-gold/10 focus:border-gold/30 w-full rounded-sm border bg-white/[0.025] px-3 py-2 font-mono text-[12px] text-white/75 transition-colors duration-200 outline-none placeholder:text-white/18"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase">
                Message
              </label>
              <textarea
                placeholder="Tell me about your project…"
                rows={3}
                required
                className="border-gold/10 focus:border-gold/30 w-full resize-none rounded-sm border bg-white/[0.025] px-3 py-2 font-mono text-[12px] text-white/75 transition-colors duration-200 outline-none placeholder:text-white/18"
              />
            </div>

            <button
              type="submit"
              className="bg-gold cursor-pointer self-start rounded-sm px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[#0d0d0d] uppercase transition-opacity duration-200 hover:opacity-85"
            >
              Send Message →
            </button>
          </form>
        ) : (
          <div className="mb-4 flex flex-col items-center gap-4 py-6 sm:py-8">
            <div className="border-gold/30 text-gold flex h-11 w-11 items-center justify-center rounded-full border text-lg sm:h-12 sm:w-12 sm:text-xl">
              ✓
            </div>
            <p className="font-cormorant text-center text-[16px] font-light text-white/45 sm:text-[17px]">
              Message received. I'll be in touch soon.
            </p>
          </div>
        )}

        {/* Social links */}
        <div className="border-gold/10 mt-auto flex flex-col border-t">
          {LINKS.map(([label, val]) => (
            <a
              key={label}
              href="#"
              className="border-gold/10 hover:text-gold group flex items-center justify-between border-b py-2.5 text-white/75 transition-colors duration-200 sm:py-3"
            >
              <span className="group-hover:text-gold/55 font-mono text-[9px] tracking-[0.25em] text-white/28 uppercase transition-colors">
                {label}
              </span>
              <span className="max-w-[60%] truncate text-right font-mono text-[10px] sm:text-[11px]">
                {val}
              </span>
            </a>
          ))}
        </div>
      </div>
    </BookPage>
  );
});

// ─────────────────────────────────────────────────────────────────
// Tutorial Overlay
// ─────────────────────────────────────────────────────────────────

function TutorialOverlay({ onDismiss, isMobile }) {
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

// ─────────────────────────────────────────────────────────────────
// Navigation arrow button
// ─────────────────────────────────────────────────────────────────

function NavArrow({ dir, onClick, disabled }) {
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

// ─────────────────────────────────────────────────────────────────
// Root · FlipbookPortfolio
// ─────────────────────────────────────────────────────────────────

const ALL_PAGES = [AboutPage, ProjectsPage, ResumePage, ContactPage];

// SSR-safe initial state — will be corrected on first client paint
const INITIAL_SIZE = {
  pageW: 420,
  pageH: 560,
  isMobile: false,
  usePortrait: false,
};

export default function FlipbookPortfolio() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [dims, setDims] = useState(INITIAL_SIZE);
  const [bookKey, setBookKey] = useState(0); // force remount on resize
  const bookRef = useRef(null);
  const resizeRef = useRef(null); // debounce timer

  // ── Responsive dimension calculation ──────────────────────────
  useEffect(() => {
    function recalc(forceRemount = false) {
      const next = calcPageSize();
      setDims(next);
      // Remount the flip book so react-pageflip re-initialises with new dimensions
      if (forceRemount) setBookKey((k) => k + 1);
    }

    // Run immediately on mount (client only — fixes SSR mismatch)
    recalc(false);

    function onResize() {
      // Debounce resize events to avoid thrashing
      clearTimeout(resizeRef.current);
      resizeRef.current = setTimeout(() => recalc(true), 120);
    }

    window.addEventListener("resize", onResize);
    // Also listen to visualViewport for mobile browser chrome changes
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeRef.current);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  // ── Keyboard navigation ────────────────────────────────────────
  const flipNext = useCallback(
    () => bookRef.current?.pageFlip()?.flipNext(),
    [],
  );
  const flipPrev = useCallback(
    () => bookRef.current?.pageFlip()?.flipPrev(),
    [],
  );
  const goTo = useCallback((i) => bookRef.current?.pageFlip()?.flip(i), []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") flipNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") flipPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipNext, flipPrev]); // ← proper deps array, no stale-closure bug

  const onFlip = useCallback((e) => setCurrentPage(e.data), []);

  const canPrev = currentPage > 0;
  const canNext = currentPage < ALL_PAGES.length - 1;

  const { pageW, pageH, isMobile, usePortrait } = dims;
  const bookWidth = isMobile ? pageW : pageW * 2;
  const bookHeight = pageH;

  return (
    /*
     * Root container:
     * – overflow-hidden prevents any accidental horizontal scroll
     * – pb-[72px] ensures the book never slides under the fixed nav bar
     */
    <div className="relative flex min-h-dvh min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0d0d0d] pb-[72px]">
      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,169,110,0.04),transparent_70%)]"
      />

      {/* Tutorial overlay */}
      {showTutorial && (
        <TutorialOverlay
          onDismiss={() => setShowTutorial(false)}
          isMobile={isMobile}
        />
      )}

      {/* ── Book shell ─────────────────────────────────────────── */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: bookWidth,
          height: bookHeight,
          // Book-level drop shadow — gives the physical book illusion
          filter:
            "drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 6px 14px rgba(0,0,0,0.75))",
        }}
      >
        {/* Center spine line (desktop two-page spread only) */}
        {!isMobile && (
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 z-30"
            style={{ left: pageW - 1, width: 2 }}
          >
            <div className="via-gold/10 h-full w-full bg-gradient-to-r from-black/80 to-black/80" />
          </div>
        )}

        {/*
         * react-pageflip:
         * – key={bookKey} forces full remount when viewport changes breakpoint
         * – width/height are a single page dimensions
         * – usePortrait=true  → single-page mode (mobile)
         * – usePortrait=false → two-page spread mode (tablet/desktop)
         * – size="fixed" disables its own responsive logic (we handle it ourselves)
         */}
        <HTMLFlipBook
          key={bookKey}
          ref={bookRef}
          width={pageW}
          height={pageH}
          size="fixed"
          minWidth={pageW}
          maxWidth={pageW}
          minHeight={pageH}
          maxHeight={pageH}
          showCover={false}
          flippingTime={680}
          usePortrait={usePortrait}
          startPage={0}
          drawShadow
          useMouseEvents
          swipeDistance={isMobile ? 20 : 40}
          showPageCorners
          disableFlipByClick={false}
          onFlip={onFlip}
          className="!shadow-none !outline-none"
          style={{ margin: 0 }}
        >
          <AboutPage />
          <ProjectsPage />
          <ResumePage />
          <ContactPage />
        </HTMLFlipBook>
      </div>

      {/* ── Fixed bottom navigation bar ─────────────────────────
           Height = 72px, matching the pb-[72px] on the root container
           so the book is never obscured.
      ─────────────────────────────────────────────────────────── */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-[72px] items-center justify-center gap-4 bg-gradient-to-t from-[#0d0d0d]/90 to-transparent backdrop-blur-[2px] sm:gap-5">
        {/* Prev arrow — hidden on mobile (swipe to navigate) */}
        <div className={isMobile ? "invisible" : "visible"}>
          <NavArrow dir="prev" onClick={flipPrev} disabled={!canPrev} />
        </div>

        {/* Page indicator pills */}
        <div className="flex items-center gap-2">
          {ALL_PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              className={[
                "rounded-full border transition-all duration-300",
                i === currentPage
                  ? "bg-gold border-gold h-[5px] w-5"
                  : "border-gold/30 hover:border-gold/60 h-[5px] w-[5px] bg-transparent",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Next arrow — hidden on mobile */}
        <div className={isMobile ? "invisible" : "visible"}>
          <NavArrow dir="next" onClick={flipNext} disabled={!canNext} />
        </div>
      </div>
    </div>
  );
}
