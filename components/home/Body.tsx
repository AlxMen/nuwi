"use client";

import { useMyContext } from "@/src/context/DataProvaider";
import Image from "next/image";

export default function Body() {
  /* `const { dataGlobal } = useMyContext();` está desestructurando el valor devuelto por el gancho `useMyContext()`. Está extrayendo la propiedad `dataGlobal` del objeto devuelto por el gancho y asignándola a una variable constante llamada `dataGlobal`. Esto le permite acceder a la propiedad `dataGlobal` directamente sin tener que hacer referencia a todo el objeto cada vez. */
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
