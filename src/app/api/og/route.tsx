import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";


/** Imagem Open Graph gerada por página: /api/og?title=...&eyebrow=... */
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get("title") ?? "KI COMPANY").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? "Engenharia de software · Integração · Automação").slice(0, 60);

  const nodes = [
    [860, 140],
    [980, 250],
    [900, 380],
    [1060, 420],
    [1100, 160],
  ] as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "radial-gradient(900px 500px at 85% 10%, rgba(47,116,255,0.35), transparent 70%), #05070C",
          color: "#EDF1F7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {nodes.map(([x, y], i) =>
            nodes.slice(i + 1, i + 3).map(([x2, y2]) => (
              <line key={`${x}-${x2}-${y2}`} x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(61,214,245,0.35)" strokeWidth="1.5" />
            )),
          )}
          {nodes.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#0A0E16" stroke="#4D8DFF" strokeWidth="2" />
          ))}
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, letterSpacing: 4, fontWeight: 700 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, border: "2px solid #4D8DFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            KI
          </div>
          KI COMPANY
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ fontSize: 22, color: "#3DD6F5", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 54 : 66, fontWeight: 700, lineHeight: 1.05, marginTop: 20, letterSpacing: -1.5 }}>{title}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
