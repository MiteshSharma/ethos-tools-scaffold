import type { EthosPlugin, EthosPluginApi, Tool } from '@ethosagent/plugin-sdk';
import { timingFilter } from './filters/log-filter';
import { approvedTool } from './tools/approved';
import { cachedTool } from './tools/cached';
import { contextTool } from './tools/context';
import { directTool } from './tools/direct';
import { helloTool } from './tools/hello';

export const plugin: EthosPlugin = {
  activate(api: EthosPluginApi) {
    api.registerTool(helloTool as Tool);
    api.registerTool(approvedTool as Tool);
    api.registerTool(cachedTool as Tool);
    api.registerTool(directTool as Tool);
    api.registerTool(contextTool as Tool);
    api.registerToolFilter(timingFilter);
  },
};
