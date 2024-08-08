import { createDocument } from "@/actions/document-action";
import { DocumentSchema } from "@/src/schema";
import { currentDate } from "@/src/utils/currentDate";
import { Dispatch, SetStateAction, useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { toast } from "react-toastify";

type DocumentUploaderProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function DocumentUploader({
  setShowModal,
}: DocumentUploaderProps) {
  const [file, setFile] = useState<File | null>();

  const handleActionSubmit = async (formData: FormData) => {

    const filename = file ? `${currentDate()}_${file.name}` : "defaultFile";

    const filePath = `./public/uploads/${filename}`;

    file ? formData.append("file", filePath) : formData.append("file", "");
    
    const data = {
      name: formData.get("name"),
      date: formData.get("date"),
      regisNumber: formData.get("registrationNumber"),
      path: formData.get("file"),
    }
    
    const result = DocumentSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      })
      return
    }
    
    const response = await createDocument(data)
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return
    }


  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <>
      <form action={handleActionSubmit}>
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
                name="name"
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
                name="date"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="registrationNumber" className="font-bold">
                Nº Registro:
              </label>
              <input
                id="registrationNumber"
                type="text"
                className="h-8 w-fit border border-black text-center rounded-md"
                placeholder="RS/RE00000"
                name="registrationNumber"
              />
            </div>
          </div>
          {file ? (
            <div className="flex justify-between items-center w-full mt-4 ">
              <p className="flex items-center m-2 gap-3 truncate">
                <BsFileEarmarkPdf className="text-red-600 size-8 cursor-pointer" />
                <span className="truncate">{file.name}</span>
              </p>

              <button
                onClick={handleFileRemove}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Eliminar
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-16 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-200"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-4">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">
                      Has Click para subir un archivo
                    </span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
              </label>
            </div>
          )}
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
    </>
  );
}
