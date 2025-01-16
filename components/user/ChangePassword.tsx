"use client";

import { changePasswordUser } from "@/actions/login-user-action";
import { useMyContext } from "@/src/context/DataProvaider";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePassword() {
  /* `const {dataGlobal} = useMyContext()` está utilizando el gancho `useMyContext` para acceder a los datos globales almacenados en el proveedor de contexto y desestructurando la variable `dataGlobal` de este. Esto permite que el componente acceda y utilice los datos globales dentro del contexto. */
  const { dataGlobal } = useMyContext();
  const [showModal, setShowModal] = useState(false);
  /**
   * La función `handleSubmitAction` maneja el envío de formularios para cambiar la contraseña de un usuario,
   * realiza validaciones y muestra mensajes de error o éxito apropiados.
   * @param {FormData} formData - El parámetro `formData` en la función `handleSubmitAction` es de tipo FormData, que es un objeto JavaScript integrado que se utiliza para representar datos de formulario al enviarlo mediante una solicitud HTTP. Se utiliza comúnmente junto con la API `FormData` para construir y enviar fácilmente datos de formulario en un formato estructurado
   * @returns La función `handleSubmitAction` devuelve distintos mensajes en función de determinadas condiciones:
   * - Si la nueva contraseña no cumple los criterios requeridos (al menos 8 caracteres, incluida una letra mayúscula, una letra minúscula y un número), devuelve un mensaje de error sobre los requisitos de la contraseña.
   * - Si la nueva contraseña no coincide con la contraseña confirmada, devuelve un mensaje de error que indica que las contraseñas no son iguales.
   */
  const handleSubmitAction = async (formData: FormData) => {
    /* El fragmento de código `const data = { newPassword: formData.get("newPassword") as string,  confirmPassword: formData.get("confirmPassword") as string, };` está creando un objeto llamado `data` con dos propiedades: `newPassword` y `confirmPassword`.*/
    const data = {
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    /* El fragmento de código `if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.newPassword))` está realizando una comprobación de validación en el campo `newPassword` para garantizar que cumple con ciertos criterios. */
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.newPassword)) {
      toast.error(
        "La Contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número"
      );
      return;
    }
    /* El bloque de código `if (data.newPassword !== data.confirmPassword) { toast.error("Las Contraseñas no son iguales"); return; }` está verificando si la nueva contraseña ingresada por el usuario no coincide con la contraseña confirmada. Si las dos contraseñas no coinciden, muestra un mensaje de error usando la función `toast.error` indicando que las contraseñas no son iguales y luego sale inmediatamente de la función usando `return;` para evitar la ejecución posterior del proceso de cambio de contraseña. Esta validación asegura que el usuario confirme la nueva contraseña correctamente antes de continuar con la acción de cambio de contraseña. */
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Las Contraseñas no son iguales");
      return;
    }
    /* El fragmento de código `const pass = { password: data.newPassword };` crea un objeto llamado `pass` con una propiedad `password` a la que se le asigna el valor `data.newPassword`. Este objeto se utiliza para estructurar los datos que se enviarán como parte de la solicitud para cambiar la contraseña del usuario. Al asignar la nueva contraseña ingresada por el usuario a la propiedad `password` en el objeto `pass`, se prepara el formato de datos específico requerido para la funcionalidad de cambio de contraseña. Estos datos estructurados se utilizarán luego en la llamada API posterior para actualizar la contraseña del usuario. */
    const pass = {
      password: data.newPassword,
    };
    /* El fragmento de código `const response = await changePasswordUser(pass, dataGlobal.id);` realiza una llamada asincrónica a la función `changePasswordUser` con el objeto `pass` que contiene la nueva contraseña y `dataGlobal.id` que representa el ID del usuario. Esta función es responsable de cambiar la contraseña del usuario. */
    const response = await changePasswordUser(pass, dataGlobal.id);

    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    } else {
      toast.success(response?.message);
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue-700 w-2/3 h-10 text-white font-bold text-lg shadow-lg rounded-lg cursor-pointer hover:bg-blue-900 hover:shadow-xl hover:border-blue-500 hover:border-2"
        onClick={() => setShowModal(true)}
      >
        Cambiar Contraseña
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative xl:w-2/5 w-4/5 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-black border-blueGray-200 rounded-t bg-blue-800 text-white">
                  <h3 className="text-3xl font-semibold">Cambiar Contraseña</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-white h-6 w-6 text-2xl block">X</span>
                  </button>
                </div>
                {/*body*/}
                <form action={handleSubmitAction}>
                  <div className="relative p-6 flex flex-col gap-5 bg-slate-100">
                    <div className="flex flex-col justify-center items-center gap-3">
                      <label htmlFor="password" className="text-2xl font-bold">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="border border-black rounded-md text-center h-8 w-2/3"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <label
                        htmlFor="passwordRepit"
                        className="text-2xl font-bold"
                      >
                        Repetir Contraseña
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="border border-black rounded-md text-center h-8 w-2/3"
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-black bg-yellow-400 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                    <input
                      className="bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      value={"Guardar Contraseña"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
