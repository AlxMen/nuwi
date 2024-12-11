import Link from "next/link";
import MenuCard from "../ui/MenuCard";
import { projects } from "@/src/types";

/**
 * Constante para establecer un listado de estados de los documentos a la hora de actualizarlos
 */
const statusStyles = [
  { name: "Presentación", style: " bg-blue-200 border-2 border-blue-500 w-fit p-1 " },
  { name: "Subsanación", style: " bg-violet-300 border-2 border-violet-500 w-fit p-1 " },
  { name: "Inicio", style: " bg-teal-200 border-2 border-teal-500 w-fit p-1 " },
  { name: "En Proceso", style: " bg-lime-200 border-2 border-lime-500 w-fit p-1 " },
  { name: "Paralizado", style: " bg-yellow-200 border-2 border-yellow-500 w-fit p-1 " },
  { name: "Cancelado", style: " bg-red-200 border-2 border-red-500 w-fit p-1 " },
  { name: "Finalizado", style: " bg-amber-300 border-2 border-amber-600 w-fit p-1 " },
];
export default function CardProjects({ info }: { info: projects }) {
  const {
    nExp,
    name,
    status,
    type,
    category,
    applicant,
    createdexp,
    lastupdate,
    lastuser,
  } = info;


  return (
    <section className="h-fit w-full bg-white rounded-xl shadow-lg border border-blue-300">
      <div className="lg:order-first">
        <div className="flex flex-col">
          <div className="flex border-b border-black bg-blue-800 rounded-t-md p-2 justify-between items-center">
            <div>
              <p className="text-white font-black italic">Nº {nExp}</p>
              <p className="text-white font-bold text-3xl">{name} {type}</p>
            </div>
            <MenuCard info={info} />
          </div>
          <div className=" p-1">
            <div className="text-sm items-center grid grid-cols-3">
              <h1 className="m-2 font-semibold text-neutral-800">
                Fecha de Entrada:{" "}
              </h1>
              <p className="font-bold italic">{createdexp}</p>
            </div>
            <div className="text-sm items-center grid grid-cols-3">
              <h1 className="m-2 font-semibold text-neutral-800">
                Ultima Actualización:{" "}
              </h1>
              <p className="font-bold italic">{lastupdate}</p>
            </div>
            <div className="text-sm items-center grid grid-cols-3">
              <h1 className="m-2 font-semibold text-neutral-800">
                modificado por:{" "}
              </h1>
              <p className="font-bold italic">{lastuser.name}</p>
            </div>
            <div className="text-sm items-center grid grid-cols-3">
              <h1 className="m-2 font-semibold text-neutral-800">Estado: </h1>
              <p className={`font-bold italic rounded-lg  ${statusStyles.map(st => {
                return st.name === status? st.style : "";
              })}`}>
                {status}
              </p>
            </div>
            <div className="text-sm items-center grid grid-cols-3">
              <h1 className="m-2 font-semibold text-neutral-800">
                Solicitante/Interesado:{" "}
              </h1>
              <p className="font-bold italic">{applicant}</p>
            </div>
          </div>
          <div className="flex justify-end border-t border-black bg-yellow-400 rounded-b-xl p-2">
            <Link
              href={`/home/${category}/${info.id}`}
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
