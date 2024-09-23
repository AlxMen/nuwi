"use client";

import { updateUserData } from "@/actions/login-user-action";
import ChangePassword from "@/components/user/ChangePassword";
import { useMyContext } from "@/src/context/DataProvaider";
import { UserChangeSchema } from "@/src/schema";
import React from "react";
import { toast } from "react-toastify";

export default function UserPage() {
  const { dataGlobal } = useMyContext();

  const handleActionSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    const result = UserChangeSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await updateUserData(result.data, dataGlobal.id);

    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success("Datos actualizados correctamente");
  };

  return (
    <>
      <div className="h-full w-full p-3 flex justify-center">
        <div className="h-full w-4/6 bg-slate-100 rounded-md border-2 border-yellow-300 flex flex-col justify-center items-center space-y-24">
          <form
            action={handleActionSubmit}
            className="flex flex-col bg-yellow-300 w-1/3 md:w-2/3 h-2/3 rounded-lg shadow-lg border-2 border-slate-900 justify-between p-4 items-center"
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col space-y-2 w-full">
                <label htmlFor="name" className="font-bold text-xl">
                  Nombre de Usuario:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-black rounded-md h-9 w-full text-center"
                  defaultValue={dataGlobal.name}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-bold text-xl ">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-black rounded-md h-9 text-center"
                  defaultValue={dataGlobal.email}
                />
              </div>
              <div className="flex flex-col text-xl font-bold gap-6 mt-3">
                <label>
                  Nº Extencion:{" "}
                  <span className="text-lg font-normal italic ">
                    {dataGlobal.ext}
                  </span>
                </label>
                <label>
                  Puesto:{" "}
                  <span className="text-lg font-normal italic ">
                    {dataGlobal.role}
                  </span>
                </label>
              </div>
            </div>

            <input
              type="submit"
              className="bg-blue-700 w-3/4 h-10 text-white font-bold text-2xl shadow-lg rounded-lg cursor-pointer hover:bg-blue-900 hover:shadow-xl hover:border-blue-500 hover:border-2"
              value={"Guardar Cambios"}
            />
          </form>
          <ChangePassword />
        </div>
      </div>
    </>
  );
}
