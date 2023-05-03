import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import ResetPassword from "./ResetPassword";
import AlertMsg from "../../components/Alert";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({});
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    if (
      [
        name.trim(),
        email.trim(),
        password.trim(),
        repeatPassword.trim(),
      ].includes("")
    ) {
      return setError({
        error: true,
        msg: "Complete los campos obligatorios.",
      });
    }
    if (!(password == repeatPassword)) {
      return setError({
        error: true,
        msg: "Las contrasenas no coinciden.",
      });
    }
    try {
      const { data } = await axiosClient.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log(data);
      setError({ msg: data?.msg, error: false });
    } catch (error) {
      console.log(error.response);
      const { response } = error;
      setError({
        msg: response.data.errors
          ? response.data.errors.msg
          : response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = error;
  return (
    <>
      {msg && <AlertMsg alert={error} />}
      <div className="bg-white shadow-xl max-w-md mx-auto py-3 px-5 rounded-sm">
        <h1 className="text-sky-800 font-bold text-3xl uppercase text text-center mb-2">
          Create account
        </h1>
        <form action="" className="" onSubmit={onSubmitRegister}>
          <div className="my-3">
            <label
              htmlFor="name"
              className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'
            >
              Name
            </label>
            <input
              type="text"
              className="w-full  p-2 border rounded-xl bg-gray-50"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="email"
              className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'
            >
              Email
            </label>
            <input
              type="text"
              className="w-full  p-2 border rounded-xl bg-gray-50"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="password"
              className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'
            >
              Password
            </label>
            <input
              type="password"
              className="w-full  p-2 border rounded-xl bg-gray-50"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="repeatPassword"
              className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'
            >
              Repeat Password
            </label>
            <input
              type="password"
              className="w-full  p-2 border rounded-xl bg-gray-50"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded-md cursor-pointer hover:bg-sky-800 mb-5"
          />
        </form>
        <div className="lg:flex lg:justify-between space-y-1 md:space-y-0">
          <Link
            to={"/forgot-password"}
            className="block text-center uppercase text-sm text-gray-400 hover:text-gray-600"
          >
            I Forgot my password.
          </Link>
          <Link
            to={"/"}
            className="block text-center uppercase text-sm text-gray-400 hover:text-gray-600"
          >
            Login.
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
