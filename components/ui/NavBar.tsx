
import { getCategory } from "@/actions/project-action";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

type dataParams = {
  category: string;
};
export default async function NavBar({ category }: dataParams) {
  const categories = await getCategory();
  return (
    <>
      <div className="flex p-1 gap-2">
        <Link
          href={"/home"}
          className="h-15 w-30 p-2 content-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <p className="text-center text-xl font-bold flex items-center justify-center gap-2">
            {" "}
            <FaHome /> Home
          </p>
        </Link>
        {categories.map((cat) =>
          cat.slug !== category ? (
            <Link
              key={cat.index}
              href={`/home/${cat.slug}`}
              className="h-15 w-30 p-2 content-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <p className="text-center text-xl font-bold flex items-center justify-center gap-2">
                {cat.name}
              </p>
            </Link>
          ) : null
        )}
      </div>
    </>
  );
}
