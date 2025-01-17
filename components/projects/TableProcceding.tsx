import React from "react";
import { redirect } from "next/navigation";
import CardProjects from "./CardProjects";
import { projects } from "@/src/types";
import {
  getProjectByCategoryAndQuery,
  getProjectCount,
} from "@/actions/project-action";
import PaginationPages from "./PaginationPages";
import RegisterNoFound from "../ui/RegisterNoFound";

/**
 * Componente de tabla para mostrar los procedimientos de proyectos.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.category - Categoría de los proyectos.
 * @param {string} props.query - Consulta de búsqueda.
 * @param {number} props.currentPage - Página actual.
 * @returns {JSX.Element} Elemento JSX que representa la tabla de procedimientos de proyectos.
 */
export default async function TableProcceding({
  category,
  query,
  currentPage,
}: {
  category: string;
  query: string;
  currentPage: number;
  }) {
    /**
     * Obtiene los proyectos por categoría y consulta de búsqueda.
     */
    const proccedings = getProjectByCategoryAndQuery(
      category,
      query,
      currentPage
    );
    /**
     * Obtiene el conteo total de proyectos según la consulta y categoría.
     */
    const totalProject = getProjectCount(query, category);
    /**
     * Espera a que se resuelvan las promesas de los proyectos y el conteo total.
     */
    const [dataProcced, total] = await Promise.all([proccedings, totalProject]);
    /**
     * Calcula el número total de páginas.
     */
    const pages = Math.ceil(total / 10);

    if (dataProcced.length === 0 && query) {
      redirect(`/home/${category}?page=1&search=${query}`);
    }

    return (
      <>
        {dataProcced.length ? (
          <>
            <div className="xl:grid xl:grid-cols-2 h-full w-full bg-slate-100 p-4 xl:gap-6 overflow-y-auto">
              {dataProcced.map((pro) => (
                <CardProjects key={pro.id} info={pro as projects} />
              ))}
            </div>
            <PaginationPages page={currentPage} total={pages} />
          </>
        ) : (
          <RegisterNoFound />
        )}
      </>
    );
  }
