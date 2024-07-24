
import CardProjects from "@/components/projects/CardProjects";
import CreateNewProject from "@/components/projects/CreateNewProject";
import NavBar from "@/components/ui/NavBar";


export default function ProjectPage({ params }: { params: { category: string } }) {

  return (
    <>
      <div className="w-full flex flex-col m-2  rounded-lg border-4 border-yellow-400">
        <div className="flex justify-between h-14 bg-slate-100 border-b-2 p-1 gap-2 border-black w-full">
          <NavBar category={params.category} />
          <input
            type="text"
            placeholder="Buscador de Proyectos"
            className="border-2 border-black rounded-md text-xl w-2/5 placeholder:text-center text-center"
          />
          <CreateNewProject />
        </div>
        <div className="xl:grid xl:grid-cols-2 h-full w-full bg-slate-100 p-4 xl:gap-6 overflow-y-auto">
          <CardProjects />
        </div>
      </div>
    </>
  );
}
