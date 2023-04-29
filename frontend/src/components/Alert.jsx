import React from "react";
// import { toast } from "react-toastify";
function AlertMsg({ alert }) {
  return (
    <div
      className={`${
        alert.error ? "bg-red-500/80 text-yellow-50" : "bg-sky-800 text-white"
      } max-w-md mx-auto mb-4 px-4 py-2 rounded-md shadow-sm border-black font-bold text-center`}
    >
      {alert.msg}
      {/* {toast.error(alert.msg) || "errror"} */}
    </div>
  );
}

export default AlertMsg;
