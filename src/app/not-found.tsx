import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center pt-[var(--header-h)]">
      <div aria-hidden className="bg-blueprint mask-radial absolute inset-0 -z-10" />
      <Container className="text-center">
        <p className="label-mono text-data">Erro 404 · rota não encontrada</p>
        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold">Este nó não está na rede.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-fg-muted">A página que você procura não existe ou mudou de endereço.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Voltar ao início</ButtonLink>
          <ButtonLink href="/contato" variant="secondary">
            Fale com um especialista
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
