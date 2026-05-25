# @ethosagent/tools-scaffold

<!-- Replace "tools-scaffold" with your tool's name -->

Scaffold template for building `@ethosagent/tools-*` packages. Clone, rename, and start building.

## Install

```bash
npm install @ethosagent/tools-scaffold
```

## CLI Usage

```bash
tools-scaffold hello --name World
tools-scaffold version
tools-scaffold help
```

## Library Usage

```typescript
import { createTools } from '@ethosagent/tools-scaffold';

const tools = createTools();
for (const tool of tools) {
  console.log(tool.name, tool.description);
}
```

## Ethos Integration

```typescript
import { createTools } from '@ethosagent/tools-scaffold';

for (const tool of createTools()) {
  toolRegistry.register(tool);
}
```

## Development

```bash
npm install          # install dependencies
make check           # typecheck + lint + test
make build           # tsup → dist/
make dev             # tsup --watch
make help            # list all targets
```

## Release

```bash
make version-bump-patch   # bump version
# update CHANGELOG.md
git add package.json CHANGELOG.md
git commit -m "chore: release v$(make version)"
git push origin main
# then: GitHub → Actions → Release → Run workflow
make smoke                # verify on npm
```

## License

MIT
