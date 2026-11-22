"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type KeyboardEvent } from "react";

import { Icon } from "@/components/ui/Icon";
import { diagramLayers, type DiagramLayer } from "@/content/telecom";
import { cn } from "@/lib/cn";

type Mode = "integrado" | "fragmentado";

const W = 1000;
const H = 470;
const COL_X = [86, 293, 500, 707, 914];
const BOX_W = 146;
const ITEM_H = 50;
const HUB_H = 92;

type Box = { layer: number; id: string; label: string; icon: DiagramLayer["items"][number]["icon"]; x: number; y: number; h: number };

function layoutBoxes(): Box[] {
  const boxes: Box[] = [];
  diagramLayers.forEach((layer, li) => {
    const n = layer.items.length;
    const hub = n === 1;
    const h = hub ? HUB_H : ITEM_H;
    const gap = n === 4 ? 30 : 46;
    const total = n * h + (n - 1) * gap;
    const top = 70 + (H - 70 - 20 - total) / 2;
    layer.items.forEach((item, ii) => {
      boxes.push({ layer: li, id: item.id, label: item.label, icon: item.icon, x: COL_X[li]!, y: top + ii * (h + gap) + h / 2, h });
    });
  });
  return boxes;
}

const BOXES = layoutBoxes();

function link(a: Box, b: Box) {
  const x0 = a.x + BOX_W / 2;
  const x1 = b.x - BOX_W / 2;
  const dx = (x1 - x0) * 0.5;
  return `M${x0} ${a.y} C${x0 + dx} ${a.y} ${x1 - dx} ${b.y} ${x1} ${b.y}`;
}

function integratedLinks() {
  const out: string[] = [];
  for (let l = 0; l < diagramLayers.length - 1; l++) {
    const from = BOXES.filter((b) => b.layer === l);
    const to = BOXES.filter((b) => b.layer === l + 1);
    from.forEach((a) => to.forEach((b) => out.push(link(a, b))));
  }
  return out;
}

function fragmentedLinks() {
  const sources = BOXES.filter((b) => b.layer === 0);
  const targets = BOXES.filter((b) => b.layer === diagramLayers.length - 1);
  const out: string[] = [];
  sources.forEach((a, i) =>
    targets.forEach((b, j) => {
      const x0 = a.x + BOX_W / 2;
      const x1 = b.x - BOX_W / 2;
      const bend = (i - j) * 26;
      out.push(`M${x0} ${a.y} C${x0 + 220} ${a.y + bend} ${x1 - 220} ${b.y - bend} ${x1} ${b.y}`);
    }),
  );
  return out;
}

const INTEGRATED = integratedLinks();
const FRAGMENTED = fragmentedLinks();
const POINT_TO_POINT = diagramLayers[0]!.items.length * diagramLayers[diagramLayers.length - 1]!.items.length;

export function TelecomDiagram() {
  const [mode, setMode] = useState<Mode>("integrado");
  const [selected, setSelected] = useState(1);
  const panelId = useId();
  const layer = diagramLayers[selected]!;
  const fragmented = mode === "fragmentado";

  const onNodeKey = (e: KeyboardEvent, li: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(li);
    }
  };

  return (
    <div className="rounded-[28px] border border-line-strong bg-ink-900/70 p-4 sm:p-6">
      {/* Controles */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-mono text-fg-subtle">Diagrama interativo · selecione uma camada</p>
        <div role="radiogroup" aria-label="Cenário" className="inline-flex rounded-full border border-line-strong bg-ink-950 p-1">
          {(["fragmentado", "integrado"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                mode === m ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {mode === m && (
                <motion.span
                  layoutId="mode-pill"
                  className={cn("absolute inset-0 rounded-full", m === "integrado" ? "bg-signal/25 ring-1 ring-signal/50" : "bg-warn/15 ring-1 ring-warn/40")}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
              <span className="relative">{m === "fragmentado" ? "Sem integração" : "Com integração"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: diagrama SVG */}
      <div className="relative mt-6 hidden md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-describedby={panelId} role="group" aria-label="Fluxo de integração para telecom">
          <defs>
            <linearGradient id="td-flow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
              <stop offset="0" stopColor="#4D8DFF" />
              <stop offset="0.55" stopColor="#3DD6F5" />
              <stop offset="1" stopColor="#8B7CF6" />
            </linearGradient>
          </defs>

          {diagramLayers.map((l, li) => (
            <g key={l.id}>
              <rect
                x={COL_X[li]! - BOX_W / 2 - 14}
                y={20}
                width={BOX_W + 28}
                height={H - 30}
                rx={18}
                fill={selected === li ? "rgb(77 141 255 / 0.06)" : "transparent"}
                stroke={selected === li ? "rgb(77 141 255 / 0.35)" : "rgb(148 163 194 / 0.08)"}
                strokeDasharray={selected === li ? undefined : "3 6"}
                style={{ transition: "all .3s", opacity: fragmented && li > 0 && li < 4 ? 0.3 : 1 }}
              />
              <text
                x={COL_X[li]}
                y={50}
                textAnchor="middle"
                fill={selected === li ? "#3DD6F5" : "rgb(163 173 191 / 0.7)"}
                style={{ font: "500 11px var(--font-geist-mono), monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                {l.label}
              </text>
            </g>
          ))}

          {/* Conexões */}
          <g fill="none">
            {(fragmented ? FRAGMENTED : INTEGRATED).map((d, i) => (
              <g key={`${mode}-${i}`}>
                <path d={d} stroke={fragmented ? "rgb(251 191 36 / 0.35)" : "rgb(148 163 194 / 0.18)"} strokeWidth={1.2} />
                <path
                  d={d}
                  stroke={fragmented ? "rgb(251 191 36 / 0.7)" : "url(#td-flow)"}
                  strokeWidth={1.6}
                  strokeDasharray={fragmented ? "2 7" : "6 18"}
                  className="animate-dash"
                  style={{ animationDuration: fragmented ? "3.2s" : `${1.4 + (i % 4) * 0.2}s` }}
                />
              </g>
            ))}
          </g>

          {/* Nós */}
          {BOXES.map((b) => {
            const dim = fragmented && b.layer > 0 && b.layer < 4;
            const active = selected === b.layer;
            return (
              <g
                key={b.id}
                role="button"
                tabIndex={dim ? -1 : 0}
                aria-pressed={active}
                aria-label={`${b.label}: ${diagramLayers[b.layer]!.title}`}
                onClick={() => setSelected(b.layer)}
                onKeyDown={(e) => onNodeKey(e, b.layer)}
                className="cursor-pointer outline-none [&:focus-visible>rect:first-child]:stroke-[#3DD6F5]"
                style={{ opacity: dim ? 0.25 : 1, transition: "opacity .3s" }}
              >
                <rect
                  x={b.x - BOX_W / 2}
                  y={b.y - b.h / 2}
                  width={BOX_W}
                  height={b.h}
                  rx={12}
                  fill="#0A0E16"
                  stroke={active ? "#4D8DFF" : "rgb(148 163 194 / 0.28)"}
                  strokeWidth={active ? 1.6 : 1}
                  style={{ transition: "stroke .25s" }}
                />
                <foreignObject x={b.x - BOX_W / 2} y={b.y - b.h / 2} width={BOX_W} height={b.h} pointerEvents="none">
                  <div className={cn("flex h-full items-center gap-2 px-3", b.h === HUB_H && "flex-col justify-center gap-2 text-center")}>
                    <span className={cn("grid shrink-0 place-items-center rounded-lg border border-line bg-ink-800", b.h === HUB_H ? "size-9 text-data" : "size-7 text-signal")}>
                      <Icon name={b.icon} className={b.h === HUB_H ? "size-[18px]" : "size-3.5"} />
                    </span>
                    <span className="text-[12.5px] leading-tight text-fg">{b.label}</span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: fluxo vertical */}
      <ol className="mt-6 space-y-0 md:hidden" aria-describedby={panelId}>
        {diagramLayers.map((l, li) => {
          const dim = fragmented && li > 0 && li < 4;
          return (
            <li key={l.id} className="relative">
              <button
                type="button"
                onClick={() => setSelected(li)}
                aria-pressed={selected === li}
                disabled={dim}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition-[border-color,background-color,opacity]",
                  selected === li ? "border-signal/60 bg-signal/[0.07]" : "border-line bg-ink-950",
                  dim && "opacity-30",
                )}
              >
                <span className="label-mono text-data">{l.label}</span>
                <span className="mt-1 block font-medium">{l.title}</span>
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {l.items.map((it) => (
                    <span key={it.id} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-fg-muted">
                      <Icon name={it.icon} className="size-3" />
                      {it.label}
                    </span>
                  ))}
                </span>
              </button>
              {li < diagramLayers.length - 1 && (
                <span aria-hidden className="mx-auto block h-7 w-px overflow-hidden">
                  <svg viewBox="0 0 2 28" className="h-7 w-px" preserveAspectRatio="none">
                    <line x1="1" x2="1" y1="0" y2="28" stroke={fragmented ? "#fbbf24" : "#3DD6F5"} strokeWidth="2" strokeDasharray="4 6" className="animate-dash" />
                  </svg>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Painel explicativo */}
      <div id={panelId} aria-live="polite" className="mt-6 min-h-[136px] rounded-2xl border border-line bg-ink-950/80 p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {fragmented ? (
            <motion.div
              key="frag"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="label-mono text-warn">Cenário sem integração</p>
              <p className="mt-2 text-lg font-medium">
                {diagramLayers[0]!.items.length} origens × {diagramLayers[diagramLayers.length - 1]!.items.length} destinos = {POINT_TO_POINT} conexões ponto a ponto.
              </p>
              <p className="mt-2 max-w-3xl leading-relaxed text-fg-muted">
                Cada sistema fala diretamente com cada outro. Uma nova ferramenta exige uma nova conexão com todas as outras, regras de negócio se espalham
                por scripts e planilhas e ninguém tem a visão completa do que está acontecendo.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 lg:grid-cols-[1fr_1.2fr]"
            >
              <div>
                <p className="label-mono text-data">{layer.label}</p>
                <p className="mt-2 text-lg font-medium">{layer.title}</p>
              </div>
              <p className="leading-relaxed text-fg-muted">{layer.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
