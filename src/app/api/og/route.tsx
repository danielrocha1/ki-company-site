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
          background: "radial-gradient(900px 500px at 85% 10%, rgba(47,123,255,0.35), transparent 70%), #0A1020",
          color: "#F3F5F8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {nodes.map(([x, y], i) =>
            nodes.slice(i + 1, i + 3).map(([x2, y2]) => (
              <line key={`${x}-${x2}-${y2}`} x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(0,230,195,0.35)" strokeWidth="1.5" />
            )),
          )}
          {nodes.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#0E162B" stroke="#2F7BFF" strokeWidth="2" />
          ))}
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="88" height="56" viewBox="0 0 101 64">
            <defs>
              <linearGradient id="g" x1="15" y1="64" x2="71" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E5BFF" />
                <stop offset="0.55" stopColor="#1494FF" />
                <stop offset="1" stopColor="#00E6F0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="15" height="64" fill="#FFFFFF" />
            <path d="M15 64V38L47 0h24z" fill="url(#g)" />
            <path d="M37.5 47 49 36.5 73 64H51z" fill="#FFFFFF" />
            <rect x="86" y="0" width="15" height="64" fill="#FFFFFF" />
          </svg>
          <div style={{ width: 2, height: 52, background: "#00E6C3", opacity: 0.7 }} />
          <div style={{ fontSize: 26, letterSpacing: 12, fontWeight: 500 }}>COMPANY</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ fontSize: 22, color: "#00E6C3", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 54 : 66, fontWeight: 700, lineHeight: 1.05, marginTop: 20, letterSpacing: -1.5 }}>{title}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
