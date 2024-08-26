import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvaider } from "@/src/context/DataProvaider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NuWi",
  description: "New utility of work integrated",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvaider>
      <html lang="en">
        <head>
          <link rel="icon" href="/NuWi1.png" className="h-3 w-3" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalProvaider>
  );
}
