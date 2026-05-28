import { defineTool, ok, withReturnDirect } from '@ethosagent/plugin-sdk/tool-helpers';

interface DirectArgs {
  message: string;
}

export const directTool = defineTool<DirectArgs>(
  withReturnDirect({
    name: 'scaffold_direct',
    description:
      'Returns output directly to the user, skipping LLM synthesis. Demonstrates withReturnDirect.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Message to send directly to the user' },
      },
      required: ['message'],
    },
    async execute(args) {
      return ok(args.message);
    },
  }),
);
