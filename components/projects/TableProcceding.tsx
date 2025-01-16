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

export default async function TableProcceding({
  category,
  query,
  currentPage,
}: {
  category: string;
  query: string;
  currentPage: number;
  }) {
    /* La línea `const proccedings = getProjectByCategoryAndQuery(category, query, currentPage);` está llamando a la función `getProjectByCategoryAndQuery` con los parámetros `category`, `query` y `currentPage` proporcionados. Es probable que esta función sea responsable de obtener una lista de proyectos en función de la categoría, la cadena de consulta y el número de página actual especificados. El resultado almacenado en `proccedings` es probablemente una promesa que se resuelve en una matriz de datos de proyectos en función de los criterios proporcionados. */
    const proccedings = getProjectByCategoryAndQuery(
      category,
      query,
      currentPage
    );

    /* La línea `const totalProject = getProjectCount(query, category);` está llamando a la función `getProjectCount` con los parámetros `query` y `category` proporcionados. Esta función es probablemente responsable de devolver el recuento total de proyectos en función de la cadena de consulta y la categoría especificada. El resultado almacenado en `totalProject` es probablemente una promesa que se resuelve en la cantidad total de proyectos que coinciden con los criterios proporcionados. */
    const totalProject = getProjectCount(query, category);

    /* La línea `const [dataProcced, total] = await Promise.all([procedings, totalProject]);` usa `Promise.all` para esperar la resolución de varias promesas simultáneamente. En este caso, está esperando los resultados de dos operaciones asincrónicas: `procedings` y `totalProject`. */
    const [dataProcced, total] = await Promise.all([proccedings, totalProject]);
    /* La línea `const pages = Math.ceil(total / 10);` calcula la cantidad total de páginas necesarias para la paginación en función de la cantidad total de proyectos recuperados. */
    const pages = Math.ceil(total / 10);
    /* La condición `if (dataProcced.length === 0 && query)` verifica si la matriz `dataProcced` está vacía y si hay una `query` presente. Si ambas condiciones son verdaderas, significa que no se encontraron proyectos según los criterios de búsqueda proporcionados. En este caso, el código está redireccionando al usuario a una URL específica mediante la función `redirect`. La URL a la que se redirecciona se construye dinámicamente con el valor `category`, configurando la página en 1 e incluyendo la consulta de búsqueda para un mayor refinamiento. Es probable que esta redirección tenga como objetivo manejar casos en los que ningún proyecto coincide con la consulta de búsqueda y brindar una experiencia fácil de usar al redirigirlo a una página relevante. */
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
