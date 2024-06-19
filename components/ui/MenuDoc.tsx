import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Dispatch, SetStateAction, useState } from "react";
import DeleteConfirm from "./DeleteConfirm";

type MenuDocProps = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

export default function MenuDoc({ setModal }: MenuDocProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuButton className="text-lg">
          <FaEllipsisVertical />
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
              <button className="group bg-blue-700 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-800">
                Abrir
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="group bg-green-600 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-green-700"
                onClick={() => setModal(true)}
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
      <DeleteConfirm open={open} setOpen={setOpen} />
    </>
  );
}
