import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada pasta dentro de src/content vira uma "coleção".
// Campos terminados em _en e _es são traduções opcionais.
// Se ficarem vazios, o site mostra a versão em português.

const opcional = z.coerce.string().optional().nullable();

const livros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/livros' }),
  schema: z.object({
    titulo: z.string(),
    titulo_en: opcional,
    titulo_es: opcional,
    autor: z.string(),
    ano: z.coerce.number().optional().nullable(),
    capa: opcional,
    status: z.enum(['lido', 'lendo', 'quero-ler', 'consulta']).default('lido'),
    nota: z.coerce.number().min(0).max(5).optional().nullable(),
    area: opcional,
    area_en: opcional,
    area_es: opcional,
    usei_para: opcional,
    usei_para_en: opcional,
    usei_para_es: opcional,
    impressao_en: opcional,
    impressao_es: opcional,
  }),
});

const interesses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/interesses' }),
  schema: z.object({
    titulo: z.string(),
    titulo_en: opcional,
    titulo_es: opcional,
    resumo: z.string(),
    resumo_en: opcional,
    resumo_es: opcional,
    desde: opcional,
    ordem: z.coerce.number().default(10),
    texto_en: opcional,
    texto_es: opcional,
  }),
});

const documentos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documentos' }),
  schema: z.object({
    titulo: z.string(),
    titulo_en: opcional,
    titulo_es: opcional,
    tipo: z.enum(['notas', 'relatorio', 'artigo', 'apresentacao', 'outro']).default('notas'),
    data: z.coerce.date(),
    arquivo: z.string(),
    descricao: opcional,
    descricao_en: opcional,
    descricao_es: opcional,
  }),
});

const disciplinas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/disciplinas' }),
  schema: z.object({
    titulo: z.string(),
    titulo_en: opcional,
    titulo_es: opcional,
    etapa: z.coerce.number(),
    status: z.enum(['concluida', 'cursando', 'planejada', 'sonho']).default('planejada'),
    periodo: opcional,
    comentario: opcional,
    comentario_en: opcional,
    comentario_es: opcional,
  }),
});

// Página "Como este site foi feito" (um único arquivo).
const sobre = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sobre' }),
  schema: z.object({
    titulo: z.string(),
    titulo_en: opcional,
    titulo_es: opcional,
    texto_en: opcional,
    texto_es: opcional,
  }),
});

export const collections = { livros, interesses, documentos, disciplinas, sobre };
