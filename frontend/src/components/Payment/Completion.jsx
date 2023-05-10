import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { useEffect } from "react";
import useProjects from "../../hooks/useProjects";
import AlertMsg from "../Alert";
const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

function Completion(props) {
  const navigate = useNavigate();
  const { alert, setAlert } = useProjects();
  const { userId } = useParams();
  useEffect(() => {
    const changeToPremium = async (userId) => {
      try {
        const { data } = await axiosClient.get("/api/payment/premium", config);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setTimeout(() => {
          setAlert({});
          navigate("/projects");
        }, 1500);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
        setTimeout(() => {
          setAlert({});
          navigate("/projects");
        }, 1500);
        // console.log(error.response);
      }
    };
    changeToPremium(userId);
  }, []);

  return <>{alert.msg && <AlertMsg alert={alert} />}</>;
}

export default Completion;
