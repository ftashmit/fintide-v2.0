"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ArrowRight,
  Star,
  Quote,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layout,
} from "lucide-react";

// --- Navigation Items ---
const navItems = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact us", href: "#footer" },
];

// --- Feature Data ---
const features = [
  {
    title: "Real-time market pulse",
    description:
      "Track stocks and crypto with low-latency widgets, curated heatmaps, and market overviews in one unified dashboard.",
    tag: "Live data",
    icon: TrendingUp,
  },
  {
    title: "Smart watchlists",
    description:
      "Create focused watchlists, pin your conviction plays, and sync them across devices without losing state.",
    tag: "Personalized",
    icon: Star,
  },
  {
    title: "Precision alerts",
    description:
      "Define price levels, percentage moves, and volume spikes and let Fintide notify you when it really matters.",
    tag: "Alert engine",
    icon: Zap,
  },
  {
    title: "Clean decision UI",
    description:
      "Use opinionated layouts, subtle color cues, and dense-yet-readable cards designed for daily active traders.",
    tag: "UX-first",
    icon: Layout,
  },
];

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Swing trader",
    quote:
      "Fintide cleaned up my screen. I get my levels, heatmap, and news in one place without the usual dashboard noise.",
  },
  {
    name: "Sara Kapoor",
    role: "Long-term investor",
    quote:
      "The watchlists and alerts feel deliberate, not gimmicky. I finally track my core picks without 10 different tabs.",
  },
  {
    name: "Rohan Gupta",
    role: "Crypto & equities",
    quote:
      "The dark UI, glass cards, and TradingView widgets are exactly how I want my daily market cockpit to look.",
  },
];

// --- FAQ Data ---
const faqs = [
  {
    question: "What is Fintide?",
    answer:
      "Fintide is a modern market cockpit that brings real-time stocks, crypto, watchlists, and alerts into a single focused dashboard.",
  },
  {
    question: "Who is Fintide built for?",
    answer:
      "Fintide is tuned for active market participants—swing traders, intraday traders, and long-term investors who want signal over noise.",
  },
  {
    question: "Do I need to connect a broker?",
    answer:
      "No. Fintide focuses on tracking and decision support. Broker integrations may come later, but are not required to start.",
  },
  {
    question: "Is Fintide mobile-friendly?",
    answer:
      "Yes. The layout, cards, and interactions are designed to work beautifully on phones, tablets, and desktops.",
  },
];

export default function MarketingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].question);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans selection:bg-green-500/30">
      {/* --- Ambient Background Glows --- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-green-600/10 blur-[120px] opacity-50" />
        <div className="absolute top-[40%] -right-[10%] h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[120px] opacity-40 animate-pulse delay-1000" />
        <div className="absolute bottom-[-10%] left-[20%] h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[100px] opacity-30" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* --- Navbar --- */}
      <header className="sticky top-0 z-50 border-b border-gray-800/60 bg-gray-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex cursor-pointer items-center gap-2 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 transition-transform group-hover:scale-105">
              <span className="text-sm font-bold text-gray-950">FT</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Fintide
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.href)}
                className="text-sm font-medium text-gray-400 hover:text-green-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link href="/sign-up">
              <button className="custom-btn !w-auto !h-10 !px-5 !py-2 text-sm shadow-lg shadow-green-900/20">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-900 px-4 py-4 shadow-2xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScroll(item.href)}
                  className="text-left text-base font-medium text-gray-300 hover:text-green-400"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-gray-800">
                <Link
                  href="/sign-in"
                  className="w-full text-center py-2 text-gray-300 hover:text-white"
                >
                  Sign In
                </Link>
                <Link href="/sign-up" className="w-full">
                  <button className="custom-btn w-full justify-center">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
            {/* Version Pill */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1 text-xs font-medium text-green-400 backdrop-blur-md animate-in fade-in zoom-in duration-500">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Fintide 2.0 Now Available
            </div>

            {/* Headline */}
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl mb-6">
              A minimal cockpit for <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                real-time markets
              </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl text-lg text-gray-400 md:text-xl mb-10 leading-relaxed">
              Fintide brings stocks, crypto, watchlists, and alerts into one
              focused interface. See only what moves your decisions, not your
              attention.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
              <Link href="/sign-up">
                <button className="custom-btn group">
                  <span>Start Tracking</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button
                onClick={() => handleScroll("#features")}
                className="px-6 py-3 rounded-full text-gray-300 font-medium hover:text-white hover:bg-gray-800 transition-all border border-transparent hover:border-gray-700"
              >
                Learn More
              </button>
            </div>

            {/* Dashboard Preview (Glassmorphism) */}
            <div className="relative w-full max-w-6xl mx-auto group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-xl border border-gray-800 bg-gray-900/60 backdrop-blur-xl p-2 md:p-4 shadow-2xl">
                {/* Mock Header */}
                <div className="flex items-center gap-4 mb-4 px-2">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="h-6 w-64 rounded bg-gray-800/50 animate-pulse" />
                </div>
                {/* Mock Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[500px] overflow-hidden">
                  <div className="md:col-span-2 h-full rounded-lg bg-gray-800/30 border border-gray-700/30 relative overflow-hidden group/card">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10" />
                    {/* Abstract Chart Line */}
                    <svg
                      className="absolute bottom-0 left-0 right-0 h-2/3 w-full text-green-500/20"
                      viewBox="0 0 100 40"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 30 Q 20 10 40 25 T 80 15 T 100 20 V 40 H 0 Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0 30 Q 20 10 40 25 T 80 15 T 100 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>
                  <div className="hidden md:flex flex-col gap-4 h-full">
                    <div className="flex-1 rounded-lg bg-gray-800/30 border border-gray-700/30 p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-4 w-20 bg-gray-700/50 rounded" />
                        <div className="h-4 w-8 bg-green-500/20 rounded" />
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <div className="h-3 w-12 bg-gray-700/30 rounded" />
                            <div className="h-3 w-16 bg-gray-700/30 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 rounded-lg bg-gray-800/30 border border-gray-700/30 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-1">
                          2.4s
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">
                          Latency
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-24 bg-gray-900 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Built for{" "}
                  <span className="text-green-400">focused decisions</span>,
                  <br />
                  not dashboard noise.
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  Fintide curates the essential panels—heatmaps, overview
                  widgets, watchlists, and alerts—into a single dark,
                  glass-morphed interface.
                </p>
                <ul className="space-y-4">
                  {[
                    "Unified view for Crypto & Equities",
                    "No distracting animations or ads",
                    "Performance-first architecture",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/20 to-teal-500/20 rounded-2xl blur-xl" />
                <div className="relative rounded-2xl border border-gray-800 bg-gray-900/80 p-8 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                        <Zap className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Instant Alerts
                        </h4>
                        <p className="text-sm text-gray-400">
                          Notifications that actually arrive on time.
                        </p>
                      </div>
                    </div>
                    <div className="h-px w-full bg-gray-800" />
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                        <Layout className="h-5 w-5 text-teal-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Modular Grid
                        </h4>
                        <p className="text-sm text-gray-400">
                          Resize and rearrange widgets to fit your flow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="text-green-500 font-semibold tracking-wider text-sm uppercase">
                Features
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-6">
                Everything you need.
                <br />
                Nothing you don't.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl border border-gray-800 bg-gray-800/20 hover:bg-gray-800/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <feature.icon className="h-10 w-10 text-green-500 mb-6 relative z-10" />
                  <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                    {feature.description}
                  </p>
                  <div className="mt-4 inline-block px-2 py-1 rounded bg-gray-800 border border-gray-700 text-xs text-gray-300 relative z-10">
                    {feature.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section
          id="reviews"
          className="py-24 bg-gray-900 border-t border-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Traders trust Fintide
                </h2>
                <p className="text-gray-400">
                  See what the community is saying.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="p-3 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) => (prev + 1) % testimonials.length
                    )
                  }
                  className="p-3 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 md:p-12 border border-gray-800">
              <Quote className="h-12 w-12 text-green-500/20 mb-6" />
              <p className="text-xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center font-bold text-gray-900 text-lg">
                  {testimonials[activeTestimonial].name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-green-400 text-sm">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section id="faqs" className="py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === faq.question ? null : faq.question)
                    }
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/30 transition-colors"
                  >
                    <span className="font-medium text-white text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-gray-400 transition-transform duration-300",
                        openFaq === faq.question && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out px-6",
                      openFaq === faq.question
                        ? "grid-rows-[1fr] pb-6 opacity-100"
                        : "grid-rows-[0fr] pb-0 opacity-0"
                    )}
                  >
                    <div className="overflow-hidden text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-green-900/10" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to upgrade your workflow?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of traders who have switched to Fintide for clarity
              and speed.
            </p>
            <Link href="/sign-up">
              <button className="custom-btn mx-auto scale-110">
                <span>Get Started Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-950 border-t border-gray-900 py-12 text-sm">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-green-600 flex items-center justify-center text-xs font-bold text-white">
              FT
            </div>
            <span className="text-gray-400">
              © 2025 Fintide. All rights reserved.
            </span>
          </div>
          <div className="flex gap-8 text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
