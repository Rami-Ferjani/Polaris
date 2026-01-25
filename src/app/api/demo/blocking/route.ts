//localhost:3000/api/demo/blocking
// import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
const GOOGLE_GEMINI_KEY = process.env.GOOGLE_GEMINI_KEY;
const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_GEMINI_KEY,
});
export async function POST() {
  const response = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: "Write a vegetarian lasagna recipe for 4 people",
  });
  return Response.json({ response });
}
