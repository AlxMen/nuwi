

export default async function LoginForm() {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="name" className="text-slate-700 font-bold">
          Usuario:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="block w-full p-3 bg-white rounded border border-slate-800"
          placeholder="Nombre de Usuario"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-slate-700 font-bold">
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
    </>
  );
}
