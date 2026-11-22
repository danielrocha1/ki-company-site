"use client";

import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Card com borda iluminada no ponto do cursor. Sem JS pesado: só variáveis CSS. */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }
  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "spotlight rounded-2xl border border-line bg-gradient-to-b from-white/[0.035] to-white/[0.01] transition-[border-color,transform] duration-300 hover:border-line-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}
