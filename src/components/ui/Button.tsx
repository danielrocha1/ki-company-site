import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-white shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset,0_8px_24px_-8px_rgb(77_141_255/0.6)] hover:bg-signal-strong hover:shadow-[0_0_0_1px_rgb(255_255_255/0.18)_inset,0_10px_32px_-8px_rgb(77_141_255/0.75)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07]",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", external, className, arrow = true }: Props) {
  const ArrowIcon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowIcon
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
          strokeWidth={1.8}
        />
      )}
    </>
  );
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export const buttonClasses = { base, variants, sizes };
