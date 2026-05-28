import { defineTool, err, ok } from '@ethosagent/plugin-sdk/tool-helpers';

interface HelloArgs {
  name?: string;
}

export const helloTool = defineTool<HelloArgs>({
  name: 'scaffold_hello',
  description:
    'Returns a greeting. The simplest possible tool — demonstrates defineTool, ok, and err.',
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Name to greet (default: "world")' },
    },
  },
  async execute(args) {
    const name = args.name?.trim();
    if (name !== undefined && name.length === 0) {
      return err('name must not be empty when provided', 'input_invalid');
    }
    return ok(`Hello, ${name ?? 'world'}!`);
  },
});
