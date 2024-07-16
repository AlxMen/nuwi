
import { prisma } from "@/src/lib/prisma";
import Categories from "@/components/ui/Categories";
import Image from "next/image";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <>
      <aside className="ml-3 mt-9 rounded-md h-4/5 w-52 bg-slate-100 flex flex-col justify-between border-2 border-blue-500 ">
        <nav>
          {categories.map((category) => (
            <Categories key={category.index} category={category} />
          ))}
        </nav>
        <div>&#169;copyright</div>
      </aside>
      <div className="ml-2 mt-9 h-4/5 xl:w-full xl:mr-3 w-3/4 text-white flex flex-col justify-center items-center">
        <p className="text-7xl text-center font-bold">Bienvenido/a</p>
        <div className="h-96 w-96 relative">
          <Image fill src={"/NuWi1.png"} alt="imagen" />
        </div>
        <p className="text-7xl text-center font-bold">
          <span className="italic font-black">{`"nombre de usuario"`}</span>
        </p>
      </div>
    </>
  );
}
