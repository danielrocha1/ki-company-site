import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Símbolo oficial da KI COMPANY (vetorizado a partir do manual de marca):
 * "K" com a faixa diagonal em degradê azul → ciano e o "I" em branco.
 */
export function LogoMark({ className, mono }: { className?: string; mono?: "white" | "navy" }) {
  const id = useId().replace(/:/g, "");
  const solid = mono === "navy" ? "#0F2D4B" : "#FFFFFF";
  const stripe = mono ? solid : `url(#ki-${id})`;
  return (
    <svg viewBox="0 0 101 64" className={cn("h-6 w-auto", className)} aria-hidden fill="none">
      {!mono && (
        <defs>
          <linearGradient id={`ki-${id}`} x1="15" y1="64" x2="71" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E5BFF" />
            <stop offset="0.55" stopColor="#1494FF" />
            <stop offset="1" stopColor="#00E6F0" />
          </linearGradient>
        </defs>
      )}
      <rect x="0" y="0" width="15" height="64" fill={solid} />
      <path d="M15 64V38L47 0h24z" fill={stripe} />
      <path d="M37.5 47 49 36.5 73 64H51z" fill={solid} />
      <rect x="86" y="0" width="15" height="64" fill={solid} />
    </svg>
  );
}

/** Logo horizontal: símbolo, filete e "COMPANY" espaçado. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-[22px]" />
      <span aria-hidden className="h-6 w-px bg-gradient-to-b from-transparent via-data to-transparent" />
      <span aria-hidden className="text-[0.78rem] font-medium tracking-[0.42em] text-fg">COMPANY</span>
      <span className="sr-only">KI COMPANY</span>
    </span>
  );
}
