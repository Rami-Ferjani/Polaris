import { generateText } from "ai";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
const GOOGLE_GEMINI_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_GEMINI_KEY,
});
export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ step }) => {
    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash"),
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
      });
    });
  },
);
// export const demoGenerate = inngest.createFunction(
//   { id: "demo-generate" },
//   { event: "demo/generate" },
//   async ({ step }) => {
//     await step.run("generate-text", async () => {
//       return await generateText({
//         model: anthropic("claude-3-haiku-20240307"),
//         prompt: "Write a vegetarian lasagna recipe for 4 people",
//       });
//     });
//   },
// );
