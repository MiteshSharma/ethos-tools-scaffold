// Minimal type declarations for @ethosagent/types used by this scaffold.
// Generated from the real package at packages/types/src/ — keep in sync.

declare module '@ethosagent/types' {
  export type ToolResult =
    | { ok: true; value: string; structured?: Record<string, unknown>; cost_usd?: number }
    | { ok: false; error: string; code: 'input_invalid' | 'not_available' | 'execution_failed' | 'STALE_WRITE' };

  export interface ToolProgressEvent {
    type: 'progress';
    toolName: string;
    message: string;
    percent?: number;
    audience?: 'internal' | 'user' | 'dashboard';
  }

  export interface ToolContext {
    sessionId: string;
    sessionKey: string;
    platform: string;
    workingDir: string;
    agentId?: string;
    personalityId?: string;
    memoryScopeId?: string;
    userScopeId?: string;
    teamId?: string;
    currentTurn: number;
    messageCount: number;
    abortSignal: AbortSignal;
    emit: (event: ToolProgressEvent) => void;
    resultBudgetChars: number;
    storage?: unknown;
    readMtimes?: Map<string, { mtimeMs: number; readAtTurn: number }>;
    networkPolicy?: { allow?: string[]; deny?: string[]; allow_private_urls?: boolean };
    kvStore?: unknown;
    secretsResolver?: unknown;
    scopedFetch?: unknown;
    scopedFs?: unknown;
    scopedProcess?: unknown;
    attachments?: unknown;
    dryRun?: boolean;
    getContext?: <T>(key: string) => T | undefined;
    setContext?: <T>(key: string, value: T) => void;
    llm?: unknown;
  }

  export interface CacheOptions {
    ttlMs?: number;
    keyFn?: (args: unknown) => string;
  }

  export interface ToolCapabilities {
    network?: { allowedHosts: string[] };
    secrets?: string[];
    storage?: { scope: string; kind: 'kv'; ttlSecondsDefault?: number };
    fs_reach?: { read?: string[] | 'from-personality'; write?: string[] | 'from-personality' };
    process?: { allowedBinaries: string[] };
    attachments?: { kinds: ('image' | 'file')[] | '*' };
  }

  export interface Tool<TArgs = unknown> {
    name: string;
    description: string;
    schema: Record<string, unknown>;
    toolset?: string;
    maxResultChars?: number;
    capabilities: ToolCapabilities;
    execute: (args: TArgs, ctx: ToolContext) => Promise<ToolResult>;
    isAvailable?: () => boolean;
    alwaysInclude?: boolean;
    outputIsUntrusted?: boolean;
    requiresApproval?: boolean;
    returnDirect?: boolean;
    outputSchema?: Record<string, unknown>;
    cache?: boolean | CacheOptions;
    preferredModel?: string;
    strict?: boolean;
  }

  export interface ToolInvocationFilter {
    toolName?: string | string[];
    toolset?: string;
    before?: (
      args: unknown,
      ctx: ToolContext,
      meta: { toolName: string; toolCallId: string },
    ) => Promise<ToolResult | null>;
    after?: (
      result: ToolResult,
      ctx: ToolContext,
      meta: { toolName: string; toolCallId: string },
    ) => Promise<ToolResult>;
  }

  export interface ToolRegistry {
    register(tool: Tool, opts?: { pluginId?: string }): void;
    registerAll(tools: Tool[]): void;
    unregister(name: string): void;
    get(name: string): Tool | undefined;
    getAvailable(): Tool[];
    getForToolset(toolset: string): Tool[];
    getPluginId?(name: string): string | undefined;
    executeParallel(...args: unknown[]): Promise<unknown>;
    toDefinitions(...args: unknown[]): unknown[];
  }

  export interface ContextInjector {
    id: string;
    priority: number;
    inject(ctx?: unknown): Promise<{ content: string; position: string } | null>;
  }

  export interface HookRegistry {
    registerVoid(name: string, handler: (...args: unknown[]) => Promise<void>, opts?: { pluginId?: string }): void;
    registerModifying(name: string, handler: (...args: unknown[]) => Promise<unknown>, opts?: { pluginId?: string }): void;
    fireVoid(name: string, payload: unknown, pluginIds?: string[]): Promise<void>;
    unregisterPlugin(pluginId: string): void;
  }

  export interface PersonalityConfig {
    id: string;
    [key: string]: unknown;
  }

  export interface PersonalityRegistry {
    define(config: PersonalityConfig): void;
  }

  export interface LLMProviderRegistry {
    register(name: string, factory: unknown): void;
    get(name: string): unknown;
  }

  export interface MemoryProviderRegistry {
    register(name: string, factory: unknown): void;
    get(name: string): unknown;
  }

  // Minimal stubs for types referenced in EthosPluginApi but not directly used by scaffold
  export type VoidHooks = Record<string, unknown>;
  export type ModifyingHooks = Record<string, [unknown, unknown]>;
  export type ContextEngine = unknown;
  export type ContextEngineRegistry = unknown;
  export type LLMProviderFactory = unknown;
  export type MemoryProviderFactory = unknown;
  export type PlatformAdapterFactory = unknown;
  export type OAuthConfig = unknown;
  export type Storage = unknown;
  export type DiagnosticsEmitter = {
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
    metric(name: string, value: number, labels?: Record<string, string>): void;
  };
  export type PostTurnEvaluator = unknown;
  export type PluginHealthCheck = unknown;
  export type PluginMonitorDef = unknown;
  export type NotifyOptions = unknown;
  export type InjectionResult = unknown;
  export type LLMProviderFactoryContext = unknown;
  export type MemoryProviderFactoryContext = unknown;
  export type PromptContext = unknown;
  export type PostTurnEvaluatorPayload = unknown;
}
