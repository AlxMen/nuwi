"use client";

import jwt from "jsonwebtoken";
import { DataUser } from "@/src/types";
import Image from "next/image";

export default function Body() {
  let data: DataUser | null = null;

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token) as DataUser;
      data = decoded;
    }
  }

  return (
    <div className="ml-2 mt-9 h-4/5 xl:w-full xl:mr-3 w-3/4 text-white flex flex-col justify-center items-center">
      <p className="text-7xl text-center font-bold">Bienvenido/a</p>
      <div className="h-96 w-96 relative">
        <Image fill src={"/NuWi1.png"} alt="imagen" />
      </div>
      <p
        suppressHydrationWarning={true}
        className="text-7xl text-center font-bold"
      >
        <div className="italic font-black">
          {data && <span>{data.name}</span>}
        </div>
      </p>
    </div>
  );
}
