"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, LoaderCircle, RotateCcw, Send } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";

import { contactInterests } from "@/content/services";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { contactSchema, type ContactData, type ContactInput } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const errorMessages: Record<string, string> = {
  not_configured:
    "O envio de mensagens ainda não está ativo neste ambiente. Sua mensagem não foi enviada. Tente novamente mais tarde ou use um dos contatos diretos.",
  delivery_failed: "Não conseguimos entregar sua mensagem agora. Ela não foi enviada. Tente novamente em alguns minutos.",
  rate_limited: "Recebemos muitas tentativas a partir da sua conexão. Aguarde alguns minutos e tente de novo.",
  invalid_origin: "Não foi possível validar a origem do envio. Recarregue a página e tente novamente.",
  invalid_payload: "Alguns campos precisam de ajuste. Revise o formulário.",
  network: "Sem conexão com o servidor. Verifique sua internet e tente novamente.",
};

const inputBase =
  "w-full rounded-xl border bg-ink-900/80 px-4 py-3 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow,background-color] duration-200 outline-none focus:bg-ink-900 focus:border-signal focus:shadow-[0_0_0_4px_rgb(77_141_255/0.15)] disabled:opacity-60";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: FieldError;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-fg">
        {label}
        {optional && <span className="text-xs font-normal text-fg-subtle">opcional</span>}
      </label>
      <div className="mt-2">{children}</div>
      <AnimatePresence initial={false}>
        {error?.message ? (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-sm text-danger"
          >
            <CircleAlert aria-hidden className="size-3.5 shrink-0" />
            {error.message}
          </motion.p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-fg-subtle">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type Props = { defaultInterest?: string; fallbackContact?: ReactNode };

export function ContactForm({ defaultInterest, fallbackContact }: Props) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const validInterest = contactInterests.some((i) => i.value === defaultInterest) ? defaultInterest : "";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      interest: validInterest ?? "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (data: ContactData) => {
    setStatus("submitting");
    setErrorCode(null);
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string; fieldErrors?: Record<string, string> }
        | null;

      if (response.ok && body?.ok) {
        setStatus("success");
        reset();
        return;
      }
      if (body?.fieldErrors) {
        const entries = Object.entries(body.fieldErrors);
        entries.forEach(([field, message]) => setError(field as keyof ContactInput, { type: "server", message }));
        if (entries[0]) setFocus(entries[0][0] as keyof ContactInput);
      }
      setErrorCode(body?.error ?? "delivery_failed");
      setStatus("error");
    } catch {
      setErrorCode("network");
      setStatus("error");
    }
  };

  const describedBy = (name: keyof ContactInput, hint = false) =>
    errors[name] ? `${id(name)}-error` : hint ? `${id(name)}-hint` : undefined;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-ok/30 bg-ok/[0.05] p-8 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full border border-ok/40 bg-ok/10 text-ok">
          <CircleCheck aria-hidden className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Mensagem recebida.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-fg-muted">
          Obrigado pelo contato. Nossa equipe vai analisar o que você descreveu e responder pelo e-mail informado.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(buttonClasses.base, buttonClasses.variants.secondary, buttonClasses.sizes.md, "mt-8")}
        >
          <RotateCcw aria-hidden className="size-4" />
          Enviar outra mensagem
        </button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={submitting} className="space-y-6">
      <AnimatePresence>
        {status === "error" && errorCode && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 rounded-xl border border-danger/40 bg-danger/[0.07] p-4 text-sm leading-relaxed"
          >
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
            <div>
              <p>{errorMessages[errorCode] ?? errorMessages.delivery_failed}</p>
              {(errorCode === "not_configured" || errorCode === "delivery_failed") && fallbackContact && (
                <div className="mt-2 text-fg-muted">{fallbackContact}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <fieldset disabled={submitting} className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Seus dados</legend>
        <Field id={id("name")} label="Nome" error={errors.name}>
          <input
            id={id("name")}
            autoComplete="name"
            className={cn(inputBase, errors.name ? "border-danger/70" : "border-line-strong")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
        </Field>
        <Field id={id("company")} label="Empresa" error={errors.company}>
          <input
            id={id("company")}
            autoComplete="organization"
            className={cn(inputBase, errors.company ? "border-danger/70" : "border-line-strong")}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            {...register("company")}
          />
        </Field>
        <Field id={id("email")} label="E-mail corporativo" error={errors.email}>
          <input
            id={id("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            className={cn(inputBase, errors.email ? "border-danger/70" : "border-line-strong")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
        </Field>
        <Field id={id("phone")} label="Telefone" optional error={errors.phone}>
          <input
            id={id("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            className={cn(inputBase, errors.phone ? "border-danger/70" : "border-line-strong")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            {...register("phone")}
          />
        </Field>
      </fieldset>

      <fieldset disabled={submitting} className="space-y-6">
        <legend className="sr-only">Seu projeto</legend>
        <Field id={id("interest")} label="Serviço de interesse" error={errors.interest}>
          <select
            id={id("interest")}
            className={cn(inputBase, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10", errors.interest ? "border-danger/70" : "border-line-strong")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3adbf' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            aria-invalid={!!errors.interest}
            aria-describedby={describedBy("interest")}
            {...register("interest")}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {contactInterests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id={id("message")}
          label="Descrição do projeto"
          error={errors.message}
          hint="Conte o contexto: sistemas envolvidos, o que precisa mudar e prazos, se houver."
        >
          <textarea
            id={id("message")}
            rows={6}
            className={cn(inputBase, "resize-y", errors.message ? "border-danger/70" : "border-line-strong")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", true)}
            {...register("message")}
          />
        </Field>

        {/* Honeypot: invisível para pessoas, preenchido por bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Não preencha este campo</label>
          <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div>
          <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fg-muted">
            <input
              id={id("consent")}
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#2F7BFF]"
              aria-invalid={!!errors.consent}
              aria-describedby={describedBy("consent")}
              {...register("consent")}
            />
            <span>
              Concordo que a KI COMPANY use estes dados para responder ao meu contato, conforme a{" "}
              <a href="/privacidade" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                política de privacidade
              </a>
              .
            </span>
          </label>
          {errors.consent?.message && (
            <p id={`${id("consent")}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
              <CircleAlert aria-hidden className="size-3.5" />
              {errors.consent.message}
            </p>
          )}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className={cn(buttonClasses.base, buttonClasses.variants.primary, buttonClasses.sizes.lg, "w-full sm:w-auto")}
      >
        {submitting ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            Solicitar uma conversa
            <Send aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
          </>
        )}
      </button>
      <p aria-live="polite" className="sr-only">
        {submitting ? "Enviando mensagem" : ""}
      </p>
    </form>
  );
}
