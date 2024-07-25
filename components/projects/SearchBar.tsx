"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
export default function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()
  
  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`)
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscador de Proyectos"
        onChange={(e) => handleSearch(e.target.value)}
        className="border-2 border-black rounded-md text-xl w-2/5 placeholder:text-center text-center"
        defaultValue={searchParams.get('search')?.toString()}
      />
    </>
  );
}
