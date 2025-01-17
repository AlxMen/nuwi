import { getDocumentByProject, getTotalDocumentsByProject } from "@/actions/document-action";
import DocumentCard from "./DocumentCard";
import { Document } from "@prisma/client";
import PaginationPages from "../projects/PaginationPages";

/**
 * Componente para listar documentos de un proyecto.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.procced - Procedimiento asociado a los documentos.
 * @param {string} props.category - Categoría de los documentos.
 * @param {Object} props.searchParams - Parámetros de búsqueda.
 * @param {string} [props.searchParams.search] - Término de búsqueda.
 * @param {string} [props.searchParams.page] - Página actual.
 * @param {string} [props.searchParams.order] - Orden de los documentos.
 * @returns {JSX.Element} Elemento JSX que representa la lista de documentos.
 */
export default async function ListDocument({
  procced,
  searchParams,
  category,
}: {
  procced: string;
  category: string;
  searchParams: {
    search?: string;
    page?: string;
    order?: string;
  };
  }) {
    /**
     * Término de búsqueda.
     *
     * @type {string}
     */
    const query = searchParams?.search || "";

    /**
     * Orden de los documentos.
     *
     * @type {string}
     */
    const filterOr = searchParams?.order || "1";

    /**
     * Página actual.
     *
     * @type {number}
     */
    const currentPage = Number(searchParams?.page) || 1;

    /**
     * Obtiene el total de documentos por proyecto y término de búsqueda.
     *
     * @type {number}
     */
    const totalDocuments = await getTotalDocumentsByProject(procced, query);

    /**
     * Obtiene los documentos por proyecto, página actual, término de búsqueda y orden.
     *
     * @type {Array<Document>}
     */
    const documents = await getDocumentByProject(
      procced,
      currentPage,
      query,
      filterOr
    );
  
    /**
     * Calcula el número total de páginas.
     *
     * @type {number}
     */
    const pages = Math.ceil(totalDocuments / 20);

    return (
      <>
        <div className="bg-yellow-100 max-h-[calc(100vh-11rem)] w-5/6">
          {documents.length ? (
            <>
              <div className="bg-yellow-100 h-[calc(100vh-14.2rem)] border border-black p-2 space-y-3 overflow-y-auto">
                {documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    info={doc as Document}
                    category={category}
                  />
                ))}
              </div>
              <PaginationPages page={currentPage} total={pages} />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <h1 className="m-2 text-xl text-center bg-slate-100 border-2 rounded-lg border-blue-600 font-bold">
                No hay Documentos en este Procedimiento o no se encuentran
                resultados en su Busqueda
              </h1>
            </div>
          )}
        </div>
      </>
    );
  }
