import CreateNewProject from "@/components/projects/CreateNewProject";
import SearchBar from "@/components/projects/SearchBar";
import TableProcceding from "@/components/projects/TableProcceding";
import NavBar from "@/components/ui/NavBar";
import { CardsSkeleton } from "@/components/ui/Skeleton";
import { Suspense } from "react";

/**
 * Página principal para mostrar los proyectos según la categoría.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.params - Parámetros de la ruta.
 * @param {string} props.params.category - Categoría de los proyectos.
 * @param {Object} props.searchParams - Parámetros de búsqueda.
 * @param {string} [props.searchParams.search] - Término de búsqueda.
 * @param {string} [props.searchParams.page] - Página actual.
 * @returns {JSX.Element} Elemento JSX que representa la página principal de proyectos.
 */
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
     * Término de búsqueda.
     */
    const query = searchParams?.search || "";
    /**
     * Página actual.
     */
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
