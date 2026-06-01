import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const htmlFile = (path: string) => new URL(path, import.meta.url).pathname

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: htmlFile('./index.html'),
        projects: htmlFile('./projects/index.html'),
        papers: htmlFile('./papers/index.html'),
        hobbies: htmlFile('./hobbies/index.html'),
        travel: htmlFile('./travel/index.html'),
        notes: htmlFile('./notes/index.html'),
      },
    },
  },
})
