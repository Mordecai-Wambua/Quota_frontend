import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";


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
                <Toaster
                  position="top-center"
                  toastOptions={{
                      style: {
                          background: "#1f1f1f", // Dark background
                          color: "#fff",         // Light text
                          border: "1px solid #333",
                      },
                      success: {
                          iconTheme: {
                              primary: "#4ade80",  // e.g., green
                              secondary: "#1f1f1f",
                          },
                      },
                      error: {
                          iconTheme: {
                              primary: "#f87171",  // e.g., red
                              secondary: "#1f1f1f",
                          },
                      },
                  }}
                />

                <Footer />
            </UserProvider>
        </body>
        </html>
    );
}
