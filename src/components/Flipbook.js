"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import NavArrow from "./NavArrow";
import ProjectsPage from "./ProjectsPage";
import ResumePage from "./ResumePage";
import TutorialOverlay from "./TutorialOverlay";
import { calcPageSize } from "./utils";

const ALL_PAGES = [AboutPage, ProjectsPage, ResumePage, ContactPage];

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
  const [bookKey, setBookKey] = useState(0);
  const bookRef = useRef(null);
  const resizeRef = useRef(null);

  useEffect(() => {
    function recalc(forceRemount = false) {
      const next = calcPageSize();
      setDims(next);
      if (forceRemount) setBookKey((k) => k + 1);
    }

    recalc(false);

    function onResize() {
      clearTimeout(resizeRef.current);
      resizeRef.current = setTimeout(() => recalc(true), 120);
    }

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeRef.current);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

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
  }, [flipNext, flipPrev]);

  const onFlip = useCallback((e) => setCurrentPage(e.data), []);

  const canPrev = currentPage > 0;
  const canNext = currentPage < ALL_PAGES.length - 1;

  const { pageW, pageH, isMobile, usePortrait } = dims;
  const bookWidth = isMobile ? pageW : pageW * 2;
  const bookHeight = pageH;

  return (
    <div className="relative flex min-h-dvh min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0d0d0d] pb-[72px]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,169,110,0.04),transparent_70%)]"
      />

      {showTutorial && (
        <TutorialOverlay
          onDismiss={() => setShowTutorial(false)}
          isMobile={isMobile}
        />
      )}

      <div
        className="relative flex-shrink-0"
        style={{
          width: bookWidth,
          height: bookHeight,
          filter:
            "drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 6px 14px rgba(0,0,0,0.75))",
        }}
      >
        {!isMobile && (
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 z-30"
            style={{ left: pageW - 1, width: 2 }}
          >
            <div className="via-gold/10 h-full w-full bg-gradient-to-r from-black/80 to-black/80" />
          </div>
        )}

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
          disableFlipByClick={true}
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

      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-[72px] items-center justify-center gap-4 bg-gradient-to-t from-[#0d0d0d]/90 to-transparent backdrop-blur-[2px] sm:gap-5">
        <div className={isMobile ? "invisible" : "visible"}>
          <NavArrow dir="prev" onClick={flipPrev} disabled={!canPrev} />
        </div>

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

        <div className={isMobile ? "invisible" : "visible"}>
          <NavArrow dir="next" onClick={flipNext} disabled={!canNext} />
        </div>
      </div>
    </div>
  );
}
