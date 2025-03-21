// components/selector-wrapper.tsx
"use client";

import { useState } from "react";
import Selector from "@/components/selector";
import MessageSection from "@/components/chat-container";

export default function SelectorWrapper() {
	type AgentOptions = "Restro AI Assistant" | "Doctor's AI Assistant" | null;
	const [currentAssistant, setCurrentAssistant] = useState<AgentOptions>(null);

	return (
		<>
			{currentAssistant ? (
				<MessageSection currentAssistant={currentAssistant} />
			) : (
				<Selector currentAssistant={currentAssistant} setCurrentAssistant={setCurrentAssistant} />
			)}
		</>
	);
}
