import { defineTool, needsApproval, ok } from '@ethosagent/plugin-sdk/tool-helpers';

interface ApprovedArgs {
  target: string;
}

export const approvedTool = defineTool<ApprovedArgs>(
  needsApproval({
    name: 'scaffold_approved',
    description:
      'Simulates a dangerous operation that requires user approval before execution. Demonstrates the needsApproval wrapper.',
    schema: {
      type: 'object',
      properties: {
        target: { type: 'string', description: 'Target of the dangerous operation' },
      },
      required: ['target'],
    },
    async execute(args) {
      return ok(`Dangerous operation completed on: ${args.target}`);
    },
  }),
);
