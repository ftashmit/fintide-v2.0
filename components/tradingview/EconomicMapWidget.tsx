"use client";

import { useEffect, useRef } from "react";

type EconomicMapWidgetProps = {
  height?: number;
};

export default function EconomicMapWidget({
  height = 600,
}: EconomicMapWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up on re-render / fast refresh
    containerRef.current.innerHTML = "";

    // TradingView module script
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://widgets.tradingview-widget.com/w/en/tv-economic-map.js";

    // Create the web component
    const widget = document.createElement("tv-economic-map");

    // Required attributes
    widget.setAttribute("metric", "iryy");
    widget.setAttribute("metrics", "gdp,ur,gdg,intr,iryy");

    // ✅ Dark theme + transparent background
    widget.setAttribute("theme", "dark");
    widget.setAttribute("transparent", "");

    // Styling
    widget.style.width = "100%";
    widget.style.height = `${height}px`;
    widget.style.display = "block";

    containerRef.current.appendChild(script);
    containerRef.current.appendChild(widget);

    return () => {
      containerRef.current?.replaceChildren();
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className="
        w-full
        rounded-xl
        overflow-hidden
        bg-black/30
        backdrop-blur-md
        border border-white/5
      "
    />
  );
}
