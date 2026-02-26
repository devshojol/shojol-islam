"use client";

// Shared small utilities used across components
export const stopFlip = (e) => e.stopPropagation();

export const BP = {
  mobile: 640,
  tablet: 1024,
  laptop: 1440,
};

export function calcPageSize() {
  const vw = window.innerWidth;
  const vh = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  const NAV_BAR = 72;

  if (vw < BP.mobile) {
    return {
      pageW: vw,
      pageH: vh - NAV_BAR,
      isMobile: true,
      usePortrait: true,
    };
  }

  if (vw < BP.tablet) {
    const pageW = Math.floor(vw * 0.46);
    const maxH = vh - NAV_BAR - 48;
    const pageH = Math.min(Math.floor(pageW * (4 / 3)), maxH);
    return { pageW, pageH, isMobile: false, usePortrait: false };
  }

  if (vw < BP.laptop) {
    const pageW = Math.floor(Math.min(vw * 0.42, 480));
    const maxH = vh - NAV_BAR - 64;
    const pageH = Math.min(Math.floor(pageW * (4 / 3)), maxH);
    return { pageW, pageH, isMobile: false, usePortrait: false };
  }

  const pageW = Math.floor(Math.min(vw * 0.38, 560));
  const maxH = vh - NAV_BAR - 80;
  const pageH = Math.min(Math.floor(pageW * (4 / 3)), maxH);
  return { pageW, pageH, isMobile: false, usePortrait: false };
}
