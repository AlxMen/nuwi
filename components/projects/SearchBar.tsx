"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {useDebouncedCallback} from "use-debounce"
export default function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()
  
  /**
   * Funcion que recoge los datos del buscador para filtrar y mostrar los resultados correspondientes a lo que se busca
   */
  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`)
  }, 2300);

  return (
    <>
      <input
        type="text"
        placeholder="Buscador de Proyectos"
        onChange={(e) => handleSearch(e.target.value)}
        className="border-2 border-black rounded-md text-xl w-2/5 placeholder:text-center text-center"
        defaultValue={searchParams.get('search')?.toString()}
      />
    </>
  );
}
