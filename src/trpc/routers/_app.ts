import { createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/procedures';
import { fragmentsRouter } from '@/modules/fragments/procedures';  // Add this import

export const appRouter = createTRPCRouter({
  messages: messagesRouter
  
});

// export type definition of API
export type AppRouter = typeof appRouter;