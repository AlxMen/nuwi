import { getDocumentByProject } from "@/actions/document-action";
import DocumentCard from "./DocumentCard";
import { Document } from "@prisma/client";

export default async function ListDocument({
  procced,
  searchParams,
}: {
  procced: string;
  searchParams: {
    search?: string;
    page?: string;
    filter?: string;
  };
  }) {
  
  const query = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const documents = await getDocumentByProject(procced, currentPage, query);

  return (
    <>
      <div className="bg-yellow-100 max-h-[calc(100vh-11rem)] border border-black w-5/6 p-2 space-y-3 overflow-y-auto">
        {documents.length ? (
          documents.map((doc) => (
            <DocumentCard key={doc.id} info={doc as Document} />
          ))
        ) : (
          <h1 className="text-xl text-center bg-slate-100 border-2 rounded-lg border-blue-600 font-bold">
            No hay Documentos en este Procedimiento
          </h1>
        )}
      </div>
    </>
  );
}
