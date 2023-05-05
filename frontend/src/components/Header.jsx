import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const Navigate = useNavigate();
  const handleSessionClose = () => {
    localStorage.removeItem("token");
    return Navigate("/");
  };
  return (
    <header className="px-4 py-5 bg-sky-800 text-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-2xl font-bold text-center">ProTaskManagment</h2>
        <div className="space-x-2">
          <Link to={"/projects"} className="">
            Proyectos
          </Link>
          <button
            className="bg-white text-black px-5 py-1 rounded-md hover:bg-sky-600 hover:text-gray-100 transition-colors font-bold"
            onClick={handleSessionClose}
          >
            Cerrar Sesion
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
