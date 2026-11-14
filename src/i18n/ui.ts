// Os textos fixos do site ficam em src/data/textos.yml (editável pelo painel, em "Textos do site").
// Este arquivo só os lê e entrega para as páginas.
import fs from 'node:fs';
import yaml from 'js-yaml';

export const idiomas = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof idiomas;
export const langs = Object.keys(idiomas) as Lang[];

type Textos = Record<string, Record<string, Partial<Record<Lang, string>>>>;
let cache: Textos | null = null;
function textos(): Textos {
  if (!cache) cache = (yaml.load(fs.readFileSync('./src/data/textos.yml', 'utf8')) as Textos) || {};
  return cache;
}

/**
 * Busca um texto pela chave, por exemplo t('pt', 'nav.biblioteca').
 * A chave "bib.status.quero-ler" vira, no arquivo, o grupo "bib" e o item "status_quero_ler".
 * Se faltar o idioma pedido, usa o português; se faltar tudo, mostra a própria chave.
 */
export function t(lang: Lang, chave: string): string {
  const [grupo, ...resto] = chave.split('.');
  const item = resto.join('_').replace(/-/g, '_');
  const valores = textos()[grupo]?.[item];
  const v = valores?.[lang];
  if (v && String(v).trim()) return String(v);
  return valores ? String(valores.pt ?? '') : chave;
}
