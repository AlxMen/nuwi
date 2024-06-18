import Link from "next/link";
import MenuCard from "../ui/MenuCard";
import { Dispatch, SetStateAction } from "react";

type CardProjectProps = {
  setModal: Dispatch<SetStateAction<boolean>>;
}; 


export default function CardProjects({setModal}: CardProjectProps) {
  return (
    <section className="h-fit w-full bg-white rounded-xl shadow-lg border border-blue-300">
      <div className="lg:order-first">
        <div className="flex flex-col">
          <div className="flex border-b border-black bg-blue-800 rounded-t-md p-2 justify-between items-center">
            <div>
              <p className="text-white font-black italic">Nº Expediente</p>
              <p className="text-white font-bold text-3xl">
                Nombre del Proyecto
              </p>
            </div>
            <MenuCard setModal={setModal} />
          </div>
          <div className="grid grid-cols-3 p-1">
            <p className="m-2  text-sm font-semibold text-neutral-800">
              Fecha de Entrada:{" "}
              <span className="font-bold italic">{"dd/mm/aaaa"}</span>
            </p>
            <p className="m-2  text-sm font-semibold text-neutral-800">
              Ultima Actualización:{" "}
              <span className="font-bold italic">{"dd/mm/aaaa"}</span>
            </p>
            <p className="m-2  text-sm font-semibold text-neutral-800">
              modificado por:{" "}
              <span className="font-bold italic">{"Nombre de Usuario"}</span>
            </p>
            <p className="m-2  text-sm font-semibold text-neutral-800">
              Estado:{" "}
              <span className="font-bold italic">
                {
                  "Presentación/Subsanación/Inicio/En Proceso/Paralizado/Cancelado/Finalizado"
                }
              </span>
            </p>
            <p className="m-2  text-sm font-semibold text-neutral-800">
              Solicitante/Interesado:{" "}
              <span className="font-bold italic">
                {"Nombre del Solicitante o Interesado"}
              </span>
            </p>
          </div>
          <div className="flex justify-end border-t border-black bg-yellow-400 rounded-b-xl p-2">
            <Link
              href={"/home/projects/1"}
              className="text-center text-xl text-white font-bold bg-blue-700 p-1 rounded-md hover:bg-blue-800"
            >
              Abrir Proyecto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
