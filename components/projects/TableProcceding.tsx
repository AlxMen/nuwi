import { getProjectByCategory } from "@/src/store";
import React from "react";
import CardProjects from "./CardProjects";
import { projects } from "@/src/types";

export default async function TableProcceding({
  category,
}: {
  category: string;
}) {
  const proccedings = await getProjectByCategory(category);

  return (
    <div className="xl:grid xl:grid-cols-2 h-full w-full bg-slate-100 p-4 xl:gap-6 overflow-y-auto">
      {proccedings.map((pro) => (
        <CardProjects key={pro.id} info={pro as projects} />
      ))}
    </div>
  );
}
