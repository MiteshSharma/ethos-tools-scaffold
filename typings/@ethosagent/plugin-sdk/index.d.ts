// Minimal type declarations for @ethosagent/plugin-sdk used by this scaffold.
// Generated from the real package at packages/plugin-sdk/src/ — keep in sync.

declare module '@ethosagent/plugin-sdk' {
  import type {
    ContextInjector,
    DiagnosticsEmitter,
    NotifyOptions,
    OAuthConfig,
    PersonalityConfig,
    PluginHealthCheck,
    PluginMonitorDef,
    Tool,
    ToolContext,
    ToolInvocationFilter,
    ToolRegistry,
    HookRegistry,
    PersonalityRegistry,
    LLMProviderRegistry,
    MemoryProviderRegistry,
  } from '@ethosagent/types';

  export interface EthosPlugin {
    activate(api: EthosPluginApi): void | Promise<void>;
    deactivate?(): void | Promise<void>;
  }

  export interface EthosPluginApi {
    readonly pluginId: string;
    registerTool(tool: Tool): void;
    registerVoidHook(name: string, handler: (payload: unknown) => Promise<void>): void;
    registerModifyingHook(name: string, handler: (payload: unknown) => Promise<unknown>): void;
    registerInjector(injector: ContextInjector): void;
    registerPersonality(config: PersonalityConfig): void;
    registerContextEngine(engine: unknown): void;
    registerLLMProvider(name: string, factory: unknown): void;
    registerMemoryProvider(name: string, factory: unknown): void;
    registerPlatformAdapter(name: string, factory: unknown): void;
    hasSecret(key: string): boolean;
    getSecret(key: string): Promise<string | null>;
    setSecret(key: string, value: string): Promise<void>;
    onCredentialUpdate(handler: (key: string) => void | Promise<void>): () => void;
    registerToolFilter(filter: ToolInvocationFilter): void;
    registerEvaluator(evaluator: unknown): void;
    registerRoute(opts: { method?: string; path: string; handler: (req: unknown) => Promise<unknown> }): void;
    emit(event: string, payload: unknown): void;
    on(event: string, handler: (payload: unknown) => void): () => void;
    registerOAuth(config: OAuthConfig): void;
    getBaseUrl(): string | undefined;
    registerMonitor(def: PluginMonitorDef): void;
    startMonitor(name: string, params?: Record<string, unknown>): void;
    stopMonitor(name: string): void;
    notify(opts: NotifyOptions): Promise<void>;
    registerHealthCheck(check: PluginHealthCheck): void;
    readonly diagnostics: DiagnosticsEmitter;
  }

  export interface PluginRegistries {
    tools: ToolRegistry;
    hooks: HookRegistry;
    injectors: ContextInjector[];
    injectorPluginIds: Map<ContextInjector, string>;
    personalities: PersonalityRegistry;
    llmProviders: LLMProviderRegistry;
    memoryProviders: MemoryProviderRegistry;
    filters?: ToolInvocationFilter[];
    evaluators?: unknown[];
    routes?: unknown[];
    eventBus?: unknown;
    oauthCoordinator?: unknown;
    baseUrl?: string;
    notificationRouter?: unknown;
    diagnostics?: unknown;
    llmFactory?: unknown;
  }

  export class PluginApiImpl implements EthosPluginApi {
    readonly pluginId: string;
    constructor(
      pluginId: string,
      registries: PluginRegistries,
      credentialOpts?: { storage: unknown; basePath: string },
    );
    registerTool(tool: Tool): void;
    registerVoidHook(name: string, handler: (payload: unknown) => Promise<void>): void;
    registerModifyingHook(name: string, handler: (payload: unknown) => Promise<unknown>): void;
    registerInjector(injector: ContextInjector): void;
    registerPersonality(config: PersonalityConfig): void;
    registerContextEngine(engine: unknown): void;
    registerLLMProvider(name: string, factory: unknown): void;
    registerMemoryProvider(name: string, factory: unknown): void;
    registerPlatformAdapter(name: string, factory: unknown): void;
    hasSecret(key: string): boolean;
    getSecret(key: string): Promise<string | null>;
    setSecret(key: string, value: string): Promise<void>;
    onCredentialUpdate(handler: (key: string) => void | Promise<void>): () => void;
    registerToolFilter(filter: ToolInvocationFilter): void;
    registerEvaluator(evaluator: unknown): void;
    registerRoute(opts: { method?: string; path: string; handler: (req: unknown) => Promise<unknown> }): void;
    emit(event: string, payload: unknown): void;
    on(event: string, handler: (payload: unknown) => void): () => void;
    registerOAuth(config: OAuthConfig): void;
    getBaseUrl(): string | undefined;
    registerMonitor(def: PluginMonitorDef): void;
    startMonitor(name: string, params?: Record<string, unknown>): void;
    stopMonitor(name: string): void;
    notify(opts: NotifyOptions): Promise<void>;
    registerHealthCheck(check: PluginHealthCheck): void;
    readonly diagnostics: DiagnosticsEmitter;
    cleanup(): void;
  }

  // Re-exports from @ethosagent/types
  export type {
    ContextInjector,
    DiagnosticsEmitter,
    NotifyOptions,
    OAuthConfig,
    PersonalityConfig,
    PluginHealthCheck,
    PluginMonitorDef,
    Tool,
    ToolContext,
    ToolInvocationFilter,
    ToolResult,
  } from '@ethosagent/types';
}

declare module '@ethosagent/plugin-sdk/tool-helpers' {
  import type { Tool, ToolContext, ToolResult, CacheOptions } from '@ethosagent/types';

  export function ok(value: string): ToolResult;
  export function err(error: string, code?: 'input_invalid' | 'not_available' | 'execution_failed'): ToolResult;

  export interface ToolDefinition<TArgs = unknown> {
    name: string;
    description: string;
    schema: Record<string, unknown>;
    toolset?: string;
    maxResultChars?: number;
    capabilities?: Record<string, unknown>;
    isAvailable?: () => boolean;
    requiresApproval?: boolean;
    returnDirect?: boolean;
    outputSchema?: Record<string, unknown>;
    cache?: boolean | CacheOptions;
    preferredModel?: string;
    strict?: boolean;
    execute: (args: TArgs, ctx: ToolContext) => Promise<ToolResult>;
  }

  export function defineTool<TArgs = unknown>(def: ToolDefinition<TArgs>): Tool<TArgs>;
  export function needsApproval<TArgs>(def: ToolDefinition<TArgs>): ToolDefinition<TArgs>;
  export function withCache<TArgs>(def: ToolDefinition<TArgs>, opts?: CacheOptions): ToolDefinition<TArgs>;
  export function withReturnDirect<TArgs>(def: ToolDefinition<TArgs>): ToolDefinition<TArgs>;
}

declare module '@ethosagent/plugin-sdk/testing' {
  export function mockLLM(responses: string[]): unknown;
  export function mockTool(name: string, result: unknown): import('@ethosagent/types').Tool;
  export function createTestRuntime(config: unknown): unknown;
}
