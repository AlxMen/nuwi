"use client";
import { useState } from "react";
import DocumentUploader from "./DocumentUploader";

type FormData = {
  name: string;
  date: string;
  registrationNumber: string;
  file: File | null;
};
export default function ModalAddNewFile() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    date: "",
    registrationNumber: "",
    file: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    console.log(formData);

    if (formData.file) {
      try {
        // Subir el archivo al API
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData.file,
        });

        if (response.ok) {
          const { filePath } = await response.json();
          console.log("Archivo subido correctamente:", filePath);
        } else {
          try {
            const errorData = await response.json();
            console.error("Error al subir el archivo:", errorData.message);
          } catch (parseError) {
            console.error(
              "Error al procesar la respuesta de la API:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error al subir el archivo:", (error as Error).message);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
  };

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
                <form onSubmit={handleSubmit}>
                  <div className="relative p-6 flex-auto bg-slate-100">
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
                          value={formData.name}
                          onChange={(e) => handleInputChange(e, "name")}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="date" className="font-bold">
                          Fecha:
                        </label>
                        <input
                          id="date"
                          type="date"
                          className="h-8 w-fit border border-black text-center rounded-md"
                          value={formData.date}
                          onChange={(e) => handleInputChange(e, "date")}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="registrationNumber"
                          className="font-bold"
                        >
                          Nº Registro:
                        </label>
                        <input
                          id="registrationNumber"
                          type="text"
                          className="h-8 w-fit border border-black text-center rounded-md"
                          placeholder="RS/RE00000"
                          value={formData.registrationNumber}
                          onChange={(e) =>
                            handleInputChange(e, "registrationNumber")
                          }
                        />
                      </div>
                    </div>
                    <DocumentUploader
                      file={formData.file}
                      setFile={handleFileChange}
                    />
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
                      type="submit"
                    >
                      Añadir Documento
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
