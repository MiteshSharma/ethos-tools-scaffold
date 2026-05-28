// Minimal type declarations for @ethosagent/core used by this scaffold's tests.
// Generated from the real package at packages/core/src/ — keep in sync.

declare module '@ethosagent/core' {
  import type { ToolRegistry, HookRegistry, PersonalityRegistry, LLMProviderRegistry, MemoryProviderRegistry } from '@ethosagent/types';

  export class DefaultToolRegistry implements ToolRegistry {
    register(tool: import('@ethosagent/types').Tool, opts?: { pluginId?: string }): void;
    registerAll(tools: import('@ethosagent/types').Tool[]): void;
    unregister(name: string): void;
    get(name: string): import('@ethosagent/types').Tool | undefined;
    getAvailable(): import('@ethosagent/types').Tool[];
    getForToolset(toolset: string): import('@ethosagent/types').Tool[];
    executeParallel(...args: unknown[]): Promise<unknown>;
    toDefinitions(...args: unknown[]): unknown[];
  }

  export class DefaultHookRegistry implements HookRegistry {
    registerVoid(name: string, handler: (...args: unknown[]) => Promise<void>, opts?: { pluginId?: string }): void;
    registerModifying(name: string, handler: (...args: unknown[]) => Promise<unknown>, opts?: { pluginId?: string }): void;
    fireVoid(name: string, payload: unknown, pluginIds?: string[]): Promise<void>;
    unregisterPlugin(pluginId: string): void;
  }

  export class DefaultPersonalityRegistry implements PersonalityRegistry {
    define(config: import('@ethosagent/types').PersonalityConfig): void;
  }

  export class DefaultLLMProviderRegistry implements LLMProviderRegistry {
    register(name: string, factory: unknown): void;
    get(name: string): unknown;
  }

  export class DefaultMemoryProviderRegistry implements MemoryProviderRegistry {
    register(name: string, factory: unknown): void;
    get(name: string): unknown;
  }
}
