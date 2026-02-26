"use client";
import React from "react";
import BookPage from "./BookPage";
import { PageNum, SectionLabel } from "./PageHeader";

// Using the user's provided education / learning timeline rather than corporate jobs
const JOBS = [
  {
    role: "Web Development Student",
    co: "Programming Hero",
    period: "2023–Present",
    desc: "Learning full-stack web development: React, Node.js, Express, MongoDB.",
  },
  {
    role: "HSC Student",
    co: "Rajibpur Technical & B.M. College",
    period: "2023–Present",
    desc: "Studying Digital Technology in Business.",
  },
];

const ResumePage = React.forwardRef(function ResumePage(_, ref) {
  return (
    <BookPage ref={ref} side="left">
      <div className="flex min-h-full flex-col px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <PageNum n={3} />
        <SectionLabel>Experience</SectionLabel>
        <h2 className="font-cormorant mb-5 text-2xl leading-none font-light tracking-tight text-white/90 sm:mb-6 sm:text-3xl lg:text-[36px]">
          Résumé
        </h2>

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
              <span className="text-gold/50 mb-1 block font-mono text-[9px] tracking-[0.28em] uppercase sm:mb-1.5">
                {job.co}
              </span>
              <p className="font-mono text-[10px] leading-relaxed text-white/38 sm:text-[11px]">
                {job.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="border-gold/10 mb-4 border-t pt-3.5 sm:mb-5 sm:pt-4">
          <p className="text-gold/50 mb-2 font-mono text-[9px] tracking-[0.28em] uppercase">
            Education
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-cormorant text-[14px] font-light text-white/75">
                HSC — Rajibpur Technical &amp; B.M. College
              </p>
              <p className="font-mono text-[10px] text-white/28">
                Kurigram · 2023 — Present
              </p>
            </div>
            <div>
              <p className="font-cormorant text-[14px] font-light text-white/75">
                Web Development Course — Programming Hero
              </p>
              <p className="font-mono text-[10px] text-white/28">
                Online · 2023 — Present
              </p>
            </div>
          </div>
        </div>

        <a
          href="/src/assets/Resume.pdf"
          download
          className="text-gold border-gold/20 hover:bg-gold/5 hover:border-gold/40 mt-auto inline-flex items-center gap-2.5 self-start rounded-sm border px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200"
        >
          Download Resume <span className="text-base leading-none">↓</span>
        </a>
      </div>
    </BookPage>
  );
});

export default ResumePage;
