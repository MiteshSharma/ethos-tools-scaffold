import type { ToolInvocationFilter } from '@ethosagent/types';

/**
 * Example ToolInvocationFilter that demonstrates the filter hook.
 *
 * The `before` callback runs before every tool invocation. Returning null
 * lets the call proceed; returning a ToolResult short-circuits execution.
 * The `after` callback runs after execution and can transform the result.
 */
export const timingFilter: ToolInvocationFilter = {
  // No toolName or toolset filter — applies to all tools
  async before(_args, _ctx, _meta) {
    // Return null to allow the invocation to proceed unchanged.
    return null;
  },
  async after(result, _ctx, _meta) {
    // Return the result unchanged — just demonstrating the after hook.
    return result;
  },
};
