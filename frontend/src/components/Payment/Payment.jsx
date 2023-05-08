import { useEffect } from "react";
import axiosClient from "../../config/axiosClient";
import useProjects from "../../hooks/useProjects";
import AlertMsg from "../Alert";

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

function Payment() {
  const { alert, setAlert } = useProjects();
  useEffect(() => {
    const goToPremium = async () => {
      try {
        const { data } = await axiosClient.get("/api/payment/premium", config);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setTimeout(() => {
          setAlert({});
        }, 3000);
      } catch (error) {
        console.log(error.response);
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
        setTimeout(() => {
          setAlert({});
        }, 3000);
      }
    };
    goToPremium();
  }, []);
  return (
    <>
      <div className="mx-auto max-w-md justify-center items-center shadow-lg bg-sky-800 text-white px-5 py-10">
        <h1 className="text-center font-bold text-2xl mb-5">
          Obtener la Cuenta premium
        </h1>
        {alert.msg && <AlertMsg alert={alert} />}
      </div>
    </>
  );
}

export default Payment;
