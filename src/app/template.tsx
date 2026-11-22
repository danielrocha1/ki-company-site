import type { ReactNode } from "react";

/**
 * Transição suave entre páginas: o template é remontado a cada navegação e a
 * animação é CSS pura, então o conteúdo é pintado já no primeiro frame
 * (sem esperar hidratação) e respeita prefers-reduced-motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
