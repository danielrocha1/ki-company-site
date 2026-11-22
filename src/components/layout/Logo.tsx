import { cn } from "@/lib/cn";

/**
 * Logotipo tipográfico provisório da KI COMPANY.
 * Símbolo: um nó central (o "I") ligado a três nós (o "K"), como um ponto de
 * integração. Substitua por arquivo oficial quando existir.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden fill="none">
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="9" stroke="url(#ki-stroke)" strokeWidth="1.5" />
      <path d="M10 8.5v15" stroke="#EDF1F7" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 16 19 9M10.5 16 19 23" stroke="url(#ki-link)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="19.5" cy="8.75" r="2" fill="#3DD6F5" />
      <circle cx="19.5" cy="23.25" r="2" fill="#8B7CF6" />
      <circle cx="10" cy="16" r="2.25" fill="#4D8DFF" />
      <path d="M24 13.5v9" stroke="#EDF1F7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="9.75" r="1.35" fill="#EDF1F7" />
      <defs>
        <linearGradient id="ki-stroke" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#4D8DFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8B7CF6" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ki-link" x1="10" y1="16" x2="19" y2="16">
          <stop stopColor="#4D8DFF" />
          <stop offset="1" stopColor="#3DD6F5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[0.95rem] font-semibold tracking-[0.08em] text-fg">
        KI <span className="font-normal text-fg-muted">COMPANY</span>
      </span>
    </span>
  );
}
