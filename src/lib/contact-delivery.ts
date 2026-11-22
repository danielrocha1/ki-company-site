import "server-only";

import { createHmac } from "node:crypto";

import { site } from "@/content/site";

import { interestLabel, type ContactData } from "./contact-schema";

/**
 * Entrega do formulário de contato.
 *
 * Canais suportados (configure ao menos um):
 * - Resend (e-mail): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * - Webhook (CRM, n8n, Zapier, Make, backend próprio): CONTACT_WEBHOOK_URL
 *   e, opcionalmente, CONTACT_WEBHOOK_SECRET para assinatura HMAC-SHA256.
 *
 * A mensagem só é considerada enviada quando ao menos um canal confirma o
 * recebimento. Sem canal configurado, o envio falha de forma explícita.
 */

export type DeliveryResult =
  | { ok: true; channels: string[] }
  | { ok: false; reason: "not_configured" | "delivery_failed"; detail?: string };

type Channel = { name: string; send: (lead: Lead) => Promise<void> };

type Lead = Omit<ContactData, "website"> & { receivedAt: string; interestLabel: string; source: string };

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resendChannel(): Channel | null {
  const apiKey = env("RESEND_API_KEY");
  const to = env("CONTACT_TO_EMAIL");
  const from = env("CONTACT_FROM_EMAIL");
  if (!apiKey || !to || !from) return null;

  return {
    name: "email",
    async send(lead) {
      const rows: [string, string][] = [
        ["Nome", lead.name],
        ["Empresa", lead.company],
        ["E-mail", lead.email],
        ["Telefone", lead.phone || "Não informado"],
        ["Interesse", lead.interestLabel],
        ["Recebido em", lead.receivedAt],
      ];
      const html = `
        <h2 style="font-family:sans-serif">Nova solicitação de conversa</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 12px 4px 0;color:#555">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
            )
            .join("")}
        </table>
        <h3 style="font-family:sans-serif">Projeto</h3>
        <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(lead.message)}</p>`;
      const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProjeto:\n${lead.message}`;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: lead.email,
          subject: `[${site.name}] ${lead.interestLabel} — ${lead.company}`,
          html,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        throw new Error(`Resend respondeu ${response.status}`);
      }
    },
  };
}

function webhookChannel(): Channel | null {
  const url = env("CONTACT_WEBHOOK_URL");
  if (!url) return null;
  const secret = env("CONTACT_WEBHOOK_SECRET");

  return {
    name: "webhook",
    async send(lead) {
      const body = JSON.stringify({ type: "contact.created", data: lead });
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (secret) {
        headers["X-Signature-SHA256"] = createHmac("sha256", secret).update(body).digest("hex");
      }
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        throw new Error(`Webhook respondeu ${response.status}`);
      }
    },
  };
}

export function configuredChannels(): Channel[] {
  return [resendChannel(), webhookChannel()].filter((c): c is Channel => c !== null);
}

export async function deliverContact(data: ContactData, source: string): Promise<DeliveryResult> {
  const channels = configuredChannels();
  if (channels.length === 0) return { ok: false, reason: "not_configured" };

  // O honeypot não é encaminhado.
  const { website, ...rest } = data;
  void website;
  const lead: Lead = {
    ...rest,
    receivedAt: new Date().toISOString(),
    interestLabel: interestLabel(data.interest),
    source,
  };

  const results = await Promise.allSettled(channels.map((c) => c.send(lead)));
  const delivered = channels.filter((_, i) => results[i]?.status === "fulfilled").map((c) => c.name);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[contato] falha no canal ${channels[i]?.name}:`, r.reason instanceof Error ? r.reason.message : r.reason);
    }
  });

  if (delivered.length === 0) return { ok: false, reason: "delivery_failed" };
  return { ok: true, channels: delivered };
}
