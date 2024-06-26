"use client"
import CardProjects from "@/components/projects/CardProjects";
import CreateNewProject from "@/components/projects/CreateNewProject";
import EditProject from "@/components/projects/EditProject";
import NavBar from "@/components/ui/NavBar";
import { useStore } from "@/src/store";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function ProjectPage() {

  const projects = useStore((state) => state.projects)
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);


  return (
    <>
      <div className="w-full flex flex-col m-2  rounded-lg border-4 border-yellow-400">
        <div className="flex justify-between h-14 bg-slate-100 border-b-2 p-1 gap-2 border-black w-full">
          <NavBar />
          <input
            type="text"
            placeholder="Buscador de Proyectos"
            className="border-2 border-black rounded-md text-xl w-2/5 placeholder:text-center text-center"
          />
          <button
            className="h-15 w-30 p-2 border content-center text-white bg-green-500  rounded-xl hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            <p className="text-center text-xl font-bold flex items-center justify-center gap-2">
              <FaPlus /> Nuevo
            </p>
          </button>
        </div>
        <div className="xl:grid xl:grid-cols-2 h-full w-full bg-slate-100 p-4 xl:gap-6 overflow-y-auto">
          <CardProjects setModal={setShowModalEdit} />
          
        </div>
      </div>
      <CreateNewProject showModal={showModal} setShowModal={setShowModal} />
      <EditProject showModal={showModalEdit} setShowModal={setShowModalEdit} />
    </>
  );
}
