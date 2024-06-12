import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function NavBar() {

  return (
    <>
      <div className="flex p-1 gap-2">
        <Link
          href={"/home"}
          className="h-15 w-30 p-2 content-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <p className="text-center text-xl font-bold flex items-center justify-center gap-2">
            {" "}
            <FaHome /> Home
          </p>
        </Link>
        <Link
          href={`/home/programs`}
          className="h-15 w-30 p-2 content-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <p className="text-center text-xl font-bold flex items-center justify-center">
            {" "}
            Programas
          </p>
        </Link>
        <Link
          href={`/home/plans`}
          className="h-15 w-30 p-2 content-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <p className="text-center text-xl font-bold flex items-center justify-center">
            {" "}
            Planes
          </p>
        </Link>
      </div>
    </>
  );
}
