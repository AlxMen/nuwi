"use client"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import DeleteConfirm from "./DeleteConfirm";
import Link from "next/link";
import EditProject from "../projects/EditProject";
import { projects } from "@/src/types";

export default function MenuCard({ info }: {info: projects}) {

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false);
  
  return (
    <>
      <Menu>
        <MenuButton className="text-white text-4xl">
          <BsList />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl shadow-2xl bg-white p-1 space-y-2 text-white text-md [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <Link
                href={"/home/projects/1"}
                className="group bg-blue-700 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-800"
              >
                Abrir
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                className="group bg-green-600 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-green-700"
                onClick={() => setOpenEdit(true)}
              >
                Editar
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="group bg-red-600 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-700"
                onClick={() => setOpen(true)}
              >
                Eliminar
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
      <DeleteConfirm open={open} setOpen={setOpen} id={info.id} />
      <EditProject modalEdit={openEdit} setModalEdit={setOpenEdit} id={info.id} name={info.name} status={info.status} />
    </>
  );
}
