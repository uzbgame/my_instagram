import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import "./auth.css";
import { HOME, SIGN_UP, FORGOTPASSWORD } from "../constantsFile/routes";

const Login = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(HOME);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className=" flex space-x-5 items-center">
        <div className=" flex flex-col">
          <div className="instaConteiner border-[1px] bg-white p-4 mb-5 w-80 rounded">
            <div className="w-full mb-5">
              <img
                src="/images/instatext.png"
                alt="instalogo"
                className="max-w-[9rem] block mx-auto"
              />
            </div>
            <p className="text-center font-bold text-lg text-slate-800">
               Enter the login and password to open Instagram
            </p>

            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-3" method="post">
              <div className="input-group mb-6">
                <input
                  type="text"
                  aria-label="Your email address"
                  placeholder=" "
                  className="text-xs p-4 border-[1px] border-gray-400 outline-none rounded bg-white w-full border-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="name">Email account</label>
              </div>
              <div className="input-group">
        
                <input
                  type="password"
                  aria-label="Your password"
                  placeholder=" "
                  className="text-xs p-3  border-[1px] border-gray-400 outline-none rounded bg-white w-full border-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="name">Password</label>
              </div>
              <div>
                <button
                  disabled={isInvalid}
                  type="submit"
                  className={`login bg-blue-500  mt-3 cursor-pointer text-white rounded-2xl w-full h-8 font-bold ${
                    isInvalid && "opacity-50"
                  }`}
                >
                  Log In
                </button>
              </div>
              <div className="text-center mt-3 ">
                <Link
                  to={FORGOTPASSWORD}
                  className="forgot text-blue-500 text-center w-full text-x font-thin my-3"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
          <div className="">
            <div className="instaFooter flex justify-center items-center flex-col w-full bg-white p-4 rounded">
              <p className="footerDes text-sm">
                Don't have an account?
                <Link to={SIGN_UP} className="font-semibold ml-2 text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
