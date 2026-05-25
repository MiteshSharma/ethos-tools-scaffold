import { describe, expect, it } from 'vitest';
import { createTools } from '../index';

describe('createTools', () => {
  it('returns a non-empty array', () => {
    const tools = createTools();
    expect(tools.length).toBeGreaterThan(0);
  });

  it('each tool has required fields', () => {
    const tools = createTools();
    for (const tool of tools) {
      expect(tool.name).toBeDefined();
      expect(typeof tool.name).toBe('string');
      expect(tool.description).toBeDefined();
      expect(typeof tool.description).toBe('string');
      expect(tool.execute).toBeDefined();
      expect(typeof tool.execute).toBe('function');
      expect(tool.schema).toBeDefined();
      expect(tool.schema.type).toBe('object');
    }
  });

  it('scaffold_hello returns a greeting', async () => {
    const tools = createTools();
    const hello = tools.find((t) => t.name === 'scaffold_hello');
    expect(hello).toBeDefined();

    const result = await hello?.execute({ name: 'test' }, {});
    expect(result).toEqual({ ok: true, value: 'Hello, test!' });
  });

  it('scaffold_hello uses default name', async () => {
    const tools = createTools();
    const hello = tools.find((t) => t.name === 'scaffold_hello');

    const result = await hello?.execute({}, {});
    expect(result).toEqual({ ok: true, value: 'Hello, world!' });
  });
});
