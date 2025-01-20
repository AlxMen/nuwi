import { getProjectById } from "@/actions/project-action";
import Filter from "@/components/ui/Filter";
import ListDocument from "@/components/ui/ListDocument";
import ModalAddNewFile from "@/components/ui/ModalAddNewFile";

/**
 * Página para mostrar los detalles de un proyecto específico.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.params - Parámetros de la ruta.
 * @param {string} props.params.category - Categoría del proyecto.
 * @param {string} props.params.exp - Identificador del proyecto.
 * @param {Object} props.searchParams - Parámetros de búsqueda.
 * @param {string} [props.searchParams.search] - Término de búsqueda.
 * @param {string} [props.searchParams.page] - Página actual.
 * @param {string} [props.searchParams.order] - Orden de los documentos.
 * @returns {JSX.Element} Elemento JSX que representa la página de detalles del proyecto.
 */
export default async function page({
  params,
  searchParams,
}: {
  params: { exp: string; category: string };
  searchParams: {
    search?: string;
    page?: string;
    order?: string;
  };
}) {
  /**
   * Obtiene los datos del proyecto.
   */
  const data = await getProjectById(params.exp);
  /**
   * Identificador del proyecto.
   */
  const { id } = data!;

  return (
    <>
      <div className="w-full flex flex-col m-2  rounded-lg border-4 border-yellow-400 bg-slate-100">
        <div className="bg-blue-800 w-full h-14 flex justify-between border-b border-black">
          <div className="pl-2 text-white font-black text-md">
            <p>Nº {data?.nExp}</p>
            <p className="text-2xl">
              {data?.name} {data?.type}
            </p>
          </div>
          <div className="flex items-center gap-2 p-2">
            <ModalAddNewFile procced={id} />
          </div>
        </div>
        <div className="flex h-full">
          <Filter />
          <ListDocument
            procced={id}
            searchParams={searchParams}
            category={params.category}
          />
        </div>
      </div>
    </>
  );
}
