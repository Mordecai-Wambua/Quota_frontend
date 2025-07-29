import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import {UserProvider} from "@/context/UserContext";

import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

export const metadata = {
    title: "Mordecai's Blog",
    description: "A personal tech blog powered by Django & Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-background text-primary`}>
            <UserProvider>
                <Header />
                {children}
                <Footer />
            </UserProvider>
        </body>
        </html>
    );
}
