import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import "./globals.css";
// import Provider from "./provider";
// import Provider from "./provider";
import Headers from "./_components/Headers";

const MyappFont = DM_Sans({subsets:["latin"]})

export const metadata: Metadata = {
  title: "Gyani-AI prediction tool",
  description: "An AI-powered guessing game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${MyappFont.className} bg-[#dfd7f5]`}>
        <Headers />
        {children}
      </body>
    </html>
  );
}
