import { getProjectById } from "@/actions/project-action";
import Filter from "@/components/ui/Filter";
import ListDocument from "@/components/ui/ListDocument";
import ModalAddNewFile from "@/components/ui/ModalAddNewFile";

export default async function page({
  params,
  searchParams,
}: {
  params: { exp: string, category: string };
    searchParams: {
      search?: string;
      page?: string;
      order?: string;
    };
  }) {
    /* El fragmento de código realiza una llamada asincrónica a la función `getProjectById` con el parámetro `params.exp` para obtener los datos del proyecto. Una vez que se recuperan los datos, se desestructura la propiedad `id` del objeto de datos.
    El operador `!` se utiliza para afirmar que `data` no es nulo ni indefinido, lo que permite que la desestructuración se realice de forma segura. */
    const data = await getProjectById(params.exp);

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
