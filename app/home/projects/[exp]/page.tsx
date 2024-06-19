import Filter from "@/components/ui/Filter";
import ListDocument from "@/components/ui/ListDocument";
import ModalAddNewFile from "@/components/ui/ModalAddNewFile";


export default function page() {
  return (
    <>
      <div className="w-full flex flex-col m-2  rounded-lg border-4 border-yellow-400 bg-slate-100">
        <div className="bg-blue-800 w-full h-14 flex justify-between border-b border-black">
          <div className="pl-2 text-white font-black text-md">
            <p>Nº expediente</p>
            <p className="text-2xl">Nombre del proyecto</p>
          </div>
          <div className="flex items-center gap-2 p-2">
            <ModalAddNewFile />
          </div>
        </div>
        <div className="flex h-full">
          <Filter />
          <ListDocument />
        </div>
      </div>
    </>
  );
}
