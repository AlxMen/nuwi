import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="bg-blue-900 w-full h-32 gap-4 shadow-lg flex justify-between items-center">
        <div className="relative h-32 w-52">
          <Image
            fill
            style={{ objectFit: "contain" }}
            src={"/NuWi1.png"}
            alt="logo del programa"
          />
        </div>
        <div className="mr-5 text-3xl text-white font-bold">
          Usuario
        </div>
      </div>
    </>
  );
}
