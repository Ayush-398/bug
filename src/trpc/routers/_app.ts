import { createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/procedures';
import { fragmentsRouter } from '@/modules/fragments/procedures';  // Add this import
import { projectsRouter } from '@/modules/projects/server/procedures';

export const appRouter = createTRPCRouter({
  messages: messagesRouter,
  projects: projectsRouter,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;