"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

/**
 * Topologia viva do hero: nós organizados em camadas (origem → integração →
 * automação → APIs → destino) e pulsos de dados que atravessam as conexões.
 *
 * Desempenho: uma única animação via requestAnimationFrame atualiza atributos
 * SVG diretamente (sem re-render do React), pausa fora da tela e com a aba
 * oculta, e não roda com prefers-reduced-motion.
 */

type Node = { id: string; x: number; y: number; layer: number; r?: number; hub?: boolean };
type Edge = { from: string; to: string };

const LAYERS = ["ORIGEM", "INTEGRAÇÃO", "AUTOMAÇÃO", "APIs", "DESTINO"];
const LAYER_X = [56, 196, 320, 444, 584];

const NODES: Node[] = [
  { id: "o1", layer: 0, x: LAYER_X[0]!, y: 92 },
  { id: "o2", layer: 0, x: LAYER_X[0]!, y: 192 },
  { id: "o3", layer: 0, x: LAYER_X[0]!, y: 292 },
  { id: "o4", layer: 0, x: LAYER_X[0]!, y: 392 },
  { id: "o5", layer: 0, x: LAYER_X[0]!, y: 476 },
  { id: "i1", layer: 1, x: LAYER_X[1]!, y: 168, r: 6 },
  { id: "i2", layer: 1, x: LAYER_X[1]!, y: 300, r: 7, hub: true },
  { id: "i3", layer: 1, x: LAYER_X[1]!, y: 420, r: 6 },
  { id: "a1", layer: 2, x: LAYER_X[2]!, y: 236, r: 9, hub: true },
  { id: "a2", layer: 2, x: LAYER_X[2]!, y: 364, r: 7 },
  { id: "p1", layer: 3, x: LAYER_X[3]!, y: 150, r: 6 },
  { id: "p2", layer: 3, x: LAYER_X[3]!, y: 296, r: 7, hub: true },
  { id: "p3", layer: 3, x: LAYER_X[3]!, y: 440, r: 6 },
  { id: "d1", layer: 4, x: LAYER_X[4]!, y: 112 },
  { id: "d2", layer: 4, x: LAYER_X[4]!, y: 230 },
  { id: "d3", layer: 4, x: LAYER_X[4]!, y: 352 },
  { id: "d4", layer: 4, x: LAYER_X[4]!, y: 468 },
];

const EDGES: Edge[] = [
  { from: "o1", to: "i1" },
  { from: "o2", to: "i1" },
  { from: "o2", to: "i2" },
  { from: "o3", to: "i2" },
  { from: "o4", to: "i2" },
  { from: "o4", to: "i3" },
  { from: "o5", to: "i3" },
  { from: "i1", to: "a1" },
  { from: "i2", to: "a1" },
  { from: "i2", to: "a2" },
  { from: "i3", to: "a2" },
  { from: "a1", to: "p1" },
  { from: "a1", to: "p2" },
  { from: "a2", to: "p2" },
  { from: "a2", to: "p3" },
  { from: "p1", to: "d1" },
  { from: "p1", to: "d2" },
  { from: "p2", to: "d2" },
  { from: "p2", to: "d3" },
  { from: "p3", to: "d3" },
  { from: "p3", to: "d4" },
];

const byId = new Map(NODES.map((n) => [n.id, n]));

type Curve = { x0: number; y0: number; c1x: number; c1y: number; c2x: number; c2y: number; x1: number; y1: number };

function curveFor(edge: Edge): Curve {
  const a = byId.get(edge.from)!;
  const b = byId.get(edge.to)!;
  const dx = (b.x - a.x) * 0.5;
  return { x0: a.x, y0: a.y, c1x: a.x + dx, c1y: a.y, c2x: b.x - dx, c2y: b.y, x1: b.x, y1: b.y };
}

function pathFor(c: Curve) {
  return `M${c.x0} ${c.y0} C${c.c1x} ${c.c1y} ${c.c2x} ${c.c2y} ${c.x1} ${c.y1}`;
}

function pointAt(c: Curve, t: number) {
  const u = 1 - t;
  const x = u * u * u * c.x0 + 3 * u * u * t * c.c1x + 3 * u * t * t * c.c2x + t * t * t * c.x1;
  const y = u * u * u * c.y0 + 3 * u * u * t * c.c1y + 3 * u * t * t * c.c2y + t * t * t * c.y1;
  return { x, y };
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const PULSES = 7;
const EDGE_MS = 1500;

export function NetworkTopology({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const curves = useMemo(() => EDGES.map(curveFor), []);
  const outgoing = useMemo(() => {
    const map = new Map<string, number[]>();
    EDGES.forEach((e, i) => map.set(e.from, [...(map.get(e.from) ?? []), i]));
    return map;
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reduce) return;

    const pulseEls = Array.from(svg.querySelectorAll<SVGGElement>("[data-pulse]"));
    const edgeEls = Array.from(svg.querySelectorAll<SVGPathElement>("[data-edge]"));
    const nodeEls = new Map(Array.from(svg.querySelectorAll<SVGCircleElement>("[data-node]")).map((el) => [el.dataset.node!, el]));
    const edgeHeat = new Float32Array(EDGES.length);
    const nodeHeat = new Map<string, number>();

    const sources = NODES.filter((n) => n.layer === 0).map((n) => n.id);
    const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]!;

    type Pulse = { edge: number; start: number };
    const startEdge = () => pick(outgoing.get(pick(sources)) ?? [0]);
    const pulses: Pulse[] = Array.from({ length: PULSES }, (_, i) => ({
      edge: startEdge(),
      start: performance.now() + i * (EDGE_MS * 0.72) + Math.random() * 300,
    }));

    let raf = 0;
    let running = false;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const decay = Math.pow(0.0015, dt / 1000);
      for (let i = 0; i < edgeHeat.length; i++) edgeHeat[i]! *= decay;
      nodeHeat.forEach((v, k) => nodeHeat.set(k, v * decay));

      pulses.forEach((p, i) => {
        const el = pulseEls[i];
        if (!el) return;
        const t = (now - p.start) / EDGE_MS;
        if (t < 0) {
          el.setAttribute("opacity", "0");
          return;
        }
        if (t >= 1) {
          const arrived = EDGES[p.edge]!.to;
          nodeHeat.set(arrived, 1);
          const next = outgoing.get(arrived);
          if (next && next.length) {
            p.edge = pick(next);
            p.start = now;
          } else {
            p.edge = startEdge();
            p.start = now + 400 + Math.random() * 1600;
          }
          return;
        }
        edgeHeat[p.edge] = Math.max(edgeHeat[p.edge]!, 1);
        const { x, y } = pointAt(curves[p.edge]!, ease(t));
        el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        el.setAttribute("opacity", "1");
      });

      edgeEls.forEach((el, i) => {
        el.style.opacity = String(0.12 + edgeHeat[i]! * 0.75);
      });
      nodeEls.forEach((el, id) => {
        const h = nodeHeat.get(id) ?? 0;
        el.style.opacity = String(0.25 + h * 0.75);
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible && document.visibilityState === "visible") start();
      else stop();
    });
    observer.observe(svg);
    const onVisibility = () => (document.visibilityState === "visible" && visible ? start() : stop());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce, curves, outgoing]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 640 560"
      className={className}
      role="img"
      aria-label="Diagrama de rede: sistemas de origem conectados a uma camada de integração, a um motor de automação, a APIs e aos sistemas de destino, com dados fluindo entre eles."
    >
      <defs>
        <linearGradient id="nt-edge" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4D8DFF" />
          <stop offset="0.6" stopColor="#3DD6F5" />
          <stop offset="1" stopColor="#8B7CF6" />
        </linearGradient>
        <radialGradient id="nt-pulse">
          <stop offset="0" stopColor="#E8FBFF" />
          <stop offset="0.25" stopColor="#3DD6F5" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3DD6F5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nt-hub">
          <stop offset="0" stopColor="#4D8DFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#4D8DFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Trilhos verticais das camadas */}
      {LAYER_X.map((x, i) => (
        <g key={x}>
          <line x1={x} x2={x} y1={40} y2={512} stroke="rgb(148 163 194 / 0.10)" strokeDasharray="2 6" />
          <text
            x={x}
            y={540}
            textAnchor="middle"
            fill="rgb(163 173 191 / 0.55)"
            style={{ font: "500 9.5px var(--font-geist-mono), monospace", letterSpacing: "0.14em" }}
          >
            {LAYERS[i]}
          </text>
        </g>
      ))}

      {/* Conexões base */}
      {curves.map((c, i) => (
        <path key={`b-${i}`} d={pathFor(c)} fill="none" stroke="rgb(148 163 194 / 0.16)" strokeWidth={1} />
      ))}
      {/* Conexões ativas (iluminadas quando um pulso passa) */}
      {curves.map((c, i) => (
        <path
          key={`e-${i}`}
          data-edge
          d={pathFor(c)}
          fill="none"
          stroke="url(#nt-edge)"
          strokeWidth={1.4}
          style={{ opacity: reduce ? (i % 3 === 0 ? 0.6 : 0.15) : 0.12, transition: "opacity 0.2s" }}
        />
      ))}

      {/* Nós */}
      {NODES.map((n) => {
        const r = n.r ?? 4.5;
        return (
          <g key={n.id}>
            {n.hub && (
              <circle
                cx={n.x}
                cy={n.y}
                r={r * 5}
                fill="url(#nt-hub)"
                className="animate-pulse-soft"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            )}
            <circle data-node={n.id} cx={n.x} cy={n.y} r={r + 5} fill="none" stroke="#3DD6F5" strokeWidth={1} style={{ opacity: 0.25 }} />
            <circle cx={n.x} cy={n.y} r={r} fill="#0A0E16" stroke={n.hub ? "#4D8DFF" : "rgb(237 241 247 / 0.7)"} strokeWidth={1.5} />
            <circle cx={n.x} cy={n.y} r={n.hub ? 2.4 : 1.6} fill={n.hub ? "#4D8DFF" : "#EDF1F7"} />
          </g>
        );
      })}

      {/* Pulsos */}
      {Array.from({ length: PULSES }, (_, i) => (
        <g key={`p-${i}`} data-pulse opacity={0}>
          <circle r={9} fill="url(#nt-pulse)" />
          <circle r={2} fill="#F2FDFF" />
        </g>
      ))}
    </svg>
  );
}
