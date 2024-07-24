"use client";

import { GlobalContext } from "@/src/context/DataProvaider";
import Image from "next/image";
import { useContext } from "react";

export default function Body() {
  const { dataGlobal } = useContext(GlobalContext)
  
  return (
    <div className="ml-2 mt-9 h-4/5 xl:w-full xl:mr-3 w-3/4 text-white flex flex-col justify-center items-center">
      <p className="text-7xl text-center font-bold">Bienvenido/a</p>
      <div className="h-96 w-96 relative">
        <Image width={1500} height={120} src={"/NuWi1.png"} alt="imagen" />
      </div>
      <div className="italic font-black">
        <p className="text-7xl text-center font-bold">
          <span>{dataGlobal.name}</span>
        </p>
      </div>
    </div>
  );
}
