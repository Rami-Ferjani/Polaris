import { generateText } from "ai";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { firecrawl } from "@/lib/firecrawl";
import { boolean } from "zod/v4";
const GOOGLE_GEMINI_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const URL_REGEX = /https?:\/\/[^\s]+/g;
if (!GOOGLE_GEMINI_KEY) {
  throw new Error(
    "GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set",
  );
}

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_GEMINI_KEY,
});
export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string };
    const urls = (await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) ?? [];
    })) as string[];
    const scrapedContent = await step.run("scrape-urls", async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const result = await firecrawl.scrape(url, { formats: ["markdown"] });
          return result.markdown ?? null;
        }),
      );
      return results.filter(Boolean).join("\n\n");
    });
    const finalPrompt = scrapedContent
      ? `Context:\n${scrapedContent}\n\nQuestion : ${prompt}`
      : prompt;
    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash"),
        prompt: finalPrompt,
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
