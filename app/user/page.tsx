"use client";

import { updateUserData } from "@/actions/login-user-action";
import ChangePassword from "@/components/user/ChangePassword";
import { useMyContext } from "@/src/context/DataProvaider";
import { UserChangeSchema } from "@/src/schema";
import React from "react";
import { toast } from "react-toastify";

export default function UserPage() {
  /* `const { dataGlobal } = useMyContext();` está usando el gancho `useMyContext` para acceder al objeto `dataGlobal` desde el contexto proporcionado por el proveedor de contexto `DataProvaider`. Este objeto probablemente contiene datos globales que se están usando dentro del componente `UserPage`, como información del usuario como nombre, correo electrónico, número de extensión y rol. Al desestructurar `dataGlobal` del resultado de `useMyContext()`, el componente puede acceder y usar estos datos globales dentro de su lógica de representación. */
  const { dataGlobal } = useMyContext();

  /**
   * La función `handleActionSubmit` procesa datos del formulario, los valida utilizando un esquema, actualiza los datos del usuario y muestra mensajes de éxito o error mediante notificaciones emergentes.
   * @param {FormData} formData - El parámetro `formData` de la función `handleActionSubmit` es de tipo FormData, que se utiliza normalmente para recopilar datos de formularios en un formato de par clave-valor. En este caso, la función extrae los valores "nombre" y "correo electrónico" del objeto FormData para crear un objeto de datos.
   * @returns La función `handleActionSubmit` devuelve un mensaje de éxito "Datos actualizados correctamente" si los datos se actualizaron correctamente, o devuelve mensajes de error utilizando `toast.error` para cualquier problema de validación o error encontrado durante el proceso.
   */
  const handleActionSubmit = async (formData: FormData) => {
    /* El fragmento de código `const data = { name: formData.get("name"), email: formData.get("email") };` está creando un objeto llamado `data` con propiedades `name` y `email`. Está extrayendo los valores de los campos de formulario con los nombres "name" y "email" del objeto `formData` y asignándolos a las propiedades respectivas en el objeto `data`. */
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    /* `const result = UserChangeSchema.safeParse(data);` está utilizando el método `safeParse` proporcionado por el esquema `UserChangeSchema` para validar el objeto `data` con respecto al esquema definido en `UserChangeSchema`. Es probable que este método se utilice para garantizar que los datos extraídos de los campos del formulario cumplan con la estructura y los tipos de datos esperados definidos en el esquema antes de intentar actualizar los datos del usuario. */
    const result = UserChangeSchema.safeParse(data);

    /* El fragmento de código `if (!result.success) { result.error.issues.forEach((issue) => { toast.error(issue.message); }); return; }` maneja el escenario donde la validación de los datos extraídos de los campos del formulario falla según el esquema definido en `UserChangeSchema`. */
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    /* El fragmento de código `const response = await updateUserData(result.data, dataGlobal.id);` llama a la función `updateUserData` con los datos validados `result.data` y el ID del usuario `dataGlobal.id`. Es probable que esta función envíe una solicitud para actualizar los datos del usuario en el servidor. */
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
