"use client";

import { useMyContext } from "@/src/context/DataProvaider";
import Image from "next/image";

/**
 * Componente principal del cuerpo de la página de inicio.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el cuerpo de la página de inicio.
 */
export default function Body() {
  
  const { dataGlobal } = useMyContext();

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
