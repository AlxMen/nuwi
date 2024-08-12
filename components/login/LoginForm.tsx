"use client";

import { UserSchema } from "@/src/schema";
import { redirect } from "next/navigation";
import { loginUser } from "@/actions/login-user-action";
import { toast } from "react-toastify";
import { useMyContext } from "@/src/context/DataProvaider";

export default function LoginForm() {

  const { triggerEffect } = useMyContext()

  const handleActionSubmit = async (formData: FormData) => {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = UserSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await loginUser(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    if (response?.token) {
      toast.success("Sesión Iniciada Correctamente");
      localStorage.setItem("token", response.token);
      redirect("/home");
    }
  };

  return (
    <>
      <div className="bg-white border-8 border-yellow-400 mt-28 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form className="space-y-5" action={handleActionSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-slate-700 text-2xl font-bold"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="block w-full p-3 bg-white rounded border border-slate-800"
              placeholder="Email de Usuario"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-slate-700 text-2xl font-bold"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full p-3 bg-white rounded border border-slate-800"
              placeholder="Introduzca la Contraseña"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-xl"
            onClick={triggerEffect}
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </>
  );
}
