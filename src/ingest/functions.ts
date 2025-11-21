import { inngest } from "./client";
import { gemini, createAgent, createTool } from "@inngest/agent-kit";
import  getSandbox  from "./utils";
import { z } from "zod";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/helloworld" },
  async ({ event, step }) => {
    const sandboxId = "your-sandbox-id"; 
    
    const summarizer = createAgent({
      name: "Text Summarizer",
      system: "You are an expert at summarizing text concisely.",
      model: gemini({ model: "gemini-1.5-flash" }),
      tools: [
        createTool({
          name: "terminal",
          description: "use the terminal to run commands",
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command }, { step }) => {
            return await step?.run("terminal", async () => {
              const buffers = { stdout: "", stderr: "" };
              try {
                const Sandbox = await getSandbox(sandboxId);
                const result = await Sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data: string) => {
                    buffers.stderr += data;
                  }
                });
                return result.stdout || buffers.stdout;
              } catch (e) {
                console.error(
                  `Command failed: ${e}\nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}`
                );
                return `Command failed: ${e}\nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}`;
              }
            });
          }
        })
      ]
    });
     
    const { output } = await summarizer.run(
      `Summarize the following text: ${event.data.value}`
    );
    
    console.log("Summary:", output);
   
    return { 
      message: `Hello ${event.data.value}!`,
      summary: output 
    };
  }
);