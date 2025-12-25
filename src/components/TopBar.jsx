import Image from "next/image";
import React from "react";

const TopBar = () => {
  return (
    <section className="relative min-h-6.5 w-full bg-[#3C3C3C] px-2 text-[13px] text-[#cccccc]">
      <Image src={"/logo.png"} width={40} height={20} alt="logo" />

      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        App.jsx - SHOJOLPortfolio - Code
      </p>
    </section>
  );
};

export default TopBar;
