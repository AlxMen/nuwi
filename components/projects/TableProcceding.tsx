import React from "react";
import { redirect } from "next/navigation";
import CardProjects from "./CardProjects";
import { projects } from "@/src/types";
import {
  getProjectByCategoryAndQuery,
  getProjectCount,
} from "@/actions/project-action";
import PaginationPages from "./PaginationPages";
import RegisterNoFound from "../ui/RegisterNoFound";

export default async function TableProcceding({
  category,
  query,
  currentPage,
}: {
  category: string;
  query: string;
  currentPage: number;
  }) {
  
  
  const proccedings = getProjectByCategoryAndQuery(
    category,
    query,
    currentPage
  );
  const totalProject = getProjectCount(query, category);

  const [dataProcced, total] = await Promise.all([proccedings, totalProject]);
  const pages = Math.ceil(total / 10); 
  if (dataProcced.length === 0 && query) {
    redirect(`/home/${category}?page=1&search=${query}`);  
  }

  return (
    <>
      {dataProcced.length ? (
        <>
          <div className="xl:grid xl:grid-cols-2 h-full w-full bg-slate-100 p-4 xl:gap-6 overflow-y-auto">
            {dataProcced.map((pro) => (
              <CardProjects key={pro.id} info={pro as projects} />
            ))}
          </div>
          <PaginationPages page={currentPage} total={pages} />
        </>
      ) : (
        <RegisterNoFound />
      )}
    </>
  );
}
