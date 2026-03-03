// components/ui/flickering-footer.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Color from "color-bits";
import {
  ChevronRight,
  ShieldCheck,
  Activity,
  Lock,
  Triangle,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to convert any CSS color to rgba
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(180, 180, 180, 1)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;
  try {
    if (typeof cssColor === "string" && cssColor.startsWith("var")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      const parsed = Color.parse(computedColor);
      return parsed ? Color.formatRGBA(parsed) : fallback;
    }
    const parsed = Color.parse(cssColor as string);
    return parsed ? Color.formatRGBA(parsed) : fallback;
  } catch (e) {
    console.error("Color parsing failed", e);
    return fallback;
  }
};

// Helper to add opacity to an RGB color string
export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgba")) return color;
  const parsed = Color.parse(color);
  return parsed
    ? Color.formatRGBA(Object.assign({}, parsed, { alpha: opacity }))
    : color;
};

// --- Flickering Grid Component ---
interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => getRGBA(color), [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, w, h);

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = w;
      maskCanvas.height = h;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = "white";
        maskCtx.font = `${fontWeight} ${fontSize}px sans-serif`;
        maskCtx.textAlign = "center";
        maskCtx.textBaseline = "middle";
        maskCtx.fillText(text, w / 2 / dpr, h / 2 / dpr);
        maskCtx.restore();
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const sqW = squareSize * dpr;
          const sqH = squareSize * dpr;

          let hasText = false;
          if (text) {
            const maskData = maskCtx.getImageData(x, y, sqW, sqH).data;
            hasText = maskData.some(
              (value, index) => index % 4 === 0 && value > 0,
            );
          }

          const opacity = squares[i * rows + j];
          const finalOpacity = hasText
            ? Math.min(1, opacity * 3 + 0.4)
            : opacity;

          ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
          ctx.fillRect(x, y, sqW, sqH);
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      if (gridParams) {
        updateSquares(gridParams.squares, deltaTime);
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr,
        );
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  );
};

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const checkQuery = () => setValue(window.matchMedia(query).matches);
    checkQuery();
    window.addEventListener("resize", checkQuery);
    return () => window.removeEventListener("resize", checkQuery);
  }, [query]);
  return value;
}

// --- Footer Data Configuration ---
export const siteConfig = {
  hero: {
    description:
      "Streamline your digital workflows and handle mundane tasks, so you can focus on what truly matters.",
  },
  footerLinks: [
    {
      title: "Company",
      links: [
        { id: 1, title: "About", url: "#" },
        { id: 2, title: "Contact", url: "#" },
        { id: 3, title: "Blog", url: "#" },
      ],
    },
    {
      title: "Products",
      links: [
        { id: 5, title: "Fintide Pro", url: "#" },
        { id: 6, title: "API Access", url: "#" },
        { id: 7, title: "Enterprise", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { id: 9, title: "Documentation", url: "#" },
        { id: 10, title: "Help Center", url: "#" },
        { id: 11, title: "Community", url: "#" },
      ],
    },
  ],
};

// --- Footer Component ---
export function Footer() {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer
      id="footer"
      className="w-full pb-0 bg-background relative border-t border-gray-900 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between p-10 max-w-7xl mx-auto gap-10">
        {/* Left Branding Column */}
        <div className="flex flex-col items-start justify-start gap-y-5 max-w-xs">
          <Link href="/" className="flex items-center gap-2">
            <Triangle className="size-8 text-emerald-500 fill-emerald-500" />
            <p className="text-xl font-semibold text-white">Fintide</p>
          </Link>
          <p className="tracking-tight text-gray-400 font-medium leading-relaxed">
            {siteConfig.hero.description}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <ShieldCheck className="size-8 text-gray-500 hover:text-emerald-500 transition-colors" />
            <Activity className="size-8 text-gray-500 hover:text-emerald-500 transition-colors" />
            <Lock className="size-8 text-gray-500 hover:text-emerald-500 transition-colors" />
          </div>
        </div>

        {/* Right Navigation Links */}
        <div className="flex flex-col sm:flex-row items-start justify-start gap-12 lg:pl-10">
          {siteConfig.footerLinks.map((column, columnIndex) => (
            <ul key={columnIndex} className="flex flex-col gap-y-3">
              <li className="mb-2 text-sm font-semibold text-gray-100">
                {column.title}
              </li>
              {column.links.map((link) => (
                <li
                  key={link.id}
                  className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px] text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Link href={link.url}>{link.title}</Link>
                  <div className="flex size-4 items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Background Flickering Grid Typography */}
      <div className="w-full h-48 md:h-64 relative z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-background/40 to-background z-10" />
        <div className="absolute inset-0 mx-6">
          <FlickeringGrid
            text={tablet ? "Fintide" : "Streamline your workflow"}
            fontSize={tablet ? 70 : 100}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#10b981"
            maxOpacity={0.3}
            flickerChance={0.15}
          />
        </div>
      </div>
    </footer>
  );
}
