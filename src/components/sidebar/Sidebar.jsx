"use client";
import React, { useState } from "react";

const Sidebar = () => {
  const [width, setWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const startResize = (e) => {
    e.preventDefault(); // stop text selection
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent) => {
      setWidth(startWidth + (moveEvent.clientX - startX));
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    // Disable text selection globally
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="relative bg-[#252526] p-4" style={{ width }}>
      Resizable Content
      <div
        onMouseDown={startResize}
        className="absolute top-0 right-0 h-full w-2 cursor-col-resize"
      />
    </div>
  );
};

export default Sidebar;
