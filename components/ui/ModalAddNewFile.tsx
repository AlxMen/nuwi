"use client";
import { useState } from "react";
import DocumentUploader from "./DocumentUploader";


export default function ModalAddNewFile() {
  const [showModal, setShowModal] = useState(false);
  /*
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
  */
  
  

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   field: keyof FormData
  // ) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: e.target.value,
  //   }));
  // };

  // const handleFileChange = (file: File | null) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     file,
  //   }));
  // };

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

                <DocumentUploader
                  setShowModal={setShowModal}
                />
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
