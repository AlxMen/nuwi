import { Dispatch, SetStateAction } from "react";


type EditProjectProps = {
  modalEdit: boolean;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
};

export default function EditProject({ modalEdit, setModalEdit }: EditProjectProps) {
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
                <form action="" className="grid grid-cols-2 bg-slate-100">
                  <div className="relative p-6 flex-auto ">
                    <label
                      id="name"
                      className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                    >
                      Nombre del Proyecto:
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="h-7 w-full border border-black rounded-md text-center"
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
                    >
                      <option value="">-- estado Actual --</option>
                      <option value="">Presentación</option>
                      <option value="">Subsanación</option>
                      <option value="">Inicio</option>
                      <option value="">En Proceso</option>
                      <option value="">Paralizado</option>
                      <option value="">Cancelado</option>
                      <option value="">Finalizado</option>
                    </select>
                  </div>
                </form>
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
                    type="button"
                    onClick={() => setModalEdit(false)}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
