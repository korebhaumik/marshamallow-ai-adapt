"use client";

import { motion } from "framer-motion";

type AgentOptions = "Restro AI Assistant" | "Doctor's AI Assistant";

export default function SuggestedActions({
	setCurrentAssistant,
}: {
	setCurrentAssistant: (assistant: AgentOptions) => void;
}) {
	const suggestedActions = [
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#000000"
					className="h-7 w-7"
				>
					<path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z" />
				</svg>
			),
			title: "Restro AI Assistant",
			label: (
				<ul className="list-disc list-inside space-y-3 mt-2 text-gray-700">
					<li>
						Get menu recommendations based on dietary preferences, allergies, and taste preferences
					</li>
					<li>Discover today's specials, popular dishes, and chef recommendations</li>
					<li>Find information about restaurant hours, reservations, and special events</li>
				</ul>
			),
			action: "What are the advantages of using Next.js?",
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#000000"
					className="h-7 w-7"
				>
					<path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z" />
				</svg>
			),
			title: "Doctor's AI Assistant",
			label: (
				<ul className="list-disc list-inside space-y-3 mt-2 text-gray-700">
					<li>Schedule, reschedule, or cancel appointments with your preferred doctors</li>
					<li>Check insurance coverage and estimate costs for upcoming appointments</li>
					<li>Access medical records, prescription refills, and test results</li>
				</ul>
			),
			action: `Write code to demonstrate djikstra's algorithm`,
		},
	];

	return (
		<div data-testid="suggested-actions" className="grid sm:grid-cols-2 gap-2 w-full">
			{suggestedActions.map((suggestedAction, index) => (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.05 * index }}
					key={`suggested-action-${suggestedAction.title}-${index}`}
					className={index > 1 ? "hidden sm:block" : "block"}
				>
					<button
						onClick={() => {
							setCurrentAssistant(suggestedAction.title as AgentOptions);
						}}
						className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-3 sm:flex-col w-full h-auto justify-start items-start hover:outline hover:outline-2 black  transition"
					>
						{suggestedAction.icon}
						<p className="font-medium text mt-2">{suggestedAction.title}</p>
						<div className="text-black/75">{suggestedAction.label}</div>
					</button>
				</motion.div>
			))}
		</div>
	);
}
