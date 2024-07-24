import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="bg-blue-900 w-screen h-32 shadow-lg flex justify-between items-center border-b-4 border-white rounded-b-lg">
        <div className="relative h-32 w-52 ml-2 mb-6">
          <Image
            width={150}
            height={100}
            style={{ objectFit: "contain" }}
            src={"/NuWi1.png"}
            alt="logo del programa"
          />
        </div>
        <h1 className="text-white text-4xl font-black mr-20">
          Gestor De Documentos
        </h1>
        <div className="h-18 w-18 mr-2">
          <Image
            width={110}
            height={100}
            style={{ objectFit: "contain" }}
            src={"/CGC.png"}
            alt="logo del programa"
          />
        </div>
      </header>
    </>
  );
}
