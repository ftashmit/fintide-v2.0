"use client";

import React, { useEffect, useRef, memo } from "react";

const TradingViewCryptoMarket = ({ height = 550 }: { height?: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent duplicate script injection
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "dark",
      isTransparent: true,
      locale: "en",
      width: "100%",
      height,
    });

    containerRef.current.appendChild(script);
  }, [height]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-black/40 backdrop-blur-md">
      <div ref={containerRef} />
    </div>
  );
};

export default memo(TradingViewCryptoMarket);
