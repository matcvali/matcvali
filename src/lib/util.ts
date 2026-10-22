import fs from 'node:fs';
import yaml from 'js-yaml';
import { langs, type Lang } from '../i18n/ui';

/** Monta um link respeitando o endereço base do site. */
export function url(caminho: string): string {
  if (!caminho) return caminho;
  if (/^(https?:|mailto:|#)/.test(caminho)) return caminho;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (caminho.startsWith('/') ? caminho : '/' + caminho);
}

/** Pega o campo traduzido (ex.: titulo_en). Se não existir, usa o português. */
export function campo(dados: Record<string, any>, nome: string, lang: Lang): string {
  if (lang !== 'pt') {
    const traduzido = dados[`${nome}_${lang}`];
    if (traduzido && String(traduzido).trim()) return traduzido;
  }
  return dados[nome] ?? '';
}

export function temTraducao(dados: Record<string, any>, nome: string, lang: Lang): boolean {
  if (lang === 'pt') return true;
  const v = dados[`${nome}_${lang}`];
  return Boolean(v && String(v).trim());
}

export function caminhosIdioma() {
  return langs.map((lang) => ({ params: { lang } }));
}

let cachePerfil: any;
export function perfil() {
  if (!cachePerfil) {
    cachePerfil = yaml.load(fs.readFileSync('./src/data/perfil.yml', 'utf8'));
  }
  return cachePerfil as Record<string, any>;
}

/** Converte texto simples (com linhas em branco) em parágrafos HTML seguros. */
export function paragrafos(texto: string): string {
  const esc = texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc
    .split(/\n\s*\n/)
    .map((p) => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export function formatarData(d: Date, lang: Lang) {
  const loc = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[lang];
  return d.toLocaleDateString(loc, { year: 'numeric', month: 'short', timeZone: 'UTC' });
}
