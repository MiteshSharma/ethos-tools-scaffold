# tools-scaffold

<!-- Replace "tools-scaffold" with your tool's name throughout this file -->

One-line description of what this tool does.

## Architecture

<!-- Describe your tool's layers here. Example for a data tool:
- `src/schema.ts` — SQL DDL (no logic)
- `src/store.ts` — all DB read/write
- `src/fetcher.ts` — external API HTTP calls
- `src/tools.ts` — Ethos Tool[] wrappers
- `src/cli.ts` — CLI interface
-->

Three source files:
- `src/index.ts` — public barrel export
- `src/tools.ts` — Ethos `Tool[]` wrappers
- `src/cli.ts` — standalone CLI binary

## Commands

```bash
npm install        # install deps
npm run build      # tsup → dist/
npm run test       # vitest run
npm run typecheck  # tsc --noEmit
npm run lint       # biome check .
npm run lint:fix   # biome check --write .
npm run check      # typecheck + lint + test (run before declaring done)
make help          # list all Makefile targets
```

## Conventions

- **Extensionless imports only**: `import './store'` not `import './store.ts'` or `import './store.js'`
- **No `console.log` in library code** — only `cli.ts` may log to stdout. All other files must be silent.
- **Tool results**: every `execute()` must return `{ ok: true; value: string }` or `{ ok: false; error: string; code: string }`
- **TypeScript strict mode** — `strict: true` in tsconfig.json, no `as any`
- **ESM only** — `"type": "module"` in package.json
- **Biome** — single quotes, 2-space indent, 100-char line width, trailing commas, semicolons always

## Domain

<!-- Fill in domain-specific knowledge, gotchas, and external API details -->

## Gotchas

- `better-sqlite3` is synchronous when used — never `await` inside `.run()`, `.prepare()`, or `.exec()`
- Extensionless imports are required — `moduleResolution: "bundler"` in tsconfig
- Use STRICT SQLite tables when adding a database layer — column types are enforced
- Use `import.meta.dirname` for path resolution (Node 21.2+)
- `@ethosagent/types` is an optional peer dep — `tools.ts` re-declares types locally to avoid hard import

## Testing

- Run `npm run check` before declaring any task done
- Use `':memory:'` as SQLite path in tests when adding database layer
- Mock `globalThis.fetch` in tests — never hit real APIs in CI
