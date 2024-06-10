import Header from "@/components/home/Header";
import React from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="md:flex">
        <main className="fixed md:w-screen flex md:flex-1 md:h-screen">{children}</main>
      </div>
    </>
  );
}
