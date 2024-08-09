"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pagination, PaginationItem } from "@mui/material";

export default function PaginationPages({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center py-2 bg-slate-100 border-t-2 border-black">
      <Pagination
        page={page}
        count={total}
        renderItem={(item) => (
          <PaginationItem
            className={`${
              item.page === page ? "text-black" : "text-amber-300"
            } bg-blue-700  text-lg font-bold hover:bg-blue-500`}
            component={Link}
            href={`${pathname}${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </nav>
  );
}
