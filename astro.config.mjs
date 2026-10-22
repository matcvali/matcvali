import { defineConfig } from 'astro/config';

// SITE e BASE são preenchidos automaticamente pelo GitHub na hora de publicar.
// Você não precisa mexer aqui.
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
});
