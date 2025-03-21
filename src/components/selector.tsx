import React from "react";
import SuggestedActions from "./suggested-actions";

type AgentOptions = "Restro AI Assistant" | "Doctor's AI Assistant" | null;

export default function Selector({
	currentAssistant,
	setCurrentAssistant,
}: {
	currentAssistant: AgentOptions;
	setCurrentAssistant: any;
}) {
	return (
		<div className="max-w-3xl mx-auto">
			<p className="flex my-5 flex-row justify-center gap-4 items-center">
				<svg height="32" strokeLinejoin="round" viewBox="0 0 16 16" width="32">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8 1L16 15H0L8 1Z"
						fill="currentColor"
					></path>
				</svg>
				<span>+</span>
				<svg height="32" strokeLinejoin="round" viewBox="0 0 16 16" width="32">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M2.8914 10.4028L2.98327 10.6318C3.22909 11.2445 3.5 12.1045 3.5 13C3.5 13.3588 3.4564 13.7131 3.38773 14.0495C3.69637 13.9446 4.01409 13.8159 4.32918 13.6584C4.87888 13.3835 5.33961 13.0611 5.70994 12.7521L6.22471 12.3226L6.88809 12.4196C7.24851 12.4724 7.61994 12.5 8 12.5C11.7843 12.5 14.5 9.85569 14.5 7C14.5 4.14431 11.7843 1.5 8 1.5C4.21574 1.5 1.5 4.14431 1.5 7C1.5 8.18175 1.94229 9.29322 2.73103 10.2153L2.8914 10.4028ZM2.8135 15.7653C1.76096 16 1 16 1 16C1 16 1.43322 15.3097 1.72937 14.4367C1.88317 13.9834 2 13.4808 2 13C2 12.3826 1.80733 11.7292 1.59114 11.1903C0.591845 10.0221 0 8.57152 0 7C0 3.13401 3.58172 0 8 0C12.4183 0 16 3.13401 16 7C16 10.866 12.4183 14 8 14C7.54721 14 7.10321 13.9671 6.67094 13.9038C6.22579 14.2753 5.66881 14.6656 5 15C4.23366 15.3832 3.46733 15.6195 2.8135 15.7653Z"
						fill="currentColor"
					></path>
				</svg>
			</p>
			{/* <p className="prose my-2 mx-auto text-center">
				This is an
				<a
					className="font-medium underline mx-2 underline-offset-4"
					target="_blank"
					href="https://github.com/vercel/ai-chatbot"
				>
					open source
				</a>
				chatbot template built with Next.js and the AI SDK by Vercel. It uses the
				<code className="rounded-md bg-muted px-1 py-0.5">streamText</code> function in the server
				and the
				<code className="rounded-md bg-muted px-1 py-0.5">useChat</code> hook on the client to
				create a seamless chat experience.
			</p> */}
			<p className="prose my-2 mx-auto text-center">
				A GenAI solution that addresses fragmented systems for restaurants and clinics by offering a
				unified, intelligent system. Key technologies include
				<a
					className="font-medium underline mx-2 underline-offset-4"
					target="_blank"
					href="https://www.ontotext.com/knowledgehub/fundamentals/what-is-graph-rag/"
				>
					Graph-based Retrieval Augment Systems (RAG)
				</a>
				.
				<span className="block my-3">
                <span className="rounded-md px-1 py-0.5 text-black text-base font-semibold underline">AdaptAI</span>, project by team:
					<code className="rounded-md bg-muted px-1 py-0.5">Marshmallow</code>
				</span>
			</p>
			<SuggestedActions setCurrentAssistant={setCurrentAssistant} />
		</div>
	);
}
