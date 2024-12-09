"use client";

import { UserSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/login-user-action";
import { toast } from "react-toastify";
import { useMyContext } from "@/src/context/DataProvaider";

/**
 * Formulario de Inicio de sesión
 * @returns
 */

export default function LoginForm() {
  const { dataUserLogin } = useMyContext();
  const { push } = useRouter();

  /**
   * 
   * @param formData Funcion para recojer los datos introducidos en el formulario para comprobar si existen en la base de datos o no; aparte de controla el tipo de datos que se introducen en el formulario y una vez pasado todos los controles y verificado la existencia de ese usuario hace un redireccionamiento hacia la pagina principal. 
   * @returns 
   */

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
      dataUserLogin(response.token);
      localStorage.setItem("token", response.token);
      push("/home");
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
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </>
  );
}
