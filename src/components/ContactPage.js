"use client";
import React, { useState } from "react";
import BookPage from "./BookPage";
import { PageNum, SectionLabel } from "./PageHeader";

const LINKS = [
  ["GitHub", "github.com/devshojol"],
  ["LinkedIn", "www.linkedin.com/in/devshojol"],
  ["Email", "shojolislam3231@gmail.com"],
  ["Facebook", "www.facebook.com/ShojolIslamShojib"],
];

const ContactPage = React.forwardRef(function ContactPage(_, ref) {
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
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
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
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
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
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="border-gold/10 focus:border-gold/30 w-full resize-none rounded-sm border bg-white/[0.025] px-3 py-2 font-mono text-[12px] text-white/75 transition-colors duration-200 outline-none placeholder:text-white/18"
              />
            </div>

            <button
              type="submit"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
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

        <div className="border-gold/10 mt-auto flex flex-col border-t">
          {LINKS.map(([label, val]) => (
            <a
              key={label}
              href="#"
              onClick={(e) => e.preventDefault()}
              onMouseDown={(e) => e.stopPropagation()}
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

export default ContactPage;
