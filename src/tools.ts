type ToolResult = { ok: true; value: string } | { ok: false; error: string; code: string };

interface ToolContext {
  abortSignal?: AbortSignal;
  secretsResolver?: { get(ref: string): Promise<string | null> };
  scopedFetch?: { fetch(url: string, init?: RequestInit): Promise<Response> };
  emit?: (event: {
    type: 'progress';
    toolName: string;
    message: string;
    audience?: 'user' | 'internal';
    percent?: number;
  }) => void;
}

interface Tool<TArgs = Record<string, unknown>> {
  name: string;
  description: string;
  toolset: string;
  maxResultChars?: number;
  outputIsUntrusted?: boolean;
  capabilities?: {
    network?: { allowedHosts: string[] };
    secrets?: string[];
    fs?: { read?: string[]; write?: string[] };
  };
  isAvailable?(): boolean;
  schema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  execute(args: TArgs, ctx: ToolContext): Promise<ToolResult>;
}

interface HelloArgs {
  name?: string;
}

const scaffoldHello: Tool<HelloArgs> = {
  name: 'scaffold_hello',
  description: 'Example tool — returns a greeting. Delete this and add real tools.',
  toolset: 'scaffold',
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Name to greet (default: "world")' },
    },
  },
  async execute(args: HelloArgs): Promise<ToolResult> {
    const name = args.name ?? 'world';
    return { ok: true, value: `Hello, ${name}!` };
  },
};

export function createTools(): Tool[] {
  return [scaffoldHello];
}
