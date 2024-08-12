import { updateProject } from "@/actions/project-action";
import { EditProjectSchema } from "@/src/schema";
import { redirect } from "next/dist/server/api-utils";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

type EditProjectProps = {
  modalEdit: boolean;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
  name: string;
  status: string;
  id: string;
};

export default function EditProject({
  modalEdit,
  setModalEdit,
  name,
  status,
  id,
}: EditProjectProps) {
  const handleActionSubmit = async (formData: FormData) => {
    const data = {
      id: id,
      name: formData.get("name"),
      status: formData.get("status"),
    };

    const result = EditProjectSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    const response = await updateProject(data);
    if (response?.errors) {
      toast.error(response.errors[0].message);
      return;
    }
    setModalEdit(false);
    toast.success("Proyecto actualizado exitosamente");
  };

  return (
    <>
      {modalEdit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 bg-blue-800 border-b-2 border-black border-blueGray-200 rounded-t">
                  <h3 className="text-white text-3xl font-bold">
                    Editar Proyecto {"Nº Expediente"}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl"
                    onClick={() => setModalEdit(false)}
                  >
                    <span className="text-white  font-bold h-6 w-6 text-2xl block">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form action={handleActionSubmit}>
                  <div className="grid grid-cols-2 bg-slate-100">
                    <div className="relative p-6 flex-auto ">
                      <label
                        id="name"
                        className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                      >
                        Nombre del Proyecto:
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="h-7 w-full border border-black rounded-md text-center"
                        defaultValue={name}
                      />
                    </div>
                    <div className="relative p-6 flex-auto ">
                      <label
                        id="status"
                        className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                      >
                        Estado:
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="w-full border border-black rounded-md h-7 text-center"
                        defaultValue={status}
                      >
                        <option value="">-- estado Actual --</option>
                        <option value="Presentación">Presentación</option>
                        <option value="Subsanación">Subsanación</option>
                        <option value="Inicio">Inicio</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Paralizado">Paralizado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-black border-solid border-blueGray-200 bg-yellow-400 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalEdit(false)}
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
