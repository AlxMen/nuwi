import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="bg-blue-900 w-full h-32 gap-4 shadow-lg grid grid-cols-3 items-center border-b-4 border-white rounded-b-lg">
        <div className="relative h-32 w-52">
          <Image
            fill
            style={{ objectFit: "contain" }}
            src={"/NuWi1.png"}
            alt="logo del programa"
          />
        </div>
        <h1 className="text-white text-4xl font-black text-center">
          Gestor De Documentos
        </h1>
        <div className="relative start-2/4 xl:start-3/4 xs:start-1/4 h-16 w-16">
          <Image
            fill
            style={{ objectFit: "contain" }}
            src={"/CGC.png"}
            alt="logo del programa"
          />
        </div>
      </div>
    </>
  );
}
