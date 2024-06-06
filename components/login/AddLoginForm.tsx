"use client";

export default function AddLoginForm({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  
  return (
    <>
      <div className="bg-white border-8 border-yellow-400 mt-28 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form className="space-y-5">
          {children}
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-xl"
            value="Iniciar Sesion"
          />
        </form>
      </div>
    </>
  );
}
