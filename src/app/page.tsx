"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-hot-toast";  
import { error } from "node:console";

const Page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const {data: messages} = useQuery(trpc.messages.getMany.queryOptions())
  
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
       onError:(error) =>{
        toast.error(error.message);
       },
    })
  );

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your message"
      />
      <Button 
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({ value: value })}  
      >
        {createMessage.isPending ? "Sending..." : "Invoke"}
      </Button>
     
    </div>
  );
};

export default Page;