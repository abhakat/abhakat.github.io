# abhakat.github.io

Personal website built with React, TypeScript, Vite, and Bun.

## Development

Install dependencies:

```bash
bun install
```

Start the local site:

```bash
bun run dev
```

Run the quality checks:

```bash
bun run typecheck
bun run lint
bun run build
```

## Project Shape

```text
src/
  App.tsx                  App composition
  components/              Reusable UI sections
  content/profile.ts       Typed page content
  hooks/useViewportSize.ts Browser size state for the canvas
  types.ts                 Shared TypeScript types
```

## Learning Notes

- `satisfies` in `src/content/profile.ts` checks that content matches the expected type without erasing the narrow literal values.
- `typecheck` runs TypeScript without building, which makes it a fast way to study type errors.
- `bun.lock` replaces `package-lock.json`; use `bun install` and `bun run ...` for local work.

## Deployment

The GitHub Pages workflow uses Bun, typechecks the app, builds the Vite static output, and deploys `dist`.

For Cloudflare Pages, use:

```text
Build command: bun run build
Build output directory: dist
```
