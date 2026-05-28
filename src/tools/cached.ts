import { defineTool, ok, withCache } from '@ethosagent/plugin-sdk/tool-helpers';

interface CachedArgs {
  query: string;
}

export const cachedTool = defineTool<CachedArgs>(
  withCache(
    {
      name: 'scaffold_cached',
      description:
        'Returns data that can be cached for 60 seconds. Demonstrates withCache and outputSchema.',
      schema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query' },
        },
        required: ['query'],
      },
      outputSchema: {
        type: 'object',
        properties: {
          results: { type: 'array', items: { type: 'string' } },
          cachedAt: { type: 'string' },
        },
      },
      async execute(args) {
        const results = [`Result for "${args.query}" at ${new Date().toISOString()}`];
        return ok(JSON.stringify({ results, cachedAt: new Date().toISOString() }));
      },
    },
    { ttlMs: 60_000 },
  ),
);
