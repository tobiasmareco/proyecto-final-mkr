import React, { useState } from "react";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = () => {
    console.log(password, confirmPassword);
  };
  return (
    <div className="bg-white shadow-xl max-w-md mx-auto py-3 px-5 rounded-sm">
      <h1 className="text-sky-800 font-bold text-3xl uppercase text text-center">
        Change Password
      </h1>
      <form action="" className="" onSubmit={handleSubmit}>
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
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="my-3">
          <label
            htmlFor="confirmPassword"
            className='uppercase text-gray-600 font-bold after:content-["*"] after:text-gray-400 after:ml-1'
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full  p-2 border rounded-xl bg-gray-50"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Continue"
          className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded-md cursor-pointer hover:bg-sky-800 mb-5"
        />
      </form>
    </div>
  );
}

export default ResetPassword;
