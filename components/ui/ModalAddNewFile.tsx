"use client";
import { useState } from "react";

export default function ModalAddNewFile() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="block text-white bg-green-600 hover:bg-green-800 focus:bg-green-800 font-bold rounded-xl border-2 border-w text-lg p-2 text-center "
        onClick={() => setShowModal(true)}
        type="button"
      >
        Agregar
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative xl:w-2/5 w-4/5 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-black border-blueGray-200 rounded-t bg-blue-800 text-white">
                  <h3 className="text-3xl font-semibold">Agregar Documento</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-white h-6 w-6 text-2xl block">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto bg-slate-100">
                  <form action="">
                    <div className="grid grid-cols-2 p-2 gap-8 mb-4">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold">
                          Nombre del documento:
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="h-8 w-full border border-black placeholder:text-center rounded-md"
                          placeholder="Nombre del Documento"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold">
                          Fecha:
                        </label>
                        <input
                          id="name"
                          type="date"
                          className="h-8 w-fit border border-black text-center rounded-md"
                          placeholder="Nombre del Documento"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold">
                          Nº Registro:
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="h-8 w-fit border border-black text-center rounded-md"
                          placeholder="RS/RE00000"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-26 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-200 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Has Click para subir un archivo
                            </span>{" "}
                            o Arrastralo
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-black bg-yellow-400 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Añadir Documento
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
