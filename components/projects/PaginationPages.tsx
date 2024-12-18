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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  /**
   * 
   * @param item Funcion que usa la ruta para implementar paginacion mediate la cantidad de datos que llegan de la base de datos
   * @returns 
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
