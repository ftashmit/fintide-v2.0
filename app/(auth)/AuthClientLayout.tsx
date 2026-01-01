"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AuthClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="auth-layout min-h-screen text-gray-400">
      {/* LEFT SECTION */}
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/assets/icons/logo.png"
            alt="Fintide Logo"
            width={200}
            height={50}
            className="h-10 w-auto"
          />
        </Link>

        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      {/* RIGHT SECTION */}
      <section className="auth-right-section relative overflow-hidden">
        {/* GREEN GLOW (static, safe) */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 bg-green-500/30 blur-[140px]" />

        {/* TESTIMONIAL */}
        <div
          className={`z-10 relative lg:mt-4 lg:mb-12
            transition-all duration-700 ease-out
            ${mounted ? "animate-auth-fade-in-top" : ""}
          `}
        >
          <blockquote className="auth-blockquote backdrop-blur-md bg-white/4 rounded-xl p-4">
            Fintide turned my watchlist into a goldmine. The real-time alerts
            helped me seize opportunities I would have otherwise missed. I feel
            more confident in my trading decisions now.
          </blockquote>

          <div className="flex items-center justify-between mr-2 ml-2">
            <div>
              <cite className="auth-testimonial-author">- Vineeth M.</cite>
              <p className="max-md:text-s text-gray-500">Retail Investor</p>
            </div>

            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src="/assets/icons/star.svg"
                  alt="star"
                  height={14}
                  width={14}
                  className="h-5 w-5"
                />
              ))}
            </div>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div
          className={`flex-1 relative transition-all duration-700 ease-out delay-150
            ${mounted ? "animate-auth-fade-in-bottom" : ""}
          `}
        >
          <Image
            src="/assets/images/dashboard.png"
            alt="Dashboard"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top-0"
          />
        </div>
      </section>
    </main>
  );
};

export default AuthClientLayout;
