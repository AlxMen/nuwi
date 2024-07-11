import Header from "@/components/home/Header";
import ToastNotification from "@/components/ui/ToastNotification";
import React from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="fixed max-h-[calc(100vh-6rem)] md:w-screen flex md:flex-1 md:h-screen">
        {children}
      </main>

      <ToastNotification />
    </>
  );
}