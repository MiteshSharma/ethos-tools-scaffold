import {
  DefaultHookRegistry,
  DefaultLLMProviderRegistry,
  DefaultMemoryProviderRegistry,
  DefaultPersonalityRegistry,
  DefaultToolRegistry,
} from '@ethosagent/core';
import type { PluginRegistries } from '@ethosagent/plugin-sdk';
import { PluginApiImpl } from '@ethosagent/plugin-sdk';
import { describe, expect, it } from 'vitest';
import { plugin } from '../index';

function makeRegistries(): PluginRegistries {
  return {
    tools: new DefaultToolRegistry(),
    hooks: new DefaultHookRegistry(),
    injectors: [],
    injectorPluginIds: new Map(),
    personalities: new DefaultPersonalityRegistry(),
    llmProviders: new DefaultLLMProviderRegistry(),
    memoryProviders: new DefaultMemoryProviderRegistry(),
    filters: [],
    evaluators: [],
  };
}

describe('plugin.activate', () => {
  it('registers all five tools', () => {
    const registries = makeRegistries();
    const api = new PluginApiImpl('ethos-tools-scaffold', registries);

    plugin.activate(api);

    const names = registries.tools.getAvailable().map((t) => t.name);
    expect(names).toContain('scaffold_hello');
    expect(names).toContain('scaffold_approved');
    expect(names).toContain('scaffold_cached');
    expect(names).toContain('scaffold_direct');
    expect(names).toContain('scaffold_context');
  });

  it('registers the timing filter', () => {
    const registries = makeRegistries();
    const api = new PluginApiImpl('ethos-tools-scaffold', registries);

    plugin.activate(api);

    expect(registries.filters?.length).toBe(1);
  });

  it('registered tools are executable', async () => {
    const registries = makeRegistries();
    const api = new PluginApiImpl('ethos-tools-scaffold', registries);

    plugin.activate(api);

    const hello = registries.tools.get('scaffold_hello');
    expect(hello).toBeDefined();

    const ctx = {
      sessionId: 'test',
      sessionKey: 'cli:test',
      platform: 'cli',
      workingDir: '/tmp',
      currentTurn: 1,
      messageCount: 1,
      abortSignal: new AbortController().signal,
      emit: () => {},
      resultBudgetChars: 80_000,
    };

    const result = await hello?.execute({ name: 'Plugin' }, ctx);
    expect(result).toEqual({ ok: true, value: 'Hello, Plugin!' });
  });
});
