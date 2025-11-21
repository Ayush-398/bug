import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/helloworld" },
  async ({ event, step }) => {
    
    const summarizer = createAgent({
      model: gemini({ model: "gemini-1.5-flash" }),
      name: "Text Summarizer",
      system: "You are an expert at summarizing text concisely.",
    });
     
    const { output } = await summarizer.run(
      `Summarize the following text: ${event.data.value}`,
    );
    
    console.log("Summary:", output);
   
    return { 
      message: `Hello ${event.data.value}!`,
      summary: output 
    };
  },
);