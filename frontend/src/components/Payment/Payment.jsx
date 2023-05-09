import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosClient from "../../config/axiosClient";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH);
const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

function Payment() {
  const handleClickPremium = async (e) => {
    //api here
    try {
      const { data } = await axiosClient.post(
        "/api/payment/checkout",
        {},
        config
      );
      if (data?.url) {
        return (window.location = data.url);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto p-6  border border-gray-200 rounded-lg shadow bg-slate-200">
        <h5 className="mb-2 text-2xl font-bold tracking-tighter text-gray-900">
          Obtener una cuenta premium en{" "}
          <span className="font-extrabold text-3xl hover:text-blue-600 cursor-pointer text-blue-800 transition-colors">
            ProTaskManagment
          </span>
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          - Crear mas de 3 proyectos en el sistema.
        </p>
        <p className="mb-3 font-normal text-gray-700">
          - Tareas sin limites por proyecto
        </p>
        <button
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 border-gray-800 hover:scale-110 transition-all"
          onClick={handleClickPremium}
        >
          Adquirir Premium
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}

export default Payment;
