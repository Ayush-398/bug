"use client";
import {Button} from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import {Input} from "@/components/ui/input";
import {useState} from "react";
const Page =  () =>{
  const [value,setValue] = useState("");
    const trpc = useTRPC();
    const Invoke = useMutation(trpc.invoke.mutationOptions({}));


    
  return(
          <div className="p-4 max-w-7xl mx-auto">
            <input   value = {value} onChange={(e)=> setValue(e.target.value)}/>
           <Button disabled ={Invoke.isPending} onClick={()=> Invoke.mutate({value: value})}>
            Invoke
           </Button>
          </div>
  );
}


export default Page;
