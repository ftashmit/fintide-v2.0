"use client";

import React, { memo } from "react";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}: TradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);


     return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">
          {title}
        </h3>
      )}

      <div
        ref={containerRef}
        className={cn(
          "tradingview-widget-container w-full overflow-hidden",
          className
        )}
        style={{ height }} 
      >
        <div
          className="tradingview-widget-container__widget w-full"
          style={{ height }} 
        />
      </div>
    </div>
  );
};
export default memo(TradingViewWidget);
