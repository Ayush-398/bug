import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/ingest/client';
export const appRouter = createTRPCRouter({
  invoke: baseProcedure
  .input(
    z.object({
       value : z.string(),
    })
  )
  .mutation(async ({input}) =>{
    await inngest.send({
      name: "test/helloworld",
      data:{ 
        value: input.value,
      }
    })
  }),
  createAI: baseProcedure
    .input(
      z.object({
        text: z.number,
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;