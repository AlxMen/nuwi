import { updateProject } from "@/actions/project-action";
import { EditProjectSchema } from "@/src/schema";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

/**
 *El tipo EditProjectProps define las propiedades esperadas por un componente para editar un proyecto en una aplicación TypeScript React.
 * @property {boolean} modalEdit - La propiedad `modalEdit` es un valor booleano que indica si un modal para editar un proyecto está abierto actualmente o no.
 * @property setModalEdit - La propiedad `setModalEdit` es una función que se puede utilizar para actualizar el estado de la propiedad `modalEdit` en el componente padre. Es del tipo `Dispatch<SetStateAction<boolean>>`, lo que significa que es una función que puede realizar una acción para actualizar el estado
 * @property {string} name - La propiedad `name` del tipo `EditProjectProps` representa el nombre de un proyecto. Es un tipo de cadena que se utiliza para almacenar el nombre del proyecto que se está editando.
 * @property {string} status - La propiedad `status` del tipo `EditProjectProps` representa el estado de un proyecto. Es una propiedad de tipo cadena que contiene información sobre el estado actual del proyecto, como "En progreso", "Completado", "En espera", etc.
 * @property {string} id - La propiedad `id` del tipo `EditProjectProps` representa el identificador único de un proyecto. Es un tipo de cadena que se utiliza para identificar de forma única un proyecto específico dentro del sistema.
 */
type EditProjectProps = {
  modalEdit: boolean;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
  name: string;
  status: string;
  id: string;
};

export default function EditProject({
  modalEdit,
  setModalEdit,
  name,
  status,
  id,
}: EditProjectProps) {
  /**
   * La función `handleActionSubmit` procesa datos del formulario, los valida utilizando un esquema, actualiza un proyecto y muestra mensajes de éxito o error según corresponda.
   * @param {FormData} formData - El parámetro `formData` en la función `handleActionSubmit` es de tipo FormData, que normalmente se utiliza para representar datos que se envían en un formulario HTML. Contiene pares clave-valor de datos enviados a través del formulario. En esta función, `formData` se utiliza para extraer valores
   * @returns La función `handleActionSubmit` no devuelve nada (indefinido) o sale antes de tiempo con una declaración `return` si hay errores de validación o si hay errores en la respuesta de la función `updateProject`. Si todo es correcto, establece `modalEdit` en falso y muestra un mensaje de éxito usando `toast.success`.
   */
  const handleActionSubmit = async (formData: FormData) => {
    /* El objeto `const data` crea una estructura de datos que se utilizará para actualizar un proyecto. Incluye las propiedades `id`, `name` y `status`. */
    const data = {
      id: id,
      name: formData.get("name"),
      status: formData.get("status"),
    };

    /* `const result = EditProjectSchema.safeParse(data);` es una línea de código que utiliza una biblioteca de validación de esquemas para analizar y validar el objeto `data` contra el esquema definido en `EditProjectSchema`. */
    const result = EditProjectSchema.safeParse(data);

    /* El bloque de código `if (!result.success) { ... }` verifica si la validación de los datos con respecto al esquema no fue exitosa. Si la validación falla, significa que hay problemas con los datos que no se ajustan al esquema esperado definido en `EditProjectSchema`.*/
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    /* La línea `const response = await updateProject(data);` realiza una llamada asincrónica a la función `updateProject` con el objeto `data` como parámetro. La palabra clave `await` se utiliza para esperar a que se complete la operación asincrónica y devolver el resultado antes de continuar en el código. */
    const response = await updateProject(data);
    /* El código `if (response?.errors)` utiliza encadenamiento opcional (`?.`) para verificar si el objeto `response` existe y tiene una propiedad llamada `errors`. Si `response` existe y tiene `errors`, entonces procede a ejecutar el bloque de código dentro de la declaración `if`. */
    if (response?.errors) {
      toast.error(response.errors[0].message);
      return;
    }
    setModalEdit(false);
    toast.success("Proyecto actualizado exitosamente");
  };

  return (
    <>
      {modalEdit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 bg-blue-800 border-b-2 border-black border-blueGray-200 rounded-t">
                  <h3 className="text-white text-3xl font-bold">
                    Editar Proyecto {"Nº Expediente"}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl"
                    onClick={() => setModalEdit(false)}
                  >
                    <span className="text-white  font-bold h-6 w-6 text-2xl block">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form action={handleActionSubmit}>
                  <div className="grid grid-cols-2 bg-slate-100">
                    <div className="relative p-6 flex-auto ">
                      <label
                        id="name"
                        className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                      >
                        Nombre del Proyecto:
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="h-7 w-full border border-black rounded-md text-center"
                        defaultValue={name}
                      />
                    </div>
                    <div className="relative p-6 flex-auto ">
                      <label
                        id="status"
                        className="my-4 text-blueGray-500 text-lg leading-relaxed font-bold italic"
                      >
                        Estado:
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="w-full border border-black rounded-md h-7 text-center"
                        defaultValue={status}
                      >
                        <option value="">-- estado Actual --</option>
                        <option value="Presentación">Presentación</option>
                        <option value="Subsanación">Subsanación</option>
                        <option value="Inicio">Inicio</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Paralizado">Paralizado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-black border-solid border-blueGray-200 bg-yellow-400 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalEdit(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Guardar Cambios
                    </button>
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
