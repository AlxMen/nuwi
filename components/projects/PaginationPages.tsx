"use client";
import Link from "next/link";
import {
  usePathname, useSearchParams
} from "next/navigation";
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";

export default function PaginationPages({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  /* `const searchParams = useSearchParams();` utiliza el gancho `useSearchParams` de Next.js para obtener los parámetros de búsqueda de la URL actual. Le permite acceder y manipular los parámetros de consulta en la URL de la página actual. En este caso, los parámetros de búsqueda se utilizan para actualizar dinámicamente el número de página en el componente de paginación según la interacción del usuario. */
  const searchParams = useSearchParams();
  /* `const pathname = usePathname();` utiliza el gancho `usePathname` de Next.js para recuperar la ruta actual de la URL. Esto permite que el componente acceda y utilice la ruta actual de la página donde se está representando. En el contexto del fragmento de código proporcionado, la ruta se utiliza para actualizar dinámicamente el número de página en el componente de paginación según la interacción del usuario. */
  const pathname = usePathname();
  /* `const params = new URLSearchParams(searchParams);` crea una nueva instancia de la clase `URLSearchParams` en JavaScript. Toma el objeto `searchParams` obtenido del gancho `useSearchParams` en Next.js, que contiene los parámetros de consulta de la URL actual. Al crear un nuevo objeto `URLSearchParams` con `searchParams`, puede manipular y actualizar los parámetros de consulta de forma dinámica. Esto le permite modificar los parámetros de consulta en función de las interacciones del usuario, como cambiar el número de página en el componente de paginación en función de la entrada del usuario o la navegación. */
  const params = new URLSearchParams(searchParams);

  /**
   * La función `RoutingPath` toma un objeto PaginationRenderItemParams, establece el parámetro "página" en función del valor de la página del elemento y devuelve una cadena con la ruta de acceso y los parámetros actualizados.
   * @param {PaginationRenderItemParams} item - PaginationRenderItemParams
   * @returns La función `RoutingPath` devuelve una cadena que incluye `pathname` y el número de página del parámetro `item`. El número de página se convierte en una cadena y se agrega como un parámetro de consulta "page" en la cadena URL devuelta.
   */
  const RoutingPath = (item: PaginationRenderItemParams) => {
    params.set("page", item.page!.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center py-2 bg-slate-100 border-t-2 border-black">
      <Pagination
        page={page}
        count={total}
        renderItem={(item) => (
          <PaginationItem
            className={`text-amber-300 bg-blue-700  text-lg font-bold hover:bg-blue-500`}
            component={Link}
            href={RoutingPath(item)}
            {...item}
          />
        )}
      />
    </nav>
  );
}
