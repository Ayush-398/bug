import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";  
import { prisma } from "@/lib/db";  
import { inngest } from "@/ingest/client";  

export const messagesRouter = createTRPCRouter({
    getMany: baseProcedure
    .query(async () =>{
        const messages = await prisma.message.findMany({
            orderBy: {
                updateAt: "asc",

            },
        });
        return messages;
    }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "message is required" }),  
      }),
    )
    .mutation(async ({ input }) => {
      const createdMessage = await prisma.message.create({
        data: {
          content: input.value,
          role: "USER",  
          type: "RESULT",
        },
      }); 

      await inngest.send({
        name: "test/hello.world",
        data: {
          value: input.value,
        },
      });

      return createdMessage;
    }),
});