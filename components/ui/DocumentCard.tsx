"use client"
import Link from "next/link";
import { BsFileEarmarkPdf } from "react-icons/bs";
import MenuDoc from "./MenuDoc";
import { useState } from "react";
import EditDocument from "./EditDocument";
import { Document } from "@prisma/client";

export default function DocumentCard({info, category}: {info: Document, category: string}) {
  const [modal, setModal] = useState(false);
  const raiz = 'http://localhost:3000/'
  
  const url =raiz + info.path
  

  return (
    <div className="bg-white h-12 w-full border-b-2 border-black shadow-xl flex justify-between p-2">
      <div>
        <Link href={url} type="application/pdf" target="_blank" className="flex items-center gap-2">
          <BsFileEarmarkPdf className="text-red-600 size-8 cursor-pointer" />
          <h1 className="hover:underline hover:cursor-pointer hover:italic hover:text-sky-500">
            {info.date}_{info.regisNumber}_{info.name}
          </h1>
        </Link>
      </div>
      <MenuDoc setModal={setModal} path={url} id={info.id} />
      <EditDocument modal={modal} setModal={setModal} info={info} category={category} />
    </div>
  );
}
