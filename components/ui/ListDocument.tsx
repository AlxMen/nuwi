import { getDocumentByProject, getTotalDocumentsByProject } from "@/actions/document-action";
import DocumentCard from "./DocumentCard";
import { Document } from "@prisma/client";
import PaginationPages from "../projects/PaginationPages";

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
  const query = searchParams?.search || "";
  const filterOr = searchParams?.order || "1";
  const currentPage = Number(searchParams?.page) || 1;
  const totalDocuments = await getTotalDocumentsByProject(procced, query);
  const documents = await getDocumentByProject(
    procced,
    currentPage,
    query,
    filterOr
  );
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
