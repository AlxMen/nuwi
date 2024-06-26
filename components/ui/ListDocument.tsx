"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import MenuDoc from "./MenuDoc";
import EditDocument from "./EditDocument";

export default function ListDocument() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="bg-yellow-100 max-h-[calc(100vh-11rem)] border border-black w-5/6 p-2 space-y-3 overflow-y-auto">
        <div className="bg-white h-12 w-full border-b-2 border-black shadow-xl flex justify-between p-2">
          <div>
            <Link href={""} target="_blank" className="flex items-center gap-2">
              <BsFileEarmarkPdf className="text-red-600 size-8 cursor-pointer" />
              <h1 className="hover:underline hover:cursor-pointer hover:italic hover:text-sky-500">
                {"aaaa/mm/dd"}_{"Nº Registro"}_{"nombre del documento"}
              </h1>
            </Link>
          </div>
          <MenuDoc setModal={setModal} />
        </div>
      </div>
      <EditDocument modal={modal} setModal={setModal} />
    </>
  );
}
