import NavBar from "@/components/ui/NavBar";
import { FaPlus } from "react-icons/fa";

export default function ProjectPage() {
  return (
    <>
      <div className="w-full flex flex-col m-2  rounded-lg border-4 border-yellow-400">
        <div className="flex justify-between h-14 bg-slate-100 border-b-2 p-1 gap-2 border-black w-full">
          <NavBar />
          <button className="h-15 w-30 p-2 border content-center text-white bg-indigo-600  rounded-xl hover:bg-indigo-800">
            <p className="text-center text-xl font-bold flex items-center justify-center gap-2">
              <FaPlus /> Crear
            </p>
          </button>
        </div>
        <div className=" h-full w-full bg-slate-100 p-4 space-y-2 overflow-y-auto">
          <div className=" h-48 w-full bg-white rounded-xl shadow-lg border border-blue-300"></div>
        </div>
      </div>
    </>
  );
}
