// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';
import clerk from '@clerk/astro'

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone', host: '0.0.0.0' }),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(), 
    clerk()
  ]
});
