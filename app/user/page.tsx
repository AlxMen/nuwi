import ChangePassword from "@/components/user/ChangePassword";
import React from "react";

export default function page() {
  return (
    <>
      <div className="h-full w-full p-3 flex justify-center">
        <div className="h-full w-4/6 bg-slate-100 rounded-md border-2 border-yellow-300 flex flex-col justify-center items-center space-y-24">
          <form
            action=""
            className="flex flex-col bg-yellow-300 w-1/3 md:w-2/3 h-2/3 rounded-lg shadow-lg border-2 border-slate-900 justify-between p-4 items-center"
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col space-y-2 w-full">
                <label htmlFor="name" className="font-bold text-xl">
                  Nombre de Usuario:
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-black rounded-md h-9 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-bold text-xl ">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-black rounded-md h-9"
                />
              </div>
            </div>

            <ChangePassword />
          </form>
          <input
            type="submit"
            className="bg-blue-700 w-2/4 h-10 text-white font-bold text-2xl shadow-lg rounded-lg cursor-pointer hover:bg-blue-900 hover:shadow-xl hover:border-blue-500 hover:border-2"
            value={"Guardar Cambios"}
          />
        </div>
      </div>
    </>
  );
}
