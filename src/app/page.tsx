import Image from "next/image";
import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/browser";

const Page = async () =>{
  const posts = await prisma.post.findMany();

  return(
    <div>
      {JSON.stringify(posts,null,2)}
    </div>
  );
}


export default Page;
