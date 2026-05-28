import { defineTool, err, ok } from '@ethosagent/plugin-sdk/tool-helpers';
import type { ToolContext } from '@ethosagent/types';

interface ContextArgs {
  action: 'get' | 'set';
  key: string;
  value?: string;
}

/**
 * Demonstrates cross-tool state via ToolContext.getContext / setContext.
 *
 * When the host wires getContext/setContext on the ToolContext, this tool
 * reads and writes arbitrary string values keyed by name. When those
 * methods are not available (older hosts), it falls back to a module-level
 * Map so the pattern still works in tests and simple setups.
 */

const fallbackStore = new Map<string, string>();

export const contextTool = defineTool<ContextArgs>({
  name: 'scaffold_context',
  description:
    'Reads or writes cross-tool state. Demonstrates ToolContext.getContext/setContext for sharing data between tools within a session.',
  schema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['get', 'set'],
        description: 'Whether to get or set a value',
      },
      key: { type: 'string', description: 'Key to read or write' },
      value: { type: 'string', description: 'Value to store (required for action=set)' },
    },
    required: ['action', 'key'],
  },
  async execute(args, ctx: ToolContext) {
    if (args.action === 'set') {
      if (args.value === undefined) {
        return err('value is required when action is "set"', 'input_invalid');
      }
      if (ctx.setContext) {
        ctx.setContext(args.key, args.value);
      } else {
        fallbackStore.set(args.key, args.value);
      }
      return ok(`Stored "${args.key}" = "${args.value}"`);
    }

    // action === 'get'
    const stored = ctx.getContext ? ctx.getContext<string>(args.key) : fallbackStore.get(args.key);
    if (stored === undefined) {
      return ok(`No value found for key "${args.key}"`);
    }
    return ok(stored);
  },
});
