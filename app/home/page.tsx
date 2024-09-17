import Categories from "@/components/ui/Categories";
import Body from "@/components/home/Body";
import { getCategory } from "@/actions/project-action";

export default async function HomePage() {
  const categories = await getCategory();
  return (
    <>
      <aside className="ml-3 mt-9 rounded-md h-4/5 w-52 bg-slate-100 flex flex-col justify-between border-2 border-blue-500 ">
        <div>
          {categories.map((category) => (
            <Categories key={category.index} category={category} />
          ))}
        </div>
        <div>&#169;copyright</div>
      </aside>
      <Body />
    </>
  );
}
