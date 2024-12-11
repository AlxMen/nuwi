import CreateNewProject from "@/components/projects/CreateNewProject";
import SearchBar from "@/components/projects/SearchBar";
import TableProcceding from "@/components/projects/TableProcceding";
import NavBar from "@/components/ui/NavBar";
import { CardsSkeleton } from "@/components/ui/Skeleton";
import { Suspense } from "react";

export default function ProjectPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: {
    search?: string;
    page?: string;
  };
  }) {
  /**
   * Datos para el filtrado del buscador y paginacion del aplicativo
   */
  const query = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  

  return (
    <>
      <div className="w-full flex flex-col m-2  rounded-lg border-4 border-yellow-400">
        <div className="flex justify-between h-14 bg-slate-100 border-b-2 p-1 gap-2 border-black w-full">
          <NavBar category={params.category} />
          <SearchBar />
          <CreateNewProject category={params.category} />
        </div>
        <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
          <TableProcceding
            category={params.category}
            query={query}
            currentPage={currentPage}
          />
          
        </Suspense>
        
      </div>
    </>
  );
}
