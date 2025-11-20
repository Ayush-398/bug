
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/browser";
import { useTRPC } from "@/trpc/client";
import { json } from "zod";
import {trpc, getQueryClient} from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
const Page = async () =>{

const queryClient = getQueryClient();
void queryClient.prefetchQuery(trpc.createAI.queryOptions({text:"Hello world"}));
  return(
    <HydrationBoundary state = {dehydrate(queryClient())}>
    <div>
     
    </div>
    </HydrationBoundary>
  );
}


export default Page;
