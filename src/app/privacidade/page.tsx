import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de privacidade",
  description: "Como a KI COMPANY trata os dados enviados pelo formulário de contato.",
  path: "/privacidade",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Privacidade", path: "/privacidade" },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Privacidade"
        title="Política de privacidade"
        description="Como tratamos os dados que você envia por este site."
      />
      <Container>
        <div className="prose-site max-w-3xl space-y-10 leading-relaxed text-fg-muted">
          <section>
            <h2 className="text-xl font-semibold text-fg">Dados coletados</h2>
            <p className="mt-3">
              Pelo formulário de contato coletamos nome, empresa, e-mail corporativo, telefone (opcional), serviço de interesse e a descrição do
              projeto. Não usamos cookies de rastreamento nem ferramentas de publicidade neste site.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-fg">Finalidade</h2>
            <p className="mt-3">
              Usamos esses dados exclusivamente para responder ao seu contato e conduzir a conversa comercial que você solicitou, com base no seu
              consentimento (art. 7º, I, da Lei nº 13.709/2018, LGPD).
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-fg">Compartilhamento</h2>
            <p className="mt-3">
              Os dados são transmitidos por conexão segura aos serviços usados para entregar a mensagem à nossa equipe (provedor de e-mail
              transacional e/ou sistema interno de atendimento). Não vendemos nem cedemos seus dados a terceiros.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-fg">Seus direitos</h2>
            <p className="mt-3">
              Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento
              {site.contact.email ? (
                <>
                  {" "}
                  pelo e-mail{" "}
                  <a className="text-fg underline underline-offset-4" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </>
              ) : (
                " respondendo à mensagem que enviarmos"
              )}
              .
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
