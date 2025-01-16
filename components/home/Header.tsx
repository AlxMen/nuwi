"use client";
import { useMyContext } from "@/src/context/DataProvaider";
import { FaPowerOff } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Header() {
  /* El fragmento de código `const { dataGlobal, closeSection } = useMyContext();` utiliza el gancho `useMyContext` para acceder a los valores `dataGlobal` y `closeSection` desde el contexto proporcionado por el proveedor de contexto `DataProvaider`. */
  const { dataGlobal, closeSection } = useMyContext();
  /* `const { push } = useRouter();` extrae la función `push` del gancho `useRouter` proporcionado por Next.js. La función `push` se utiliza para navegar programáticamente a una página diferente en la aplicación. En este caso, se utiliza en la función `handleClickAction` para redirigir al usuario a la página de inicio (`"/"`) después de realizar algunas acciones como cerrar una sección y borrar el almacenamiento local. */
  const { push } = useRouter();

  /**
   * La función handleClickAction cierra una sección, muestra un mensaje de confirmación de éxito, borra el almacenamiento local y redirecciona a la página de inicio.
   */
  const handleClickAction = () => {
    closeSection();
    toast.success("Sesión cerrada correctamente!");
    localStorage.clear();
    push("/");
  };

  return (
    <>
      <header className="bg-blue-900 w-full h-24 gap-4 shadow-lg flex justify-between items-center">
        <div className="relative h-32 w-52 ml-2 mb-2">
          <Link href={"/home"}>
            <Image
              width={130}
              height={100}
              style={{ objectFit: "contain" }}
              src={"/NuWi1.png"}
              alt="logo del programa"
            />
          </Link>
        </div>
        <div className="flex flex-col items-end mr-5  text-white font-bold gap-6">
          <Link
            href={"/user"}
            className="text-2xl hover:italic hover:underline"
          >
            {dataGlobal.name}
          </Link>
          <button
            className="text-black border-yellow-400 border-2 rounded-full pl-2 pr-2 ml-5 bg-yellow-400 hover:bg-yellow-100 flex items-center gap-1"
            onClick={handleClickAction}
          >
            Salir
            <FaPowerOff />
          </button>
        </div>
      </header>
    </>
  );
}

