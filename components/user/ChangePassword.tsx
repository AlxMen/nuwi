"use client"

import { useState } from "react";

export default function ChangePassword() {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        type="button"
        className="bg-blue-700 w-full h-10 text-white font-bold text-lg shadow-lg rounded-lg cursor-pointer hover:bg-blue-900 hover:shadow-xl hover:border-blue-500 hover:border-2"
        onClick={() => setShowModal(true)}
      >
        Cambiar Contraseña
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative xl:w-2/5 w-4/5 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-black border-blueGray-200 rounded-t bg-blue-800 text-white">
                  <h3 className="text-3xl font-semibold">Cambiar Contraseña</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-white h-6 w-6 text-2xl block">X</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto bg-slate-100">
                  <form action="" className="grid gap-4">
                    <div className="flex flex-col justify-center items-center gap-3">
                      <label htmlFor="password" className="text-2xl font-bold">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="border border-black rounded-md h-8 w-2/3"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <label
                        htmlFor="passwordRepit"
                        className="text-2xl font-bold"
                      >
                        Repetir Contraseña
                      </label>
                      <input
                        type="password"
                        id="passwordRepit"
                        className="border border-black rounded-md h-8 w-2/3"
                      />
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
                    Cerrar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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
