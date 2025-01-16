"use client";

import { UserSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/login-user-action";
import { toast } from "react-toastify";
import { useMyContext } from "@/src/context/DataProvaider";

export default function LoginForm() {
  /* `const { dataUserLogin } = useMyContext();` está usando el gancho `useMyContext` para acceder a la función `dataUserLogin` desde el proveedor de contexto. Es probable que esta función se use para actualizar el estado de inicio de sesión del usuario o almacenar datos del usuario en el contexto. */
  const { dataUserLogin } = useMyContext();
  const { push } = useRouter();

  /**
   * La función `handleActionSubmit` procesa los datos del formulario para el inicio de sesión del usuario, los valida utilizando un esquema y maneja las respuestas de éxito o error según corresponda.
   * @param {FormData} formData - El parámetro `formData` en la función `handleActionSubmit` es de tipo FormData, que es un objeto JavaScript integrado que se utiliza para representar datos de formulario al enviarlo a través de un formulario HTML. Contiene pares clave-valor que representan campos de formulario y sus valores. En esta función, el objeto es `formData`
   * @returns La función `handleActionSubmit` devuelve diferentes cosas según ciertas condiciones
   */
  const handleActionSubmit = async (formData: FormData) => {
    /* El fragmento de código `const data = { email: formData.get("email"), password: formData.get("password") };` extrae los valores de los campos "email" y "password" de un objeto FormData. */
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    /* `const result = UserSchema.safeParse(data);` está utilizando el método `safeParse` proporcionado por el esquema `UserSchema` para validar el objeto `data` con respecto al esquema definido en `UserSchema`. Es probable que este método se utilice para garantizar que los datos proporcionados para el inicio de sesión del usuario (correo electrónico y contraseña) se ajusten a la estructura y al formato esperados definidos en el esquema antes de continuar con el proceso de inicio de sesión. */
    const result = UserSchema.safeParse(data);

    /* El fragmento de código `if (!result.success) { ... }` verifica si la validación de los datos con respecto al `UserSchema` no fue exitosa. Si la validación falla, significa que los datos proporcionados para el inicio de sesión del usuario (correo electrónico y contraseña) no se ajustan a la estructura y el formato esperados definidos en el esquema. */
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    /* El fragmento de código que proporcionaste maneja la respuesta después de intentar iniciar sesión con un usuario llamando a la función `loginUser` con los datos del usuario. Aquí se muestra un desglose de lo que hace el código: */
    const response = await loginUser(data);
    /* El fragmento de código `if (response?.errors) { ... }` verifica si el objeto `response` tiene una propiedaddenominada `errors` mediante encadenamiento opcional (`?.`). Si la propiedad `errors` existe en el objeto `response`, significa que se encontraron errores durante el proceso de inicio de sesión. */
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
