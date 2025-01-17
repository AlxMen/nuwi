import { updateDocument } from "@/actions/document-action";
import { EditDocumentSchema } from "@/src/schema";
import { Document } from "@prisma/client";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

type EditDocumentProps = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  info: Document;
  category: string;
};

/**
 * Componente para editar un documento existente.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.modal - Estado del modal de edición.
 * @param {Function} props.setModal - Función para cambiar el estado del modal de edición.
 * @param {Document} props.info - Información del documento a editar.
 * @param {string} props.category - Categoría del documento.
 * @returns {JSX.Element} Elemento JSX que representa el formulario para editar un documento.
 */
export default function EditDocument({
  modal,
  setModal,
  info,
  category
}: EditDocumentProps) {
  const { name, regisNumber, date, id } = info;

  /**
   * Maneja el envío del formulario para editar un documento.
   *
   * @param {FormData} formData - Datos del formulario de edición de documento.
   */
  const handleActionEdit = async (formData: FormData) => {
    const data = {
      name: formData.get("namedoc"),
      date: formData.get("date"),
      regisNumber: formData.get("exp"),
    };

    const result = EditDocumentSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await updateDocument(info.id, result.data);

    if (response.errors) {
      toast.error(response.errors[0].message);
      return;
    } else {
      toast.success(response.message);
      setModal(false);
      redirect(`/home/${category}/${id}`);
    }
  };

  return (
    <>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 bg-blue-800 border-b-2 border-black border-blueGray-200 rounded-t">
                  <h3 className="text-white text-3xl font-bold">
                    Editar Proyecto {regisNumber}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl"
                    onClick={() => setModal(false)}
                  >
                    <span className="text-white  font-bold h-6 w-6 text-2xl block">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form action={handleActionEdit}>
                  <div className="grid grid-cols-2 bg-slate-100">
                    <div className="relative p-6 flex-auto ">
                      <label
                        htmlFor="namedoc"
                        className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                      >
                        Nombre del Documento:
                      </label>
                      <input
                        id="namedoc"
                        type="text"
                        name="namedoc"
                        defaultValue={name}
                        className="h-7 w-full border border-black rounded-md text-center"
                      />
                    </div>
                    <div className="relative p-6 flex-auto ">
                      <label
                        htmlFor="exp"
                        className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                      >
                        Nº Expediente:
                      </label>
                      <input
                        id="exp"
                        type="text"
                        name="exp"
                        className="h-7 w-full border border-black rounded-md text-center"
                        defaultValue={regisNumber}
                      />
                    </div>
                    <div className="relative p-6 flex-auto ">
                      <label
                        htmlFor="date"
                        className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                      >
                        Fecha del Registro:
                      </label>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        className="h-7 w-2/3 border border-black rounded-md text-center"
                        defaultValue={date}
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-black border-solid border-blueGray-200 bg-yellow-400 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
