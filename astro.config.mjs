// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';
import clerk from '@clerk/astro'

export default defineConfig({
  output: 'server',
  server: { host: '0.0.0.0', port: 4321 },
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(), 
    clerk()
  ]
});
