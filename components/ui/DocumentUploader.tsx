import React, { Dispatch, SetStateAction, useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";

type DocumentProps = {
  file: File | null;
  setFile: (file: File | null) => void;
};

export default function DocumentUploader({ file, setFile }: DocumentProps) {

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
            className="flex flex-col items-center justify-center w-full h-26 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-200"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
          </label>
        </div>
      )}
    </>
  );
}
