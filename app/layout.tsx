import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanishq Shukla — Full-Stack AI Engineer",
  description:
    "Full-Stack AI Engineer and ex-Founding Engineer at Surgegrowth, building production LLM infrastructure — MCP servers, distributed job systems, and agent red-teaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        <div className="ambient-bg" aria-hidden="true" />
        <SmoothScroll />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
