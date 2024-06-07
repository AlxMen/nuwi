import Header from "@/components/ui/Header";
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
        <main className="fixed md:flex-1 md:h-screen">{children}</main>
      </div>
    </>
  );
}
