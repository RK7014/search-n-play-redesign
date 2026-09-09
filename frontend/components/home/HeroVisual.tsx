"use client";

import type { MouseEvent } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Transition,
} from "framer-motion";
import { ShieldCheck, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import clsx from "clsx";

// Trends up overall (with small day-to-day noise so it doesn't look
// artificial) so the shape alone reads as "growing" at a glance, without
// requiring anyone to study individual bar heights.
const BAR_HEIGHTS = [78, 74, 82, 80, 86, 88, 92];
const TREND_PERCENT = Math.round(
  ((BAR_HEIGHTS[BAR_HEIGHTS.length - 1] - BAR_HEIGHTS[0]) / BAR_HEIGHTS[0]) * 100
);

// Illustrative placeholder values for the hero's mockup dashboard — this
// represents "a product we could build," not a real company's real metrics.
const DASHBOARD_STATS = [
  { label: "Active users", value: "2,481" },
  { label: "Deploys / mo", value: "128" },
  { label: "Uptime", value: "99.98%" },
];

const SPRING: Transition = { stiffness: 200, damping: 20, mass: 0.5 };

function FloatingBadge({
  icon: Icon,
  label,
  className,
  delay,
  parallaxX,
  parallaxY,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
  delay: number;
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: reduceMotion ? 0 : [0, -8, 0] }}
      transition={
        reduceMotion
          ? { duration: 0.4, delay }
          : {
              opacity: { duration: 0.5, delay },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
      style={reduceMotion ? undefined : { x: parallaxX, y: parallaxY }}
      className={clsx(
        "absolute z-10 items-center gap-2 rounded-full border border-white/10 bg-[#0a0c10]/90 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-black/30 backdrop-blur",
        className
      )}
    >
      <Icon className="size-3.5 text-accent-400" aria-hidden="true" />
      {label}
    </motion.div>
  );
}

// This mockup represents a screenshot of "a product we could build" — like a
// real product screenshot, it stays styled as a dark UI regardless of the
// site's own light/dark theme preference, so every color here is a fixed
// literal rather than a theme-aware token.
export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);

  // Normalized -0.5..0.5 pointer position within the group, driving both the
  // card's 3D tilt and a smaller counter-parallax on the floating badges so
  // they read as sitting at a different depth than the card, not just glued
  // to its surface.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), SPRING);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), SPRING);
  const badgeX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), SPRING);
  const badgeY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), SPRING);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = groupRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={groupRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-md [perspective:1200px] lg:max-w-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-white/10 bg-[#14161d]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur"
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-3 font-mono text-xs text-white/50">product-dashboard</span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {DASHBOARD_STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] text-white/50">{stat.label}</p>
              <p className="mt-1 font-display text-sm font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[11px] text-white/50">Active users, last 7 days</p>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success-500">
            <TrendingUp className="size-3" aria-hidden="true" />
            {`+${TREND_PERCENT}%`}
          </span>
        </div>
        <div className="mt-2 flex h-28 items-end gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
          {BAR_HEIGHTS.map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-500/70 to-accent-400"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </motion.div>

      <FloatingBadge
        className="-left-6 top-10 hidden sm:flex"
        icon={ShieldCheck}
        label="Security checks passed"
        delay={0.5}
        parallaxX={badgeX}
        parallaxY={badgeY}
      />
      <FloatingBadge
        className="-right-4 bottom-8 hidden sm:flex"
        icon={TrendingUp}
        label="Conversion up this sprint"
        delay={0.7}
        parallaxX={badgeX}
        parallaxY={badgeY}
      />
      <FloatingBadge
        className="right-10 -top-6 hidden lg:flex"
        icon={Sparkles}
        label="AI workflow automated"
        delay={0.9}
        parallaxX={badgeX}
        parallaxY={badgeY}
      />
    </div>
  );
}
