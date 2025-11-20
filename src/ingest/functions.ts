import { inngest } from "./client";
import {openai,createAgent} from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
            
        const summerriser = createAgent({
             name: "summeriser",
             system: "you are a expert summeriser",
             model: openai({model: "gpt-4o"}),
        });
     
      const {output} = await summerriser.run(
        `Summerise the following text:${event.data.value}`,
      );
      console.log(output);
   

    return { message: `Hello ${event.data.value}!` };
  },
);