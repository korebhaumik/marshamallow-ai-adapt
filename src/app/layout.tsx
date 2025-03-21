import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	icons: "EdgeBot.svg",
	title: "AdaptAI",
	description:
		"Book,order and more with our AI assistant. Get personalized recommendations and assistance for your needs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={poppins.className} suppressHydrationWarning={true}>
				{children}
			</body>
		</html>
	);
}
