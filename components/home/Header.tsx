"use client";
import jwt from "jsonwebtoken";
import Image from "next/image";
import Link from "next/link";
import { DataUser } from "@/src/types";

export default function Header() {

  let data: DataUser | null = null;

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token) as DataUser;
      data = decoded;
    }
  }

  return (
    <>
      <header className="bg-blue-900 w-full h-24 gap-4 shadow-lg flex justify-between items-center">
        <div className="relative h-32 w-52">
          <Link href={"/home"}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={"/NuWi1.png"}
              alt="logo del programa"
            />
          </Link>
        </div>
        <div className="mr-5 text-3xl text-white font-bold">
          <Link href={"/user"} className="hover:italic hover:underline">
            {data && data.name}
          </Link>
        </div>
      </header>
    </>
  );
}
