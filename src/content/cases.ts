import type { CaseStudy } from "./types";

/**
 * Cases de clientes.
 *
 * Vazio de propósito: nenhum case público foi autorizado até agora. Quando
 * houver, adicione aqui (com `authorized: true` somente após autorização formal
 * do cliente). A seção da Home e a página `/cases` passam a aparecer sozinhas.
 */
export const caseStudies: CaseStudy[] = [];

export function hasCaseStudies(): boolean {
  return caseStudies.length > 0;
}
