"use client";

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║           FlipbookPortfolio.jsx                          ║
 * ║   react-pageflip + Tailwind CSS · Dark Gold Theme        ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * INSTALL:
 *   npm install react-pageflip
 *
 * TAILWIND CONFIG  (tailwind.config.js → theme.extend):
 *   theme: {
 *     extend: {
 *       fontFamily: {
 *         cormorant: ['Cormorant Garamond', 'serif'],
 *         mono: ['DM Mono', 'monospace'],
 *       },
 *       colors: {
 *         gold: {
 *           DEFAULT: '#c9a96e',
 *           muted:   'rgba(201,169,110,0.5)',
 *           dim:     'rgba(201,169,110,0.2)',
 *           glow:    'rgba(201,169,110,0.08)',
 *         },
 *       },
 *     },
 *   },
 *
 * GLOBAL CSS (app/globals.css or layout):
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
// Utility sub-components
// ─────────────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <p className="text-gold/70 mb-5 font-mono text-[10px] tracking-[0.3em] uppercase">
    {children}
  </p>
);

const PageNum = ({ n }) => (
  <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-white/10">
    {String(n).padStart(2, "0")}
  </p>
);

const GoldDivider = () => <div className="bg-gold/30 my-4 h-px w-10" />;

// ─────────────────────────────────────────────────────────────────
// BookPage wrapper  ← react-pageflip REQUIRES forwardRef on children
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
      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Spine shadow – left pages have it on the right, right pages on the left */}
      {side === "left" && (
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-10 bg-gradient-to-l from-black/50 to-transparent" />
      )}
      {side === "right" && (
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-10 bg-gradient-to-r from-black/50 to-transparent" />
      )}

      {/* Outer page edge */}
      {side === "right" && (
        <div className="bg-gold/5 pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-px" />
      )}
      {side === "left" && (
        <div className="bg-gold/5 pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-px" />
      )}

      {/* Scrollable content area */}
      <div className="relative z-20 h-full w-full overflow-y-auto [scrollbar-color:rgba(201,169,110,0.2)_transparent] [scrollbar-width:thin]">
        {children}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
// PAGE 1 · About
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
      <div className="flex h-full flex-col px-7 py-8 md:px-10 md:py-10">
        <PageNum n={1} />
        <SectionLabel>About Me</SectionLabel>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 py-3 text-center">
          <div className="relative">
            <div className="border-gold/30 h-[72px] w-[72px] rounded-full border p-[3px]">
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

          <h1 className="font-cormorant text-[clamp(20px,3.5vw,30px)] leading-none font-light tracking-wide text-white/90">
            Alexandra Voss
          </h1>
          <p className="font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase">
            Full-Stack Engineer &amp; Creative Technologist
          </p>
        </div>

        <GoldDivider />

        <p className="font-cormorant mb-5 text-center text-[clamp(13px,1.7vw,16px)] leading-[1.8] font-light text-white/65">
          I craft digital experiences that live at the intersection of
          engineering precision and artistic intent. With 6 years shaping
          products at scale, I believe the best interfaces feel&nbsp;inevitable.
        </p>

        {/* Skill chips */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="border-gold/10 hover:border-gold/30 hover:text-gold/70 cursor-default rounded-sm border px-2.5 py-[4px] font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase transition-all duration-200"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="border-gold/10 mt-auto flex justify-center gap-7 border-t pt-5">
          {stats.map(([n, l]) => (
            <div key={l} className="flex flex-col items-center gap-0.5">
              <span className="font-cormorant text-gold text-[24px] leading-none font-light">
                {n}
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase">
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
      <div className="flex h-full flex-col px-7 py-8 md:px-10 md:py-10">
        <PageNum n={2} />
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="font-cormorant mb-7 text-[clamp(24px,3.8vw,36px)] leading-none font-light tracking-tight text-white/90">
          Projects
        </h2>

        <div className="divide-gold/10 border-gold/10 flex flex-col divide-y border-t">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="group flex cursor-pointer items-start gap-4 py-[14px]"
            >
              <span className="min-w-[20px] pt-0.5 font-mono text-[10px] text-white/15">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex gap-3">
                  <span className="text-gold/55 font-mono text-[9px] tracking-[0.2em] uppercase">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[9px] text-white/18">
                    {p.year}
                  </span>
                </div>
                <h3 className="font-cormorant group-hover:text-gold mb-1 text-[19px] leading-tight font-light text-white/85 transition-colors duration-200">
                  {p.name}
                </h3>
                <p className="font-mono text-[11px] leading-relaxed text-white/38">
                  {p.desc}
                </p>
              </div>
              <span className="group-hover:text-gold flex-shrink-0 pt-5 font-mono text-sm text-white/18 transition-all duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-5">
          <div className="bg-gold/10 h-px flex-1" />
          <span className="text-gold/25 font-mono text-[9px] tracking-[0.25em] whitespace-nowrap uppercase">
            View all work
          </span>
          <div className="bg-gold/10 h-px flex-1" />
        </div>
      </div>
    </BookPage>
  );
});

// ─────────────────────────────────────────────────────────────────
// PAGE 3 · Resume
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
      <div className="flex h-full flex-col px-7 py-8 md:px-10 md:py-10">
        <PageNum n={3} />
        <SectionLabel>Experience</SectionLabel>
        <h2 className="font-cormorant mb-6 text-[clamp(24px,3.8vw,36px)] leading-none font-light tracking-tight text-white/90">
          Résumé
        </h2>

        {/* Timeline */}
        <div className="relative mb-5 pl-5">
          <div className="bg-gold/15 absolute top-2 bottom-2 left-[3px] w-px" />
          {JOBS.map((job) => (
            <div key={job.co} className="relative pb-5 last:pb-0">
              <div className="bg-gold/60 border-gold/25 absolute top-[6px] -left-[18px] h-[7px] w-[7px] rounded-full border" />
              <div className="mb-0.5 flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-cormorant text-[16px] font-light text-white/85">
                  {job.role}
                </span>
                <span className="font-mono text-[9px] tracking-wider whitespace-nowrap text-white/18">
                  {job.period}
                </span>
              </div>
              <span className="text-gold/50 mb-1.5 block font-mono text-[9px] tracking-[0.22em] uppercase">
                {job.co}
              </span>
              <p className="font-mono text-[11px] leading-relaxed text-white/38">
                {job.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="border-gold/10 mb-5 border-t pt-4">
          <p className="text-gold/50 mb-2.5 font-mono text-[9px] tracking-[0.3em] uppercase">
            Education
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-cormorant text-[15px] font-light text-white/75">
              B.S. Computer Science
            </span>
            <span className="font-mono text-[10px] text-white/28">
              MIT · 2018
            </span>
          </div>
        </div>

        {/* Download */}
        <a
          href="#"
          className="text-gold border-gold/20 hover:bg-gold/5 hover:border-gold/40 mt-auto inline-flex items-center gap-2.5 self-start rounded-sm border px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200"
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
      <div className="flex h-full flex-col px-7 py-8 md:px-10 md:py-10">
        <PageNum n={4} />
        <SectionLabel>Get In Touch</SectionLabel>
        <h2 className="font-cormorant mb-5 text-[clamp(24px,3.8vw,36px)] leading-none font-light tracking-tight text-white/90">
          Contact
        </h2>

        {!sent ? (
          <form
            className="mb-5 flex flex-col gap-3.5"
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
                  className="border-gold/10 focus:border-gold/30 rounded-sm border bg-white/[0.025] px-3 py-2 font-mono text-[12px] text-white/75 transition-colors duration-200 outline-none placeholder:text-white/18"
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
                className="border-gold/10 focus:border-gold/30 resize-none rounded-sm border bg-white/[0.025] px-3 py-2 font-mono text-[12px] text-white/75 transition-colors duration-200 outline-none placeholder:text-white/18"
              />
            </div>
            <button
              type="submit"
              className="bg-gold cursor-pointer self-start rounded-sm px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[#0d0d0d] uppercase transition-opacity duration-200 hover:opacity-85"
            >
              Send Message →
            </button>
          </form>
        ) : (
          <div className="mb-5 flex flex-col items-center gap-4 py-8">
            <div className="border-gold/30 text-gold flex h-12 w-12 items-center justify-center rounded-full border text-xl">
              ✓
            </div>
            <p className="font-cormorant text-center text-[17px] font-light text-white/45">
              Message received. I'll be in touch soon.
            </p>
          </div>
        )}

        <div className="border-gold/10 mt-auto flex flex-col border-t">
          {LINKS.map(([label, val]) => (
            <a
              key={label}
              href="#"
              className="border-gold/10 hover:text-gold group flex items-center justify-between border-b py-3 text-white/75 transition-colors duration-200"
            >
              <span className="group-hover:text-gold/55 font-mono text-[9px] tracking-[0.25em] text-white/28 uppercase transition-colors">
                {label}
              </span>
              <span className="font-mono text-[11px]">{val}</span>
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
    { icon: "↔", text: "Tap the page corner to turn" },
  ];
  const desktopHints = [
    { icon: "←→", text: "Click the arrow buttons below" },
    { icon: "⌨", text: "Use keyboard arrow keys" },
    { icon: "🖱", text: "Drag or click page corners to flip" },
  ];
  const hints = isMobile ? mobileHints : desktopHints;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-6 font-mono backdrop-blur-sm">
      <div className="border-gold/12 w-full max-w-[340px] rounded-sm border bg-[#111111] px-8 py-10 text-center shadow-[0_40px_80px_rgba(0,0,0,0.85)]">
        <span className="mb-5 block text-4xl" role="img" aria-label="book">
          📖
        </span>
        <h2 className="font-cormorant mb-2 text-[26px] font-light text-white/90">
          Welcome to my Portfolio
        </h2>
        <p className="mb-8 text-[10px] tracking-[0.22em] text-white/30 uppercase">
          Navigate like a real book
        </p>

        <ul className="mb-8 flex flex-col gap-3 text-left">
          {hints.map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div className="border-gold/15 flex h-9 w-9 shrink-0 items-center justify-center rounded border text-sm text-white/55">
                {icon}
              </div>
              <span className="text-[11px] text-white/40">{text}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onDismiss}
          className="bg-gold w-full cursor-pointer rounded-sm py-3 text-[11px] tracking-[0.25em] text-[#0d0d0d] uppercase transition-opacity duration-200 hover:opacity-85"
        >
          Open Book
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Nav Arrow Button
// ─────────────────────────────────────────────────────────────────

function NavArrow({ dir, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous page" : "Next page"}
      className={[
        "flex h-11 w-11 items-center justify-center rounded-full border bg-black/80 font-mono text-lg backdrop-blur-md transition-all duration-200",
        disabled
          ? "border-gold/6 cursor-not-allowed text-white/10"
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

export default function FlipbookPortfolio() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [pageSize, setPageSize] = useState({ w: 400, h: 540 });
  const bookRef = useRef(null);

  // ── Responsive sizing ────────────────────────────────────────
  useEffect(() => {
    function recalc() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 768;
      setIsMobile(mobile);

      if (mobile) {
        setPageSize({ w: vw, h: vh });
      } else {
        // Two pages side-by-side; each page = half the available width
        const totalW = Math.min(vw * 0.9, 1120);
        const pageW = Math.floor(totalW / 2);
        const pageH = Math.min(
          Math.floor(pageW * (4 / 3)),
          Math.floor(vh * 0.86),
        );
        setPageSize({ w: pageW, h: pageH });
      }
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  // ── Keyboard ─────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") flipNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") flipPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const flipNext = useCallback(
    () => bookRef.current?.pageFlip()?.flipNext(),
    [],
  );
  const flipPrev = useCallback(
    () => bookRef.current?.pageFlip()?.flipPrev(),
    [],
  );
  const goTo = useCallback((i) => bookRef.current?.pageFlip()?.flip(i), []);

  const onFlip = useCallback((e) => setCurrentPage(e.data), []);

  const canPrev = currentPage > 0;
  const canNext = currentPage < ALL_PAGES.length - 1;

  // ── Derived book dimensions ───────────────────────────────────
  const bookWidth = isMobile ? pageSize.w : pageSize.w * 2;
  const bookHeight = pageSize.h;

  return (
    <div className="relative flex min-h-dvh min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0d0d0d] font-mono">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,169,110,0.04),transparent_70%)]" />

      {/* Tutorial */}
      {showTutorial && (
        <TutorialOverlay
          onDismiss={() => setShowTutorial(false)}
          isMobile={isMobile}
        />
      )}

      {/* Book shell */}
      <div
        className="relative"
        style={{
          width: bookWidth,
          height: bookHeight,
          filter:
            "drop-shadow(0 50px 100px rgba(0,0,0,0.75)) drop-shadow(0 8px 16px rgba(0,0,0,0.8))",
        }}
      >
        {/* Center spine (desktop) */}
        {!isMobile && (
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-30"
            style={{ left: pageSize.w - 1, width: 2 }}
          >
            <div className="via-gold/10 h-full w-full bg-gradient-to-r from-black/80 to-black/80" />
          </div>
        )}

        {/* ── react-pageflip ── */}
        <HTMLFlipBook
          ref={bookRef}
          width={pageSize.w}
          height={pageSize.h}
          size="fixed"
          minWidth={pageSize.w}
          maxWidth={pageSize.w}
          minHeight={pageSize.h}
          maxHeight={pageSize.h}
          showCover={false}
          flippingTime={700}
          usePortrait={isMobile}
          startPage={0}
          drawShadow
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          onFlip={onFlip}
          className="!shadow-none"
        >
          <AboutPage />
          <ProjectsPage />
          <ResumePage />
          <ContactPage />
        </HTMLFlipBook>
      </div>

      {/* ── Bottom navigation bar ── */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-center gap-5 pb-7">
        {/* Hide arrows on mobile (swipe gestures used instead) */}
        <div className={isMobile ? "hidden" : "block"}>
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

        <div className={isMobile ? "hidden" : "block"}>
          <NavArrow dir="next" onClick={flipNext} disabled={!canNext} />
        </div>
      </div>
    </div>
  );
}
