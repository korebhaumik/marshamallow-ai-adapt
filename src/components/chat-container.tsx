"use client";
// @ts-ignore
import { useChat, type Message } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chat-message";
import EmptyMessage from "./chat-description";
import ChatInput from "./chat-input";
import { Renderable, Toast, toast, ValueFunction } from "react-hot-toast";
// import { useAuth } from "@/context/supabase-auth-provider";

type Props = {
	currentAssistant: string;
};

export default function MessageSection({ currentAssistant }: Props) {
	// const { promptCount } = useAuth();
	const [systemMessages, setSystemMessages] = useState<Message[]>([]);
	const { messages, setInput, append, input, isLoading, setMessages, reload } = useChat({
		body: {
			promptCount: 10,
		},
		// api: "/api/chat",
		api:
			currentAssistant === "Restro AI Assistant"
				? `${process.env.NEXT_PUBLIC_SERVER_URL}/chatrestaurant`
				: `${process.env.NEXT_PUBLIC_SERVER_URL}/chatdoctor`,
		onResponse(response: {
			status: number;
			statusText: Renderable | ValueFunction<Renderable, Toast>;
		}) {
			if (response.status === 401) {
				toast.error(response.statusText);
			}
		},
	});
	const bottomRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (messages.length === 0) return;
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	return (
		<div className="pb-[160px] pt-4 md:pt-8">
			<div className="relative mx-auto max-w-2xl px-4">
				{messages.map((message: Message, index: number) => (
					<>
						<div key={index}>
							<ChatMessage
								key={index}
								message={message}
								isLoading={isLoading}
								isLast={messages.length - 1 == index}
							/>
							{index < messages.length - 1 && <hr className="border-stone-200" />}
						</div>
					</>
				))}
				{isLoading && (
					<div className="flex">
						<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-stone-500"></div>
						<p className=" ml-2">Thinking...</p>
					</div>
				)}
				{messages.length === 0 && <EmptyMessage currentAssistant={currentAssistant} />}
			</div>
			<div ref={bottomRef} className="" />

			<button></button>
			<ChatInput
				append={append}
				messages={messages}
				input={input}
				setInput={setInput}
				isLoading={isLoading}
				setMessages={setMessages}
				systemMessages={systemMessages}
				setSystemMessages={setSystemMessages}
				reload={reload}
			/>
		</div>
	);
}
