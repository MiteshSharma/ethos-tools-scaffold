# Scaffold Tools

This skill demonstrates the five tool patterns provided by the ethos-tools-scaffold plugin.

## Tools

- **scaffold_hello** -- Greet someone by name. Try: `scaffold_hello { "name": "Alice" }`
- **scaffold_approved** -- Run a dangerous operation (requires approval). Try: `scaffold_approved { "target": "production" }`
- **scaffold_cached** -- Search with cached results (60s TTL). Try: `scaffold_cached { "query": "example" }`
- **scaffold_direct** -- Send a message directly to the user, skipping LLM synthesis. Try: `scaffold_direct { "message": "Hello from direct!" }`
- **scaffold_context** -- Store and retrieve cross-tool state. Try: `scaffold_context { "action": "set", "key": "color", "value": "blue" }` then `scaffold_context { "action": "get", "key": "color" }`

## Usage

Use these tools as reference implementations when building your own Ethos plugin. Each tool demonstrates a different pattern from the `@ethosagent/plugin-sdk`:

1. **defineTool + ok/err** -- Type-safe tool definition with result shorthands
2. **needsApproval** -- Mark a tool as requiring user confirmation
3. **withCache** -- Enable result caching with a TTL
4. **withReturnDirect** -- Skip LLM synthesis for the tool's output
5. **getContext/setContext** -- Share state between tools within a session
