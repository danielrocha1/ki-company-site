"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { NavGroup } from "@/content/navigation";
import { cn } from "@/lib/cn";

import { ButtonLink } from "../ui/Button";

export function MobileNav({ nav, pathname }: { nav: NavGroup[]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Fecha ao trocar de página.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
      const items = [toggle, ...Array.from(focusables)].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="relative z-50 grid size-10 place-items-center rounded-full border border-line-strong bg-white/[0.03] text-fg"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink-950/97 backdrop-blur-2xl"
          >
            <div aria-hidden className="bg-blueprint mask-radial pointer-events-none absolute inset-0 opacity-60" />
            <nav aria-label="Principal" className="relative px-4 pt-[calc(var(--header-h)+1.5rem)] pb-10 sm:px-6">
              <ul className="space-y-1">
                {nav.map((group, i) => (
                  <motion.li
                    key={group.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line py-3"
                  >
                    <Link
                      href={group.href}
                      className={cn(
                        "flex items-baseline justify-between text-2xl font-semibold tracking-tight",
                        pathname === group.href ? "text-fg" : "text-fg/85",
                      )}
                      aria-current={pathname === group.href ? "page" : undefined}
                    >
                      {group.label}
                      <span className="label-mono text-fg-subtle">0{i + 1}</span>
                    </Link>
                    {group.children && group.children.length > 0 && (
                      <ul className="mt-2 grid gap-0.5">
                        {group.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block rounded-lg py-1.5 text-[0.95rem] transition-colors",
                                pathname === child.href ? "text-data" : "text-fg-muted hover:text-fg",
                              )}
                              aria-current={pathname === child.href ? "page" : undefined}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-8"
              >
                <ButtonLink href="/contato" size="lg" className="w-full">
                  Fale com um especialista
                </ButtonLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
