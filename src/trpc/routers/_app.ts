import { createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/procedures';
import { projectsRouter } from '@/modules/projects/server/procedures';
import { usageRouter } from '@/modules/usage/server/procedure';

export const appRouter = createTRPCRouter({
  messages: messagesRouter,
  projects: projectsRouter,
  usage: usageRouter,
});

export type AppRouter = typeof appRouter;