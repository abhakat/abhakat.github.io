import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylexPlugin from '@stylexjs/rollup-plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: true,
              genConditionalClasses: true,
              treeshakeCompensation: true,
              unstable_moduleResolution: {
                type: 'commonJS',
                rootDir: path.resolve(import.meta.dirname || __dirname),
              },
            },
          ],
        ],
      },
    }),
    stylexPlugin({
      fileName: 'stylex.css',
      dev: false,
      genConditionalClasses: true,
      treeshakeCompensation: true,
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: path.resolve(import.meta.dirname || __dirname),
      },
    }),
  ],
  build: {
    outDir: 'dist',
  },
})
