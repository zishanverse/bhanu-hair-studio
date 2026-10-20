"use client";

import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VIEW_W = 1048;
const VIEW_H = 594;

type Point = { x: number; y: number };
type Cubic = { p0: Point; p1: Point; p2: Point; p3: Point };
type Segment = { c1: Point; c2: Point; end: Point };
type PathState = { start: Point; segments: Segment[] };

const round = (n: number) => Math.round(n * 1000) / 1000;
const rp = (p: Point): Point => ({ x: round(p.x), y: round(p.y) });
const lerp = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

const ORIGINAL_SEGMENTS: Cubic[] = [
  {
    p0: { x: 0.597656, y: 50.924805 },
    p1: { x: 17.4612, y: 143.2965 },
    p2: { x: 97.8522, y: 293.141 },
    p3: { x: 284.508, y: 353.548 },
  },
  {
    p0: { x: 284.508, y: 353.548 },
    p1: { x: 440.828, y: 399.056 },
    p2: { x: 583.839, y: 294.067 },
    p3: { x: 500.618, y: 184.7492 },
  },
  {
    p0: { x: 500.618, y: 184.7492 },
    p1: { x: 417.397, y: 75.4309 },
    p2: { x: 238.217, y: 282.098 },
    p3: { x: 499.258, y: 441.668 },
  },
  {
    p0: { x: 499.258, y: 441.668 },
    p1: { x: 551.913, y: 477.802 },
    p2: { x: 817.468, y: 561.26 },
    p3: { x: 1046.43, y: 565.235 },
  },
];

const SPLITS_PER_SEGMENT = 2;

function splitCubic(b: Cubic, t: number): { left: Cubic; right: Cubic } {
  const a1 = lerp(b.p0, b.p1, t);
  const a2 = lerp(b.p1, b.p2, t);
  const a3 = lerp(b.p2, b.p3, t);
  const b1 = lerp(a1, a2, t);
  const b2 = lerp(a2, a3, t);
  const mid = lerp(b1, b2, t);
  return {
    left: { p0: b.p0, p1: a1, p2: b1, p3: mid },
    right: { p0: mid, p1: b2, p2: a3, p3: b.p3 },
  };
}

function subCubic(b: Cubic, t0: number, t1: number): Cubic {
  const right = splitCubic(b, t0).right;
  const t = (t1 - t0) / (1 - t0);
  return splitCubic(right, t).left;
}

const DEFAULT_PATH: PathState = {
  start: rp(ORIGINAL_SEGMENTS[0].p0),
  segments: ORIGINAL_SEGMENTS.flatMap((cubic) => {
    const segs: Segment[] = [];
    for (let i = 0; i < SPLITS_PER_SEGMENT; i++) {
      const sub = subCubic(
        cubic,
        i / SPLITS_PER_SEGMENT,
        (i + 1) / SPLITS_PER_SEGMENT,
      );
      segs.push({ c1: rp(sub.p1), c2: rp(sub.p2), end: rp(sub.p3) });
    }
    return segs;
  }),
};

type HandleId =
  | { type: "start" }
  | { type: "c1"; seg: number }
  | { type: "c2"; seg: number }
  | { type: "end"; seg: number };

const handleKey = (id: HandleId) =>
  id.type === "start" ? "start" : `${id.type}-${id.seg}`;

function getPoint(state: PathState, id: HandleId): Point {
  if (id.type === "start") return state.start;
  return state.segments[id.seg][id.type];
}

function setPoint(state: PathState, id: HandleId, p: Point): PathState {
  if (id.type === "start") return { ...state, start: p };
  return {
    ...state,
    segments: state.segments.map((seg, i) =>
      i === id.seg ? { ...seg, [id.type]: p } : seg,
    ),
  };
}

const shift = (p: Point, dx: number, dy: number): Point => ({
  x: p.x + dx,
  y: p.y + dy,
});

function moveAnchor(state: PathState, id: HandleId, p: Point): PathState {
  const old = getPoint(state, id);
  const dx = p.x - old.x;
  const dy = p.y - old.y;
  let next = setPoint(state, id, p);
  if (id.type === "start") {
    next = setPoint(
      next,
      { type: "c1", seg: 0 },
      shift(state.segments[0].c1, dx, dy),
    );
  } else if (id.type === "end") {
    const i = id.seg;
    next = setPoint(
      next,
      { type: "c2", seg: i },
      shift(state.segments[i].c2, dx, dy),
    );
    if (i < state.segments.length - 1) {
      next = setPoint(
        next,
        { type: "c1", seg: i + 1 },
        shift(state.segments[i + 1].c1, dx, dy),
      );
    }
  }
  return next;
}

function toPathD({ start, segments }: PathState): string {
  let d = `M${round(start.x)} ${round(start.y)}`;
  for (const s of segments) {
    d += `C${round(s.c1.x)} ${round(s.c1.y)} ${round(s.c2.x)} ${round(s.c2.y)} ${round(s.end.x)} ${round(s.end.y)}`;
  }
  return d;
}

function clientToSvg(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): Point {
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const local = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  }
  const r = svg.getBoundingClientRect();
  return {
    x: ((clientX - r.left) / r.width) * VIEW_W,
    y: ((clientY - r.top) / r.height) * VIEW_H,
  };
}

export interface CurvedTextRibbonProps {
  className?: string;
  speed?: number;
  fontSize?: number;
  textOpacity?: number;
  textColor?: string;
  strokeColor?: string;
  allowEditing?: boolean;
}

export function CurvedTextRibbon({
  className = "",
  speed = 42,
  fontSize = 14,
  textOpacity = 0.9,
  textColor = "#E6CA85", // Champagne gold
  strokeColor = "rgba(200, 162, 82, 0.16)",
  allowEditing = false,
}: CurvedTextRibbonProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const textGlowPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const draggingRef = useRef<HandleId | null>(null);

  const [editing, setEditing] = useState(false);
  const [path, setPath] = useState<PathState>(DEFAULT_PATH);
  const [isHovered, setIsHovered] = useState(false);

  const d = useMemo(() => toPathD(path), [path]);

  // Haute Coiffure brand narrative stream
  const marqueeText = useMemo(() => {
    const segment =
      "✦ BHANU'S THE HAIR STUDIO ✦ HAUTE COIFFURE & UNISEX ATELIER ✦ WHERE PRECISION MEETS TIMELESS ART ✦ JAPANESE STEEL SHEARS ✦ FRENCH BALAYAGE & KERATIN SMOOTHING ✦ PALSIKAR COLONY INDORE ✦ BESPOKE ANATOMICAL SCULPTING ✦ OPEN DAILY 10:00 AM – 10:00 PM ✦ ";
    return `${segment}${segment}${segment}${segment}`;
  }, []);

  // Smooth continuous requestAnimationFrame animation for silky 60/120fps motion
  useEffect(() => {
    let animId: number;
    let offset = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Rate of movement in pixels per second; slow down smoothly when hovered
      const currentSpeed = isHovered ? speed * 0.45 : speed;
      offset -= currentSpeed * delta;

      // Wrap around seamlessly after moving by ~2000px
      if (offset <= -2800) {
        offset += 2800;
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offset}px`);
      }
      if (textGlowPathRef.current) {
        textGlowPathRef.current.setAttribute("startOffset", `${offset}px`);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [speed, isHovered]);

  const anchors = useMemo<HandleId[]>(
    () => [
      { type: "start" },
      ...path.segments.map((_, i) => ({ type: "end", seg: i }) as HandleId),
    ],
    [path.segments],
  );

  const controlPoints = useMemo<HandleId[]>(
    () =>
      path.segments.flatMap(
        (_, i) =>
          [
            { type: "c1", seg: i },
            { type: "c2", seg: i },
          ] as HandleId[],
      ),
    [path.segments],
  );

  const guides = useMemo(
    () =>
      path.segments.flatMap((s, i) => {
        const prevAnchor = i === 0 ? path.start : path.segments[i - 1].end;
        return [
          { a: prevAnchor, b: s.c1 },
          { a: s.end, b: s.c2 },
        ];
      }),
    [path],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGCircleElement>, id: HandleId) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = id;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      const id = draggingRef.current;
      if (!id || !svgRef.current) return;
      const p = clientToSvg(svgRef.current, e.clientX, e.clientY);
      setPath((prev) =>
        id.type === "c1" || id.type === "c2"
          ? setPoint(prev, id, p)
          : moveAnchor(prev, id, p),
      );
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      draggingRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    },
    [],
  );

  return (
    <section
      aria-label="Kinetic Typography Studio Ribbon"
      className={`relative z-20 w-full overflow-hidden bg-transparent select-none py-6 sm:py-12 md:py-16 transition-opacity ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient ethereal champagne glow behind the central loop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[300px] rounded-full bg-champagne-500/8 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative flex items-center justify-center">
        <svg
          ref={svgRef}
          id="hero-curved-svg"
          className="w-full h-auto max-h-[300px] sm:max-h-[420px] md:max-h-[520px] transition-transform duration-700 filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block", touchAction: editing ? "none" : "auto" }}
        >
          <defs>
            <linearGradient id="ribbon-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8A252" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#E4C784" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C8A252" stopOpacity="0.1" />
            </linearGradient>
            <filter id="soft-gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Guide Hairline Path with subtle dashed gold styling */}
          <path
            ref={pathRef}
            id="first-curve"
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeDasharray="4 6"
            d={d}
          />

          {/* Soft ambient blurred glow layer behind text */}
          <text
            x="0"
            style={{ fontSize: `${fontSize}px` }}
            className="font-serif tracking-[0.24em] uppercase font-light pointer-events-none"
            aria-hidden="true"
          >
            <textPath
              ref={textGlowPathRef}
              id="marquee-text-glow"
              href="#first-curve"
              className="[baseline-shift:-18%]"
              style={{
                fill: "#C8A252",
                opacity: 0.35,
                filter: "blur(4px)",
              }}
            >
              {marqueeText}
            </textPath>
          </text>

          {/* Primary crisp champagne typography stream */}
          <text
            x="0"
            style={{
              fontSize: `${fontSize}px`,
              filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.95))",
            }}
            className="font-serif tracking-[0.22em] uppercase font-medium"
          >
            <textPath
              ref={textPathRef}
              id="marquee-text-first"
              href="#first-curve"
              className="[baseline-shift:-18%]"
              style={{
                fill: textColor,
                opacity: textOpacity,
                letterSpacing: "0.22em",
              }}
            >
              {marqueeText}
            </textPath>
          </text>

          {/* Interactive Spline Handles for visual editing (when enabled) */}
          {editing && (
            <g className="transition-opacity duration-300">
              <path
                d={d}
                fill="none"
                stroke="#E4C784"
                strokeWidth={1.5}
                strokeDasharray="3 5"
                strokeOpacity={0.8}
                style={{ pointerEvents: "none" }}
              />

              {guides.map((g, i) => (
                <line
                  key={`guide-${i}`}
                  x1={g.a.x}
                  y1={g.a.y}
                  x2={g.b.x}
                  y2={g.b.y}
                  stroke="#E4C784"
                  strokeWidth={1}
                  strokeDasharray="3 4"
                  strokeOpacity={0.6}
                  style={{ pointerEvents: "none" }}
                />
              ))}

              {/* Off-line control points */}
              {controlPoints.map((id) => {
                const p = getPoint(path, id);
                return (
                  <circle
                    key={handleKey(id)}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill="#1A1815"
                    stroke="#E4C784"
                    strokeWidth={1.8}
                    style={{ cursor: "grab", touchAction: "none" }}
                    onPointerDown={(e) => handlePointerDown(e, id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  />
                );
              })}

              {/* On-line anchors */}
              {anchors.map((id) => {
                const p = getPoint(path, id);
                return (
                  <circle
                    key={handleKey(id)}
                    cx={p.x}
                    cy={p.y}
                    r={5}
                    fill="#E4C784"
                    stroke="#0A0A0A"
                    strokeWidth={1.5}
                    style={{ cursor: "grab", touchAction: "none" }}
                    onPointerDown={(e) => handlePointerDown(e, id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* Central Luxury Crest Badge Floating inside the loop */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center text-center select-none"
          aria-hidden="true"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-champagne-500/30 bg-obsidian-900/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_35px_rgba(200,162,82,0.25)] transition-transform duration-500 group-hover:scale-105">
            <span className="font-serif italic text-champagne-200 text-xl sm:text-2xl font-light">
              B
            </span>
          </div>
          <span className="mt-2 text-[9px] sm:text-[10px] font-mono tracking-[0.35em] uppercase text-champagne-400/90 drop-shadow-md">
            Atelier · Indore
          </span>
        </div>
      </div>

      {/* Optional Editor Trigger Pill (only shown when allowEditing is true or in dev) */}
      {allowEditing && (
        <div className="absolute right-6 bottom-3 z-30">
          <AnimatePresence mode="popLayout" initial={false}>
            {editing ? (
              <motion.button
                key="done"
                layoutId="edit-toggle"
                type="button"
                onClick={() => setEditing(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full bg-champagne-500 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-obsidian-950 shadow-lg hover:bg-champagne-400 transition-colors"
              >
                Done Editing
              </motion.button>
            ) : (
              <motion.button
                key="edit"
                layoutId="edit-toggle"
                type="button"
                onClick={() => setEditing(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full bg-obsidian-900/80 border border-champagne-500/30 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-champagne-300 backdrop-blur-md hover:border-champagne-400 transition-colors"
              >
                Tweak Ribbon Path
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

export default CurvedTextRibbon;
