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

/**
 * Componente de paginación para las páginas de proyectos.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.page - Página actual.
 * @param {number} props.total - Número total de páginas.
 * @returns {JSX.Element} Elemento JSX que representa la paginación.
 */
export default function PaginationPages({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  /**
   * Genera la ruta de navegación para la paginación.
   *
   * @param {PaginationRenderItemParams} item - Parámetros del ítem de paginación.
   * @returns {string} Ruta de navegación con los parámetros de paginación.
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
