import Image from "next/image";
import { Category } from "@prisma/client";
import Link from "next/link";

type CategoriesProps = {
  category: Category;
};

export default function Categories({ category }: CategoriesProps) {

  console.log(category.slug);
  
  return (
    <Link
      href={`/home/${category.slug}`}
      className={`first-of-type:rounded-t-md flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b hover:bg-yellow-400`}
    >
      <div className="h-12 w-12 relative">
        <Image
          fill
          src={`/${category.index}.png`}
          alt="Icono de la categoria"
        />
      </div>
      <p className="text-xl font-bold">
        {category.name}
      </p>
    </Link>
  );
}
