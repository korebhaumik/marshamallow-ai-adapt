import { OpenAIChat } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { Message, LangChainStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
	const request = await req.json();
	let { messages, promptCount }: { messages: Message[]; promptCount: number } = request;

	console.log(messages);

	const userMessage: Message = messages.at(-1)!;

	if (userMessage.role === "system") return new Response("");

	const { handlers, stream } = LangChainStream();

	const llm = new OpenAIChat({
		streaming: true,
		openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
		modelName: "gpt-4o-mini",
		prefixMessages: messages as any,
	});

	const oneInputPrompt = new PromptTemplate({
		inputVariables: ["query"],
		template: `You are a helpful chat assistant, and only respond to the current query and use the past messages in the sequence of the conversations as contexts`,
	});

	const formattedPrompt = await oneInputPrompt.format({
		query: userMessage.content as string,
	});

	llm.call(formattedPrompt, {}, [handlers]).catch(console.error);

	return new StreamingTextResponse(stream);
}
