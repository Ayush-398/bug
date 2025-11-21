"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-hot-toast";  // Add this import - or use your toast library

const Page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const {data: messages} = useQuery(trpc.messages.getMany.queryOptions())
  
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("message created");
        setValue("");  
      },
      onError: (error) => {
        toast.error("Failed to create message");
        console.error(error);
      },
    })
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your message"
      />
      <Button 
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({ value: value })}  // Fixed: was "Invoke"
      >
        {createMessage.isPending ? "Sending..." : "Invoke"}
      </Button>
     
    </div>
  );
};

export default Page;