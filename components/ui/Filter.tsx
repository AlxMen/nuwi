"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

/**
 * Componente de filtro para buscar y ordenar elementos.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el filtro de búsqueda y ordenación.
 */
export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /**
   * Maneja la búsqueda de elementos con un retardo para evitar múltiples solicitudes.
   *
   * @param {string} search - Término de búsqueda.
   */
  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 2300);

  /**
   * Maneja el orden de los elementos.
   *
   * @param {string} order - Orden de los elementos.
   */
  const handleOrder = (order: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", order);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="h-full bg-slate-300 border-r border-black w-1/6 p-2 ">
      <form className="flex  flex-col gap-4">
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full h-8 border border-black placeholder:text-center text-center rounded-md"
          placeholder="Buscador"
        />

        <label htmlFor="order">Ordernado por:</label>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="filter"
            id="filter"
            onChange={(e) => handleOrder("0")}
          />
          <h3 className="flex items-center gap-1">
            Fecha <FaArrowDown />
          </h3>
        </div>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="filter"
            id="filter"
            onChange={(e) => handleOrder("1")}
            defaultChecked
          />
          <h3 className="flex items-center gap-1">
            Fecha <FaArrowUp />
          </h3>
        </div>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="filter"
            id="filter"
            onChange={(e) => handleOrder("2")}
          />
          <h3>Nº Expediente</h3>
        </div>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="filter"
            id="filter"
            onChange={(e) => handleOrder("3")}
          />
          <h3>Nombre</h3>
        </div>
      </form>
    </div>
  );
}
