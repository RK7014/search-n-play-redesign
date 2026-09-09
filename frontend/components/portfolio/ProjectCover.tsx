"use client";

import type { MouseEvent } from "react";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import clsx from "clsx";

/**
 * Real cover photo for a portfolio entry (see public/images/work — one per
 * demo case study, credited in docs/PROJECT_OVERVIEW.md). `slug` maps
 * directly to the file at public/images/work/<slug>.jpg. Tilts toward the
 * cursor on hover for a subtle 3D-card feel; a moving light sheen sells the
 * effect as a glossy surface rather than a flat image tilting in place.
 */
export function ProjectCover({ slug, className }: { slug: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [7, -7]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), { stiffness: 250, damping: 20 });
  const sheenX = useTransform(pointerX, (value) => `${value * 100}%`);
  const sheenY = useTransform(pointerY, (value) => `${value * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(280px circle at ${sheenX} ${sheenY}, rgb(255 255 255 / 0.16), transparent 70%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 700, transformStyle: "preserve-3d" }
      }
      className={clsx("relative overflow-hidden rounded-xl [perspective:700px]", className)}
    >
      <Image
        src={`/images/work/${slug}.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      {reduceMotion ? null : (
        <motion.div className="pointer-events-none absolute inset-0" style={{ backgroundImage: sheen }} />
      )}
    </motion.div>
  );
}
