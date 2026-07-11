import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/global/Navbar";
import Footer from "@/Components/global/Footer";

const FiraCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "DevCraft - Premium Developer Marketplace",
  description: "Buy and sell premium Next.js and TypeScript assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FiraCode.className} bg-slate-50  text-primary min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow py-20">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
