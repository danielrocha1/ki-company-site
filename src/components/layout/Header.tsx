"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { NavGroup } from "@/content/navigation";
import { cn } from "@/lib/cn";

import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <div
      ref={wrapper}
      className="relative"
      onPointerEnter={show}
      onPointerLeave={hide}
      onBlur={(e) => {
        if (!wrapper.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <div className="flex items-center">
        <Link
          href={group.href}
          className={cn(
            "rounded-full py-2 pr-1 pl-3 text-sm transition-colors",
            isActive(pathname, group.href) ? "text-fg" : "text-fg-muted hover:text-fg",
          )}
          aria-current={pathname === group.href ? "page" : undefined}
        >
          {group.label}
        </Link>
        <button
          type="button"
          className="grid size-7 place-items-center rounded-full text-fg-muted hover:text-fg"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`Abrir submenu de ${group.label}`}
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown aria-hidden className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 z-50 pt-3"
          >
            <ul className="w-[320px] rounded-2xl border border-line-strong bg-ink-850/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
              {group.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05]",
                      pathname === child.href && "bg-white/[0.04]",
                    )}
                    aria-current={pathname === child.href ? "page" : undefined}
                  >
                    <span className="block text-sm text-fg">{child.label}</span>
                    {child.description && <span className="mt-0.5 block text-xs text-fg-subtle">{child.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-site-header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-b border-line bg-ink-950/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="KI COMPANY, página inicial" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((group) =>
            group.children?.length ? (
              <DesktopDropdown key={group.href} group={group} pathname={pathname} />
            ) : (
              <Link
                key={group.href}
                href={group.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors",
                  isActive(pathname, group.href) ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
                aria-current={pathname === group.href ? "page" : undefined}
              >
                {group.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contato" size="md">
            Fale com um especialista
          </ButtonLink>
        </div>

        <MobileNav nav={nav} pathname={pathname} />
      </Container>
    </header>
  );
}
