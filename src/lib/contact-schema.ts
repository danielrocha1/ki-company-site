import { z } from "zod";

import { contactInterests } from "@/content/services";

const interestValues = contactInterests.map((i) => i.value) as [string, ...string[]];

/** Domínios de e-mail pessoal recusados no campo "e-mail corporativo". */
const personalDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "me.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "ig.com.br",
  "aol.com",
  "proton.me",
  "protonmail.com",
]);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(120, "Use no máximo 120 caracteres."),
  company: z
    .string()
    .trim()
    .min(2, "Informe o nome da empresa.")
    .max(160, "Use no máximo 160 caracteres."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Informe seu e-mail corporativo.")
    .max(200, "E-mail muito longo.")
    .pipe(z.email("Informe um e-mail válido."))
    .refine((value) => !personalDomains.has(value.split("@")[1] ?? ""), {
      message: "Use o e-mail da sua empresa.",
    }),
  phone: z
    .string()
    .trim()
    .max(30, "Telefone muito longo.")
    .refine((value) => value === "" || /^[+()\d\s-]{8,30}$/.test(value), {
      message: "Informe um telefone válido ou deixe em branco.",
    }),
  interest: z.enum(interestValues, { error: "Escolha um serviço de interesse." }),
  message: z
    .string()
    .trim()
    .min(20, "Conte um pouco mais sobre o projeto (mínimo de 20 caracteres).")
    .max(4000, "Use no máximo 4.000 caracteres."),
  consent: z.boolean().refine((value) => value, { message: "É preciso concordar para enviarmos sua mensagem." }),
  /** Honeypot: precisa chegar vazio. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export function interestLabel(value: string): string {
  return contactInterests.find((i) => i.value === value)?.label ?? value;
}
