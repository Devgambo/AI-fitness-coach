import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI Fitness Coach - Personalized Workout & Diet Plans",
    description: "Get AI-powered personalized workout and diet plans tailored to your fitness goals",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html data-theme="dark" lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <Header />
                    {children}
                    <Toaster position="top-right" richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
