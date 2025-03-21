import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Message } from "ai";
import { cookies } from "next/headers";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const request = await req.json();
  let { messages, promptCount }: { messages: Message[]; promptCount: number } =
    request;

  console.log(messages);

  if (promptCount === 0)
    return new Response(
      "Oops! It looks like you've reached the limit for the number of prompts. We appreciate your enthusiasm, but there is a maximum number of prompts allowed. To extend your prompts limit, you can try purchasing **GPT-Plus.**",
      { status: 200 }
    );

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages as any,
    temperature: 0.5,
    stream: true,
  });

  const stream = OpenAIStream(response, {
    onStart: async () => {
      console.log("Started");
    },
  });
  return new StreamingTextResponse(stream);
}
