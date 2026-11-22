import { NextResponse, type NextRequest } from "next/server";

import { site } from "@/content/site";
import { deliverContact } from "@/lib/contact-delivery";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ErrorCode = "invalid_origin" | "rate_limited" | "invalid_payload" | "not_configured" | "delivery_failed";

function error(code: ErrorCode, status: number, fieldErrors?: Record<string, string>) {
  return NextResponse.json({ ok: false, error: code, fieldErrors }, { status });
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host;
    const allowed = new Set([request.nextUrl.host, new URL(site.url).host]);
    return allowed.has(originHost);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return error("invalid_origin", 403);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(`contato:${ip}`)) return error("rate_limited", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("invalid_payload", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Honeypot preenchido: responde como sucesso sem entregar, para não ensinar o bot.
    if (fieldErrors.website) return NextResponse.json({ ok: true }, { status: 200 });
    return error("invalid_payload", 422, fieldErrors);
  }

  const result = await deliverContact(parsed.data, request.headers.get("referer") ?? "site");
  if (!result.ok) {
    return error(result.reason, result.reason === "not_configured" ? 503 : 502);
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
