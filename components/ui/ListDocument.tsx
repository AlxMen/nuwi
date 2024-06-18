import React from 'react'
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { FaEllipsisVertical } from 'react-icons/fa6';

export default function ListDocument() {
  return (
    <div className="bg-yellow-100 max-h-[calc(100vh-11rem)] border border-black w-5/6 p-2 space-y-3 overflow-y-auto">
      <div className="bg-white h-12 w-full border-b-2 border-black shadow-xl flex justify-between p-2">
        <div className="flex items-center gap-2">
          <BsFileEarmarkPdf className="text-red-600 size-8" />
          <h1 className="hover:underline hover:cursor-pointer hover:italic hover:text-sky-500">
            {"aaaa/mm/dd"}_{"Nº Registro"}_{"nombre del documento"}
          </h1>
        </div>
        <button>
          <FaEllipsisVertical />
        </button>
      </div>
    </div>
  );
}
