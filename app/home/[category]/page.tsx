import CardProjects from "@/components/projects/CardProjects";
import CreateNewProject from "@/components/projects/CreateNewProject";
import SearchBar from "@/components/projects/SearchBar";
import TableProcceding from "@/components/projects/TableProcceding";
import NavBar from "@/components/ui/NavBar";
import { getProjectByCategory } from "@/src/store";
import { projects } from "@/src/types";
import { Suspense } from "react";

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: {
    search?: string;
    page?: string;
  };
}) {
  const query = Number(searchParams?.page) || 1;
  const currentPage = searchParams?.search || "";

  

  return (
    <>
      <div className="w-full flex flex-col m-2  rounded-lg border-4 border-yellow-400">
        <div className="flex justify-between h-14 bg-slate-100 border-b-2 p-1 gap-2 border-black w-full">
          <NavBar category={params.category} />
          <SearchBar />
          <CreateNewProject category={params.category} />
        </div>
        <TableProcceding category={params.category} />
      </div>
    </>
  );
}
