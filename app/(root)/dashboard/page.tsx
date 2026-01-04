import EconomicMapWidget from "@/components/tradingview/EconomicMapWidget";
import TradingViewCryptoMarket from "@/components/tradingview/TradingViewCryptoMarket";
import TradingViewWidget from "@/components/TradingViewWidget";
import { Button } from "@/components/ui/button";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";
import React from "react";

const Home = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Stock Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Crypto Heatmap"
            scriptUrl={`${scriptUrl}crypto-coins-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        {/* <div className="md:col-span-1 xl:col-span-2">
          <div className="custom-chart">
            <h2 className="mb-3 text-lg font-semibold text-gray-200">
              Global Economic Map
            </h2>
            <EconomicMapWidget height={600} />
          </div>
        </div> */}
        <div className="md:col-span-1 xl:col-span-2">
          <div className="text-2xl mb-5 font-semibold text-gray-100">
            Cryptocurrency Market Overview
          </div>
          <TradingViewCryptoMarket height={600} />
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 h-full xl:col-span-1">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 h-full xl:col-span-2">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
