"use client";

import Image from "next/image";
import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/browser";
import { useTRPC } from "@/trpc/client";
const Page =  () =>{

 const trpc = useTRPC();
 trpc.createAI.queryOptions({text:"Hello"});
  return(
    <div>
      Hello world
    </div>
  );
}


export default Page;
