import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("label-mono inline-flex items-center gap-2 text-data", className)}>
      <span aria-hidden className="inline-block h-px w-6 bg-gradient-to-r from-data/0 to-data" />
      {children}
    </p>
  );
}

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

export function SectionHeader({ eyebrow, title, description, align = "left", as = "h2", className, id }: Props) {
  const Heading = as;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={cn(
          "mt-4 font-semibold text-fg",
          as === "h1" ? "text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.02]" : "text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.08]",
        )}
      >
        {typeof title === "string" ? <WordReveal inView delay={0.05} lines={[{ text: title }]} /> : title}
      </Heading>
      {description && <p className={cn("mt-5 text-[1.05rem] leading-relaxed text-fg-muted sm:text-lg", align === "center" && "mx-auto max-w-2xl")}>{description}</p>}
    </Reveal>
  );
}
