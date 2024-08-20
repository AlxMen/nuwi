import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function Filter() {
  return (
    <div className="h-full bg-slate-300 border-r border-black w-1/6 p-2 ">
      <form action="" className="flex  flex-col gap-4">
        <input
          type="text"
          className="w-full h-8 border border-black placeholder:text-center text-center rounded-md"
          placeholder="Buscador"
        />

        <label htmlFor="order">Ordernado por:</label>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="name"
            id="name"
            value="Nombre"
            defaultChecked
          />
          <h3 className="flex items-center gap-1">
            Fecha <FaArrowDown />
          </h3>
        </div>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="name"
            id="name"
            value="Nombre"
          />
          <h3 className="flex items-center gap-1">
            Fecha <FaArrowUp />
          </h3>
        </div>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="name"
            id="name"
            value="Nombre"
          />
          <h3>Nº Expediente</h3>
        </div>
        <div className="flex items-center gap-2 w-full h-fit">
          <input
            className="size-5"
            type="radio"
            name="name"
            id="name"
            value="Nombre"
          />
          <h3>Nombre</h3>
        </div>
      </form>
    </div>
  );
}
