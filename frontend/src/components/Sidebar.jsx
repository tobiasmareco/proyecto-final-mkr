import React from "react";
import { Link } from "react-router-dom";
import { RiFolderAddLine, RiFileAddLine } from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";
function Sidebar() {
  const { auth } = useAuth();
  return (
    <aside className="md:w-60 lg:w-80 px-5 py-4">
      <p className="text-base font-bold">
        Bienvenido:{" "}
        <span className="text-sky-800 font-bold text-sm">{auth.name}</span>
      </p>
      <Link
        to={"create-project"}
        className="flex items-center text-center gap-2 text-lg bg-sky-800 font-bold px-5 py-1 mt-3 rounded-md text-white  hover:bg-sky-600 transition-colors"
      >
        <RiFolderAddLine /> Crear Proyecto
      </Link>
    </aside>
  );
}

export default Sidebar;
