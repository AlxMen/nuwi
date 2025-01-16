"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /* La constante `handleSearch` es una función de devolución de llamada sin rebotes que se activa cuando el usuario escribe en el campo de entrada de búsqueda. */
  const handleSearch = useDebouncedCallback((search: string) => {
    /* `const params = new URLSearchParams(searchParams);` está creando una nueva instancia del objeto URLSearchParams utilizando la variable `searchParams`. El objeto URLSearchParams le permite trabajar con la cadena de consulta de una URL. En este caso, se utiliza para analizar y manipular los parámetros de búsqueda de la URL actual. */
    const params = new URLSearchParams(searchParams);
    /* El bloque de código `if (search) { params.set("search", search); } else { params.delete("search"); }` maneja la funcionalidad de búsqueda en el componente SearchBar. */
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    /* `replace(`?${params.toString()}`);` está actualizando la URL en el navegador reemplazando la URL actual con una nueva URL construida usando `pathname` y la representación de cadena de los parámetros de la URL en `params`. */
    replace(`${pathname}?${params.toString()}`);
  }, 2300);

  return (
    <>
      <input
        type="text"
        placeholder="Buscador de Proyectos"
        onChange={(e) => handleSearch(e.target.value)}
        className="border-2 border-black rounded-md text-xl w-2/5 placeholder:text-center text-center"
        defaultValue={searchParams.get("search")?.toString()}
      />
    </>
  );
}
