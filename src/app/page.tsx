import SelectorWrapper from "@/components/selector-wrapper";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

export default async function Home() {
	return (
		<main className="">
			<Navbar />
			<SelectorWrapper />
			<Toaster />
		</main>
	);
}
