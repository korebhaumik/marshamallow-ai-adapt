import React from "react";

type Props = {
	currentAssistant: string;
};

export default function EmptyMessage({ currentAssistant }: Props) {
	return (
		<>
			{currentAssistant === "Restro AI Assistant" ? (
				<div className="px-8 py-9 border rounded-xl border-stone-200 shadow-md ">
					<h1 className="text-lg">Welcome to Restaurant AI Assistant!</h1>
					<p className="pt-3 text-zinc-500">
						Explore our menu and get personalized dining assistance with our Restaurant AI
						Assistant. It's designed to help you find dishes, create meal combos, and answer
						questions about our offerings based on your dietary preferences and requirements.
					</p>
					<p className="pt-3 text-zinc-500">
						You can start a conversation here or try the following examples:
					</p>
					<ul className="pt-3 text-zinc-700">
						<li className="flex cursor-pointer hover:underline underline-offset-4">
							<RightArrowSVG />
							<span className="ml-2 w-fit">
								What dishes do you offer that are vegetarian, gluten-free?
							</span>
						</li>
						<li className="flex mt-2 cursor-pointer hover:underline underline-offset-4">
							<RightArrowSVG />
							<span className="ml-2 w-fit">
								Can you recommend a meal combo based on my preferences?
							</span>
						</li>
						<li className="flex mt-2 cursor-pointer hover:underline underline-offset-4">
							<RightArrowSVG />
							<span className="ml-2 w-fit">How long will it take for my order to be ready?</span>
						</li>
					</ul>
				</div>
			) : (
				<div className="px-8 py-9 border rounded-xl border-stone-200 shadow-md ">
					<h1 className="text-lg">Welcome to Doctor's AI Assistant!</h1>
					<p className="pt-3 text-zinc-500">
						Our Doctor's AI Assistant is here to help you with your health concerns. You can ask
						questions about symptoms, get information about common ailments, and receive general
						health advice based on your medical history and preferences.
					</p>
					<p className="pt-3 text-zinc-500">
						You can start a conversation here or try the following examples:
					</p>
					<ul className="pt-3 text-zinc-700">
						<li className="flex cursor-pointer hover:underline underline-offset-4">
							<RightArrowSVG />
							<span className="ml-2 w-fit">What are the symptoms of a common cold or flu?</span>
						</li>
						<li className="flex mt-2 cursor-pointer hover:underline underline-offset-4">
							<RightArrowSVG />
							<span className="ml-2 w-fit">How can I relieve a muscle pain?</span>
						</li>
						<li className="flex mt-2 cursor-pointer hover:underline underline-offset-4">
							<RightArrowSVG />
							<span className="ml-2 w-fit">What are the side effects of common medications?</span>
						</li>
					</ul>
				</div>
			)}
		</>
	);
}

function RightArrowSVG() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
			/>
		</svg>
	);
}
