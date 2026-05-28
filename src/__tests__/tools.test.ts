import type { ToolContext } from '@ethosagent/types';
import { describe, expect, it } from 'vitest';
import { approvedTool } from '../tools/approved';
import { cachedTool } from '../tools/cached';
import { contextTool } from '../tools/context';
import { directTool } from '../tools/direct';
import { helloTool } from '../tools/hello';

function makeCtx(overrides?: Partial<ToolContext>): ToolContext {
  return {
    sessionId: 'test-session',
    sessionKey: 'cli:test',
    platform: 'cli',
    workingDir: '/tmp',
    currentTurn: 1,
    messageCount: 1,
    abortSignal: new AbortController().signal,
    emit: () => {},
    resultBudgetChars: 80_000,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// hello tool
// ---------------------------------------------------------------------------

describe('scaffold_hello', () => {
  it('returns greeting with provided name', async () => {
    const result = await helloTool.execute({ name: 'Alice' }, makeCtx());
    expect(result).toEqual({ ok: true, value: 'Hello, Alice!' });
  });

  it('uses default name when none provided', async () => {
    const result = await helloTool.execute({}, makeCtx());
    expect(result).toEqual({ ok: true, value: 'Hello, world!' });
  });

  it('returns error for empty name', async () => {
    const result = await helloTool.execute({ name: '  ' }, makeCtx());
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('input_invalid');
    }
  });
});

// ---------------------------------------------------------------------------
// approved tool
// ---------------------------------------------------------------------------

describe('scaffold_approved', () => {
  it('has requiresApproval set', () => {
    expect(approvedTool.requiresApproval).toBe(true);
  });

  it('executes with target', async () => {
    const result = await approvedTool.execute({ target: 'production' }, makeCtx());
    expect(result).toEqual({
      ok: true,
      value: 'Dangerous operation completed on: production',
    });
  });
});

// ---------------------------------------------------------------------------
// cached tool
// ---------------------------------------------------------------------------

describe('scaffold_cached', () => {
  it('has cache option set', () => {
    expect(cachedTool.cache).toEqual({ ttlMs: 60_000 });
  });

  it('has outputSchema defined', () => {
    expect(cachedTool.outputSchema).toBeDefined();
  });

  it('returns JSON with results', async () => {
    const result = await cachedTool.execute({ query: 'test' }, makeCtx());
    expect(result.ok).toBe(true);
    if (result.ok) {
      const parsed = JSON.parse(result.value);
      expect(parsed.results).toBeInstanceOf(Array);
      expect(parsed.cachedAt).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// direct tool
// ---------------------------------------------------------------------------

describe('scaffold_direct', () => {
  it('has returnDirect set', () => {
    expect(directTool.returnDirect).toBe(true);
  });

  it('returns the message directly', async () => {
    const result = await directTool.execute({ message: 'hi there' }, makeCtx());
    expect(result).toEqual({ ok: true, value: 'hi there' });
  });
});

// ---------------------------------------------------------------------------
// context tool
// ---------------------------------------------------------------------------

describe('scaffold_context', () => {
  it('stores and retrieves via getContext/setContext', async () => {
    const store = new Map<string, unknown>();
    const ctx = makeCtx({
      getContext: <T>(key: string) => store.get(key) as T | undefined,
      setContext: <T>(key: string, value: T) => {
        store.set(key, value);
      },
    });

    const setResult = await contextTool.execute(
      { action: 'set', key: 'color', value: 'blue' },
      ctx,
    );
    expect(setResult.ok).toBe(true);

    const getResult = await contextTool.execute({ action: 'get', key: 'color' }, ctx);
    expect(getResult).toEqual({ ok: true, value: 'blue' });
  });

  it('returns "no value" for missing key', async () => {
    const ctx = makeCtx({
      getContext: () => undefined,
      setContext: () => {},
    });
    const result = await contextTool.execute({ action: 'get', key: 'missing' }, ctx);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain('No value found');
    }
  });

  it('returns error when setting without value', async () => {
    const result = await contextTool.execute({ action: 'set', key: 'x' }, makeCtx());
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('input_invalid');
    }
  });

  it('falls back to module-level store when ctx lacks getContext/setContext', async () => {
    const ctx = makeCtx();

    await contextTool.execute({ action: 'set', key: 'fallback-key', value: 'val' }, ctx);
    const result = await contextTool.execute({ action: 'get', key: 'fallback-key' }, ctx);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe('val');
    }
  });
});
