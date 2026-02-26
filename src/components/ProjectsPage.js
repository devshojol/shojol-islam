"use client";
import React from "react";
import BookPage from "./BookPage";
import { PageNum, SectionLabel } from "./PageHeader";

const PROJECTS = [
  {
    name: "Portfolio Website",
    desc: "Personal portfolio showcasing projects and resume.",
    tag: "Personal",
    year: "2024",
  },
  {
    name: "E-Commerce UI",
    desc: "A responsive e-commerce front-end built with React and Tailwind.",
    tag: "Practice",
    year: "2023",
  },
  {
    name: "Task Manager",
    desc: "A small CRUD app using Node.js, Express and MongoDB.",
    tag: "Learning",
    year: "2023",
  },
];

const ProjectsPage = React.forwardRef(function ProjectsPage(_, ref) {
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
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
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

export default ProjectsPage;
