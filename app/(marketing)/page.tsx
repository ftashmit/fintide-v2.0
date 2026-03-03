"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Star,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layout,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/* --- Navigation Items --- */
const navItems = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
];

/* --- Feature Data --- */
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

/* --- Testimonials Data --- */
const allTestimonials = [
  {
    text: "Fintide cleaned up my screen. I get my levels, heatmap, and news in one place without the usual dashboard noise.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Aarav Mehta",
    role: "Swing Trader",
  },
  {
    text: "The watchlists and alerts feel deliberate, not gimmicky. I finally track my core picks without 10 different tabs.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Sara Kapoor",
    role: "Long-term Investor",
  },
  {
    text: "The dark UI, glass cards, and TradingView widgets are exactly how I want my daily market cockpit to look.",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Rohan Gupta",
    role: "Crypto Equities",
  },
  {
    text: "This dashboard revolutionized my morning prep. The unified view of my portfolio keeps me productive and focused.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Briana Patton",
    role: "Day Trader",
  },
  {
    text: "Implementing this was smooth and quick. The customizable, user-friendly interface made my trading process effortless.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Bilal Ahmed",
    role: "Retail Investor",
  },
  {
    text: "Its robust features and zero-latency alerts have transformed my workflow, making me significantly more efficient.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Zainab Hussain",
    role: "Prop Trader",
  },
  {
    text: "The modular grid is a game-changer. I can resize my order book and charting exactly how I need them on the fly.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Aliza Khan",
    role: "Options Specialist",
  },
  {
    text: "I've tried a dozen tracking tools, but Fintide's combination of aesthetics and speed is unmatched in the market.",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Farhan Siddiqui",
    role: "Fund Manager",
  },
  {
    text: "Finally, a tool that respects my attention. No ads, no fluff—just raw, real-time data beautifully presented.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Hassan Ali",
    role: "Algorithmic Trader",
  },
];

/* --- FAQ Data --- */
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

/* --- Display Card Components --- */
interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Zap className="size-4 text-emerald-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-emerald-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-gray-700 bg-gray-800/80 backdrop-blur-md px-4 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-gray-900/90 after:to-transparent after:content-[''] hover:border-emerald-500/30 hover:bg-gray-800 flex items-center gap-2 shadow-2xl shadow-black/50 cursor-pointer",
        className,
      )}
    >
      <span className="relative inline-block rounded-full bg-gray-900 p-2 border border-gray-700 shadow-inner">
        {icon}
      </span>
      <p
        className={cn(
          "text-lg font-semibold tracking-wide ml-1",
          titleClassName,
        )}
      >
        {title}
      </p>
      <p className="whitespace-nowrap text-[17px] text-gray-200">
        {description}
      </p>
      <p className="text-gray-500 text-sm font-medium">{date}</p>
    </div>
  );
}

function DisplayCards({ cards }: { cards?: DisplayCardProps[] }) {
  const fintideCards = [
    {
      icon: <Zap className="size-5 text-yellow-400" />,
      title: "Volume Spike",
      description: "TSLA options sweep detected",
      date: "Just now",
      titleClassName: "text-yellow-400",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-gray-700 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-gray-900/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Star className="size-5 text-emerald-400" />,
      title: "Watchlist Alert",
      description: "ETH/USD approaching key support",
      date: "2 mins ago",
      titleClassName: "text-emerald-400",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-gray-700 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-gray-900/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <TrendingUp className="size-5 text-teal-400" />,
      title: "Breakout",
      description: "NVDA crossed 52-week high",
      date: "1 hour ago",
      titleClassName: "text-teal-400",
      className:
        "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || fintideCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 w-full lg:w-auto">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

/* --- Testimonials Column --- */
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof allTestimonials;
  duration?: number;
}) => {
  return (
    <div className={cn("overflow-hidden", props.className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-xl shadow-green-900/5 max-w-sm w-full hover:bg-gray-800/80 transition-colors"
                key={i}
              >
                <div className="text-gray-300 leading-relaxed text-sm md:text-base">
                  "{text}"
                </div>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-800/50">
                  <img
                    width={48}
                    height={48}
                    src={image}
                    alt={name}
                    className="h-12 w-12 rounded-full border border-gray-700 bg-gray-800 object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-white tracking-tight">
                      {name}
                    </div>
                    <div className="text-green-500 text-sm tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

/* --- Main Page Component --- */
export default function MarketingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].question);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const handleExpand = () => setIsExpanded(true);
  const handleClose = () => setIsExpanded(false);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  const firstColumn = allTestimonials.slice(0, 3);
  const secondColumn = allTestimonials.slice(3, 6);
  const thirdColumn = allTestimonials.slice(6, 9);

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans selection:bg-green-500/30">
      {/* --- Ambient Background Glows --- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-10 h-[500px] w-[500px] rounded-full bg-green-600/10 blur-[120px] opacity-50" />
        <div className="absolute top-40 -right-10 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-20 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[100px] opacity-30" />
      </div>

      {/* --- Fixed Navbar --- */}
      <header className="fixed w-full top-0 z-[999] border-b border-gray-800/60 bg-gray-900/20 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex cursor-pointer items-center group"
          >
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="w-35 h-35 object-contain transition-transform group-hover:scale-105"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.href)}
                className="text-sm font-medium text-gray-400 hover:text-green-400 transition-colors relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link href="/sign-up">
              <button className="flex items-center px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-500 shadow-lg shadow-green-900/20 transition-colors">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>

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

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-900 px-4 py-4 shadow-2xl">
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
                  <button className="flex w-full items-center justify-center px-4 py-2 font-medium text-white bg-green-600 rounded hover:bg-green-500 transition-colors">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-20">
        {/* --- Hero Section --- */}
        <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden w-full px-4 sm:px-6 py-12 sm:py-20 z-0">
          {/* Pure CSS Hero Background — no WebGL */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-green-950/40 via-gray-900/60 to-gray-900" />
            <div className="absolute top-[-20%] left-[55%] h-[650px] w-[650px] rounded-full bg-green-500/10 blur-[140px]" />
            <div className="absolute top-[5%] left-[65%] h-[400px] w-[400px] rounded-full bg-emerald-400/8 blur-[100px]" />
            <div className="absolute top-[35%] left-[45%] h-[300px] w-[300px] rounded-full bg-teal-500/8 blur-[120px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center  pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm font-medium text-gray-200 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Fintide 2.0 Now Available
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl"
            >
              A minimal cockpit for <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                real-time markets
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl px-4 leading-relaxed"
            >
              Fintide brings stocks, crypto, watchlists, and alerts into one
              focused interface. See only what moves your decisions, not your
              attention.
            </motion.p>

            <AnimatePresence initial={false}>
              {!isExpanded && (
                <motion.div className="inline-block relative mt-4">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    onClick={handleExpand}
                    className="flex items-center space-x-2 px-8 py-3 text-white bg-black font-semibold shadow-lg shadow-green-900/20"
                  >
                    <span>Start Tracking</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </HoverBorderGradient>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isExpanded && <div className="h-16 md:h-24 lg:h-30 mt-12" />}

          {/* --- CTA Modal --- */}
          {/* --- CTA Modal --- */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              // Added pt-24 to push the modal down below the fixed navbar
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pt-24 sm:p-8 sm:pt-28 bg-black/60 backdrop-blur-sm">
                <motion.div
                  layoutId="cta-card"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  style={{ borderRadius: "24px" }}
                  // Adjusted max height and width to keep it perfectly centered and sized
                  className="relative flex h-[85vh] max-h-[800px] w-full max-w-6xl overflow-hidden bg-gray-950 sm:rounded-[24px] shadow-[0_20px_60px_rgba(16,185,129,0.3)] border border-emerald-500/20"
                >
                  {/* Pure CSS Modal Background — no WebGL */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-green-950/40 to-gray-950" />
                    <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-green-800/20 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-emerald-700/20 blur-[100px]" />
                    <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-teal-800/15 blur-[80px]" />
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    // Adjusted the positioning of the close button to stay inside the bounds
                    className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 border border-white/10 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="relative z-10 flex flex-col lg:flex-row h-full w-full mx-auto overflow-y-auto lg:overflow-hidden"
                  >
                    <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 gap-8 text-white">
                      <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                          Ready to upgrade your workflow?
                        </h2>
                        <p className="text-emerald-100/80 text-lg max-w-md">
                          Join thousands of traders who have switched to Fintide
                          for clarity and speed.
                        </p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-900/50 backdrop-blur-sm flex items-center justify-center border border-emerald-500/20">
                          <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-emerald-50">
                            Real-time Pulse
                          </h3>
                          <p className="text-emerald-200/60 text-sm leading-relaxed mt-1">
                            Low-latency crypto and equity tracking in one
                            unified view.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4 sm:p-12 lg:p-16">
                      <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 mb-6">
                          <img
                            src="/assets/images/logo.png"
                            alt="Logo"
                            className="w-14 h-14 object-contain"
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Create your account
                        </h3>
                        <p className="text-emerald-100/60 text-sm mb-8 leading-relaxed">
                          Stop wrestling with disconnected tools. Build your
                          conviction plays today.
                        </p>
                        <Link href="/sign-up" className="w-full">
                          <button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all shadow-lg shadow-green-900/50 cursor-pointer">
                            Continue to Sign Up
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Dashboard Image (hides when modal is open) --- */}
        {!isExpanded && (
          <section className="relative pb-32 -mt-16 sm:-mt-24 z-10">
            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
              <div className="relative w-full max-w-6xl mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                <div className="relative rounded-xl border border-gray-800 bg-gray-900/80 backdrop-blur-xl shadow-2xl overflow-hidden p-2">
                  <img
                    src="/assets/images/dashboard.png"
                    alt="Dashboard"
                    className="w-full h-auto object-cover rounded-lg border border-gray-800/50"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- About Section --- */}
        <section
          id="about"
          className="py-24 bg-gray-900 relative border-t border-gray-800/50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Built for{" "}
                  <span className="text-green-400">focused decisions</span>,
                  <br /> not dashboard noise.
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
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 xl:gap-20 items-start">
              <div className="flex flex-col h-full pt-4">
                <div className="mb-16">
                  <span className="text-green-500 font-semibold tracking-wider text-sm uppercase">
                    Features
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
                    Everything you need. <br /> Nothing you don't.
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    Stay ahead of the curve with real-time push notifications.
                    We filter the noise so you only see the signals that matter.
                  </p>
                </div>
                <div className="relative mt-auto w-full flex justify-center lg:justify-start lg:pl-10 mb-4">
                  <DisplayCards />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 relative z-10">
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
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section
          id="reviews"
          className="py-24 bg-gray-900 border-t border-gray-800/50 relative"
        >
          <div className="container z-10 mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
            >
              <span className="text-green-500 font-semibold tracking-wider text-sm uppercase">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-4">
                Trusted by traders worldwide
              </h2>
              <p className="text-lg text-gray-400 mt-4 leading-relaxed">
                See what the community has to say about their upgraded trading
                workflow.
              </p>
            </motion.div>
            <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[600px] md:h-[740px] overflow-hidden">
              <TestimonialsColumn testimonials={firstColumn} duration={25} />
              <TestimonialsColumn
                testimonials={secondColumn}
                className="hidden md:block"
                duration={35}
              />
              <TestimonialsColumn
                testimonials={thirdColumn}
                className="hidden lg:block"
                duration={30}
              />
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section
          id="faqs"
          className="py-24 border-t border-gray-800/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
            <div className="text-center mb-16">
              <span className="text-green-500 font-semibold tracking-wider text-sm uppercase mb-2 block">
                Support
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-lg">
                Everything you need to know about getting started.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-800/60 bg-gray-900/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-gray-800/40"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === faq.question ? null : faq.question)
                    }
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-white text-lg pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 shrink-0",
                        openFaq === faq.question
                          ? "border-green-500/50 bg-green-500/10 text-green-400"
                          : "border-gray-700 bg-gray-800 text-gray-400",
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          openFaq === faq.question && "rotate-180",
                        )}
                      />
                    </div>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out px-6",
                      openFaq === faq.question
                        ? "grid-rows-[1fr] pb-6 opacity-100"
                        : "grid-rows-[0fr] pb-0 opacity-0",
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

        {/* --- Pre-Footer CTA --- */}
        <section className="py-24 relative overflow-hidden border-t border-gray-800/50 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to upgrade your workflow?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
              Join thousands of traders who have switched for clarity, speed,
              and precision.
            </p>
            <Link href="/sign-up">
              <button className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-colors shadow-xl">
                Get Started for Free
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer
        id="footer"
        className="bg-black border-t border-gray-800/60 pt-16 pb-8 text-sm"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="w-35 h-35 object-contain"
                />
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                A modern market cockpit that brings real-time stocks, crypto,
                watchlists, and alerts into a single focused dashboard.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-green-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-green-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#reviews"
                    className="hover:text-green-400 transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link
                    href="/sign-up"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about-us"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-gray-500">© 2026. All rights reserved.</span>
            <div className="flex gap-6 text-gray-500">
              <a href="#" className="hover:text-white transition-colors">
                Twitter (X)
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
