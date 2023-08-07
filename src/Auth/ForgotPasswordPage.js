import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import Login from "./LogInPage";
import { LOGIN } from "../constantsFile/routes";
import './auth.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
  };

  const isInvalid = email.trim() === "";

  useEffect(() => {
    document.title = "Forgot Password - Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className="flex flex-col">
        <div className="instaConteiner border-[1px] bg-white p-4 w-80 p-3 border-gray-400">
          <div className="w-full">
            <img
              src="/images/instatext.png"
              className="mt-2 max-w-[8rem] mx-auto my-2"
              alt="instagram"
            />
          </div>
          <p className="text-center font-bold  text-lg text-slate-800">
            Update password
          </p>
          <div className="flex items-center my-3 w-full">
            <div className="border-b-[1px] border-black h-0 w-full"></div>
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div className="input-group mb-6">
             
              <input
                type="text"
                aria-label="c"
                placeholder=" "
                className="text-xs p-3 outline-none border-[1px] rounded bg-white w-full border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="name">Enter your email address</label>
            </div>
            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-500  mt-4 cursor-pointer text-white rounded-2xl w-full h-8 font-bold ${
                  isInvalid && "opacity-50"
                }`}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="instaFooter mt-4 flex bg-[#FAFAFA] justify-center items-center flex-col border-t-0 w-full bg-white p-4 border-[1px] border-gray-400">
          <p className="text-sm">
            <Link to={LOGIN} className="text-blue-inst font-bold text-blue">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
