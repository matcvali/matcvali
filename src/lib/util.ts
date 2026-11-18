import fs from 'node:fs';
import yaml from 'js-yaml';
import { marked } from 'marked';
import katex from 'katex';
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

/** Cor da capa desenhada, sempre a mesma para o mesmo título. */
const tonsCapa = [
  ['var(--orange)', '#2d1b26'],
  ['var(--plum)', 'var(--bg)'],
  ['var(--apricot)', 'var(--ink)'],
  ['var(--amber)', '#2d1b26'],
  ['var(--surface-2)', 'var(--ink)'],
];
export function corCapa(titulo: string): [string, string] {
  let h = 0;
  for (const c of titulo) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return tonsCapa[h % tonsCapa.length] as [string, string];
}

/** Texto em minúsculas e sem acentos, para a busca. */
export function normalizar(texto: string): string {
  return (texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * O editor do painel "protege" caracteres especiais ao salvar: \frac vira \\frac, x_1 vira x\_1.
 * Dentro das fórmulas, desfazemos isso para o LaTeX chegar intacto ao KaTeX.
 */
function desproteger(tex: string): string {
  return tex.replace(/\\([!-\/:-@\[-`{-~])/g, '$1');
}

/** Troca as fórmulas ($...$ e $$...$$) por marcadores e devolve o HTML de cada uma. */
function separarFormulas(texto: string): { texto: string; formulas: string[] } {
  const formulas: string[] = [];
  const guardar = (tex: string, bloco: boolean) => {
    let html: string;
    try {
      html = katex.renderToString(desproteger(tex).trim(), { displayMode: bloco, throwOnError: false, output: 'html' });
    } catch {
      html = `<code>${tex.replace(/</g, "&lt;")}</code>`;
    }
    formulas.push(bloco ? `<div class="formula">${html}</div>` : html);
    return `KATEXMARCADOR${formulas.length - 1}FIM`;
  };
  // Em bloco: $$ ... $$ (pode ocupar várias linhas)
  texto = texto.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => guardar(tex, true));
  // Na linha: $ ... $ sem espaço logo depois da abertura nem antes do fechamento,
  // e sem número logo após o fechamento (assim "R$ 5 e R$ 10" não vira fórmula).
  texto = texto.replace(/(^|[^\\$])\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d)/g, (_, antes, tex) => antes + guardar(tex, false));
  return { texto, formulas };
}

/** Converte o texto do painel (Markdown, com imagens e fórmulas em LaTeX) em HTML. */
export function markdown(texto: string): string {
  const { texto: semFormulas, formulas } = separarFormulas(texto || '');
  let html = marked.parse(semFormulas, { async: false }) as string;
  html = html.replace(/KATEXMARCADOR(\d+)FIM/g, (_, i) => formulas[Number(i)]);
  // Um parágrafo que só contém uma fórmula em bloco não precisa do <p> em volta.
  html = html.replace(/<p>\s*(<div class="formula">[\s\S]*?<\/div>)\s*<\/p>/g, '$1');
  // Imagens e links enviados pelo painel começam com "/" (ex.: /imagens/foto.png).
  // Aqui eles ganham o endereço base do site, para funcionar em qualquer pasta.
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return html.replace(/((?:src|href)=")\/(?!\/)/g, `$1${base}/`);
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
