"use client";
import React from "react";
import BookPage from "./BookPage";
import { GoldDivider, PageNum, SectionLabel } from "./PageHeader";

const AboutPage = React.forwardRef(function AboutPage(_, ref) {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Figma", "AWS"];
  const stats = [
    ["6+", "Years"],
    ["40+", "Projects"],
    ["12", "Clients"],
  ];

  return (
    <BookPage ref={ref} side="left">
      <div className="flex min-h-full flex-col gap-0 px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <PageNum n={1} />
        <SectionLabel>About Me</SectionLabel>

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

        <div className="mb-4 flex flex-wrap justify-center gap-1.5 sm:mb-6 sm:gap-2">
          {skills.map((s) => (
            <span
              key={s}
              onMouseDown={(e) => e.stopPropagation()}
              className="border-gold/10 hover:border-gold/30 hover:text-gold/70 cursor-default rounded-sm border px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase transition-all duration-200 sm:px-2.5 sm:py-1"
            >
              {s}
            </span>
          ))}
        </div>

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

export default AboutPage;
