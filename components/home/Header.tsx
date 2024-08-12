"use client";
import { useMyContext } from "@/src/context/DataProvaider";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { dataGlobal } = useMyContext();
  
  return (
    <>
      <header className="bg-blue-900 w-full h-24 gap-4 shadow-lg flex justify-between items-center">
        <div className="relative h-32 w-52 ml-2 mb-2">
          <Link href={"/home"}>
            <Image
              width={130}
              height={100}
              style={{ objectFit: "contain"}}
              src={"/NuWi1.png"}
              alt="logo del programa"
            />
          </Link>
        </div>
        <div className="mr-5 text-3xl text-white font-bold">
          <Link href={"/user"} className="hover:italic hover:underline">
            {dataGlobal.name}
          </Link>
        </div>
      </header>
    </>
  );
}
