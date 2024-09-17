"use client";
import { useMyContext } from "@/src/context/DataProvaider";
import { FaPowerOff } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Header() {
  const { dataGlobal, closeSection } = useMyContext();
  const {push} = useRouter()

  const handleClickAction = () => {
    closeSection();
    toast.success("Sesión cerrada correctamente!");
    push("/")
  }

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
            className="border-yellow-400 border-2 rounded-full pl-2 pr-2 ml-5 hover:underline flex items-center gap-1"
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

