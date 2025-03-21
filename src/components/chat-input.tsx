import { Message, CreateMessage, ChatRequestOptions } from "ai";
import React, { useRef, useState } from "react";

type Props = {
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions | undefined
	) => Promise<string | null | undefined>;
	input: string;
	setInput: (value: React.SetStateAction<string>) => void;
	setMessages: (messages: Message[]) => void;
	setSystemMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	systemMessages?: Message[];
	messages: Message[];
	isLoading: boolean;
	reload: () => void;
};

export default function ChatInput({
	append,
	setInput,
	isLoading,
	setMessages,
	messages,
	reload,
	input,
}: Props) {
	// const Microphone = dynamic(() => import("./microphone"), { ssr: false });

	const [file, setFile] = useState<File | null>(null);
	const [fileText, setFileText] = useState("");
	// const [temp, setTemp] = useState<string>("");

	const submit = async () => {
		if (!input) return;
		setMessages([
			...messages,
			{
				content: JSON.stringify({ input, file: fileText }),
				role: "user",
				id: "temp",
			},
		]);

		let tempMessageArray = messages.filter((message) => message.id !== "temp");
		// console.log(messages.pop());
		setMessages(tempMessageArray);
		await append({
			// content: `You: ${input}`,
			content: JSON.stringify({ input, file: fileText }),
			role: "user",
		});
		// setTemp("");
		setInput("");
	};

	const regenerate = () => {
		let newItems = [...messages];
		if (newItems.length > 0) {
			newItems[newItems.length - 1].content = "";
		}
		setMessages(newItems);

		setTimeout(async () => {
			let tempMessageArray = messages.filter((message) => message.id !== "temp");
			console.log(messages.pop());
			setMessages(tempMessageArray);
			reload();
		}, 0);
	};

	return (
		<div className="fixed inset-x-0 bottom-0 flex w-full h-[10.5rem] text-black bg-white border-t border-zinc-200">
			{isLoading && (
				<div className="absolute flex -translate-x-1/2 -top-12 left-1/2">
					<button
						onClick={regenerate}
						className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md"
					>
						<RegenSVG />
						<span className="ml-2 text-sm">Regenerate</span>
					</button>
					<button className="flex items-center px-4 py-2 ml-3 bg-white rounded-lg shadow-md">
						<ShareSVG />
						<span className="ml-2 text-sm">Share</span>
					</button>
				</div>
			)}
			{file && (
				<div className="flex absolute top-2 left-1/2 -translate-x-1/2 bg-white items-center justify-between  w-full md:w-[40rem] px-4">
					<p className="text-sm text-zinc-600  underline">{file.name}</p>
					<button
						className="text-sm text-red-400"
						onClick={() => {
							setFile(null);
							setFileText("");
						}}
					>
						Remove
					</button>
				</div>
			)}
			<div className="fixed bottom-0 pb-8 w-full md:w-[40rem] left-1/2 -translate-x-1/2  rounded-t">
				<div className="flex items-center px-4 py-2 mb-5 border rounded-lg shadow-md border-stone-100">
					<TripleDotsSVG />
					<input
						type="text"
						placeholder="i mmm happy to help you, enter your query : )"
						value={input}
						className="w-full px-4 py-2 text-sm border-none rounded-none outline-none placeholder-zinc-500 bg-inherit"
						onChange={(e) => {
							// setTemp(e.target.value);
							setInput(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								submit();
							}
						}}
					/>
					<div className="flex items-center py-2 gap-1 justify-between ">
						<UploadFile setFile={setFile} setFileText={setFileText} />
						<button onClick={submit} disabled={isLoading}>
							<PlaneSVG />
						</button>
					</div>
				</div>
				<p className="mx-auto text-sm text-zinc-500 w-fit">
					Restaurant AI Assistant developed by{" "}
					<span className="underline cursor-pointer text-zinc-400">@team_marshmallow</span>
				</p>
			</div>
		</div>
	);
}

function TripleDotsSVG() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			// width="25"
			// height="25"
			viewBox="0 0 25 25"
			fill="none"
			className="w-7 h-7"
		>
			<path
				d="M9.125 12.5C9.125 12.5995 9.08549 12.6948 9.01517 12.7652C8.94484 12.8355 8.84946 12.875 8.75 12.875C8.65054 12.875 8.55516 12.8355 8.48484 12.7652C8.41451 12.6948 8.375 12.5995 8.375 12.5C8.375 12.4005 8.41451 12.3052 8.48484 12.2348C8.55516 12.1645 8.65054 12.125 8.75 12.125C8.84946 12.125 8.94484 12.1645 9.01517 12.2348C9.08549 12.3052 9.125 12.4005 9.125 12.5ZM9.125 12.5H8.75M12.875 12.5C12.875 12.5995 12.8355 12.6948 12.7652 12.7652C12.6948 12.8355 12.5995 12.875 12.5 12.875C12.4005 12.875 12.3052 12.8355 12.2348 12.7652C12.1645 12.6948 12.125 12.5995 12.125 12.5C12.125 12.4005 12.1645 12.3052 12.2348 12.2348C12.3052 12.1645 12.4005 12.125 12.5 12.125C12.5995 12.125 12.6948 12.1645 12.7652 12.2348C12.8355 12.3052 12.875 12.4005 12.875 12.5ZM12.875 12.5H12.5M16.625 12.5C16.625 12.5995 16.5855 12.6948 16.5152 12.7652C16.4448 12.8355 16.3495 12.875 16.25 12.875C16.1505 12.875 16.0552 12.8355 15.9848 12.7652C15.9145 12.6948 15.875 12.5995 15.875 12.5C15.875 12.4005 15.9145 12.3052 15.9848 12.2348C16.0552 12.1645 16.1505 12.125 16.25 12.125C16.3495 12.125 16.4448 12.1645 16.5152 12.2348C16.5855 12.3052 16.625 12.4005 16.625 12.5ZM16.625 12.5H16.25M21.5 12.5C21.5 13.6819 21.2672 14.8522 20.8149 15.9442C20.3626 17.0361 19.6997 18.0282 18.864 18.864C18.0282 19.6997 17.0361 20.3626 15.9442 20.8149C14.8522 21.2672 13.6819 21.5 12.5 21.5C11.3181 21.5 10.1478 21.2672 9.05585 20.8149C7.96392 20.3626 6.97177 19.6997 6.13604 18.864C5.30031 18.0282 4.63738 17.0361 4.18508 15.9442C3.73279 14.8522 3.5 13.6819 3.5 12.5C3.5 10.1131 4.44821 7.82387 6.13604 6.13604C7.82387 4.44821 10.1131 3.5 12.5 3.5C14.8869 3.5 17.1761 4.44821 18.864 6.13604C20.5518 7.82387 21.5 10.1131 21.5 12.5Z"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function RegenSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
			<path
				d="M13.3522 8.29019H17.5122L14.8613 5.63769C14.0079 4.78425 12.9448 4.17052 11.779 3.8582C10.6132 3.54588 9.38567 3.54597 8.21989 3.85846C7.0541 4.17096 5.99113 4.78485 5.13783 5.63842C4.28452 6.49198 3.67096 7.55515 3.35883 8.72103M2.48716 16.8702V12.7102M2.48716 12.7102H6.64716M2.48716 12.7102L5.13716 15.3627C5.99059 16.2161 7.05366 16.8299 8.21948 17.1422C9.38531 17.4545 10.6128 17.4544 11.7786 17.1419C12.9444 16.8294 14.0074 16.2155 14.8607 15.362C15.714 14.5084 16.3275 13.4452 16.6397 12.2794M17.5122 4.13019V8.28853"
				stroke="#374151"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
function ShareSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
			<path
				d="M13.3927 18.2096C13.8735 18.6917 14.4598 18.9337 15.1458 18.9337C15.8318 18.9337 16.4181 18.6924 16.8988 18.2117C17.3796 17.7309 17.6208 17.1446 17.6208 16.4587C17.6208 15.7727 17.3796 15.1864 16.8988 14.7057C16.4181 14.2249 15.8318 13.9837 15.1458 13.9837C14.7739 13.9837 14.4407 14.0445 14.1484 14.1687C13.8843 14.2809 13.6496 14.4269 13.4448 14.6068L7.26088 11.0965C7.2817 11.009 7.30039 10.9224 7.31693 10.8368C7.33887 10.7234 7.35 10.6128 7.35 10.5053C7.35 10.3984 7.33897 10.2702 7.31774 10.1216C7.30102 10.0045 7.28198 9.8976 7.26053 9.80108L13.438 6.37596C13.6467 6.59421 13.895 6.75418 14.1819 6.85508C14.489 6.96312 14.8106 7.01699 15.1458 7.01699C15.8318 7.01699 16.4181 6.77577 16.8988 6.29499C17.3796 5.81422 17.6208 5.22793 17.6208 4.54199C17.6208 3.85605 17.3796 3.26976 16.8988 2.78899C16.4181 2.30822 15.8318 2.06699 15.1458 2.06699C14.4599 2.06699 13.8736 2.30822 13.3928 2.78899C12.9121 3.26976 12.6708 3.85605 12.6708 4.54199C12.6708 4.66264 12.6818 4.78692 12.7035 4.91474C12.7199 5.01122 12.7425 5.10155 12.7718 5.18543L6.59901 8.73018C6.36846 8.51153 6.11243 8.3415 5.83106 8.22091C5.52686 8.09054 5.20789 8.02533 4.875 8.02533C4.18906 8.02533 3.60277 8.26655 3.122 8.74732C2.64123 9.2281 2.4 9.81438 2.4 10.5003C2.4 11.1863 2.64123 11.7726 3.122 12.2533C3.60277 12.7341 4.18906 12.9753 4.875 12.9753C5.21024 12.9753 5.53739 12.8987 5.85557 12.7468C6.14594 12.6082 6.39538 12.4296 6.60277 12.2106L12.7738 15.7951C12.7434 15.8882 12.72 15.9888 12.7033 16.0966C12.682 16.2335 12.6708 16.3522 12.6708 16.4518C12.6708 17.1395 12.912 17.7274 13.3927 18.2096ZM15.8771 5.27272C15.6816 5.46873 15.4403 5.56699 15.1466 5.56699C14.8527 5.56699 14.6112 5.46891 14.4151 5.27329C14.2191 5.07772 14.1208 4.83649 14.1208 4.54272C14.1208 4.24887 14.2189 4.00734 14.4145 3.81127C14.6101 3.61526 14.8513 3.51699 15.1451 3.51699C15.439 3.51699 15.6805 3.61507 15.8766 3.8107C16.0726 4.00627 16.1708 4.24749 16.1708 4.54126C16.1708 4.83511 16.0728 5.07665 15.8771 5.27272ZM5.60629 11.231C5.41072 11.4271 5.1695 11.5253 4.87573 11.5253C4.58188 11.5253 4.34035 11.4272 4.14428 11.2316C3.94827 11.036 3.85 10.7948 3.85 10.5011C3.85 10.2072 3.94808 9.96567 4.14371 9.7696C4.33927 9.57359 4.5805 9.47533 4.87427 9.47533C5.16812 9.47533 5.40965 9.57341 5.60572 9.76903C5.80173 9.9646 5.9 10.2058 5.9 10.4996C5.9 10.7934 5.80192 11.035 5.60629 11.231ZM15.8771 17.1894C15.6816 17.3854 15.4403 17.4837 15.1466 17.4837C14.8527 17.4837 14.6112 17.3856 14.4151 17.19C14.2191 16.9944 14.1208 16.7532 14.1208 16.4594C14.1208 16.1655 14.2189 15.924 14.4145 15.7279C14.6101 15.5319 14.8513 15.4337 15.1451 15.4337C15.439 15.4337 15.6805 15.5317 15.8766 15.7274C16.0726 15.9229 16.1708 16.1642 16.1708 16.4579C16.1708 16.7518 16.0728 16.9933 15.8771 17.1894Z"
				fill="#374151"
				stroke="#374151"
				strokeWidth="0.2"
			/>
		</svg>
	);
}
function PlaneSVG() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			className="w-5 h-5"
		>
			<path
				d="M6.49955 12.5L3.76855 3.62598C10.3014 5.52565 16.4619 8.52677 21.9846 12.5C16.4623 16.4738 10.3021 19.4755 3.76955 21.376L6.49955 12.5ZM6.49955 12.5H13.9996"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function UploadSVG() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="absolute w-5 h-5 top-1 cursor-pointer"
		>
			<path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
			<path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
		</svg>
	);
}

type UploadFileProps = {
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	setFileText: React.Dispatch<React.SetStateAction<string>>;
};
function UploadFile({ setFile, setFileText }: UploadFileProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = function (e) {
			// console.log(e.target?.result);
			setFileText(e.target!.result as string);
		};

		reader.readAsText(file);
		setFile(file);
	};
	return (
		<div className="relative cursor-pointer">
			<UploadSVG />
			<input
				type="file"
				accept=".js,.html,.css"
				className="z-10 w-5 h-5 opacity-0 cursor-pointer"
				onChange={handleChange}
			/>
		</div>
	);
}
