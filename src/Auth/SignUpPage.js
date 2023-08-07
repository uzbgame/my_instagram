import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import "./auth.css";
import { HOME, LOGIN, FORGOTPASSWORD } from "../constantsFile/routes";
import { doesUsernameExist } from "../Services/firebase";

const SignUp = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists.length) {
        try {
          const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await userResult.user.updateProfile({
            displayName: username,
          });

          await firebase.firestore().collection("users").add({
            userId: userResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
            aboutMe: "",
            avatarSrc:
              "",
          });

          navigate(HOME);
        } catch (error) {
          setFullName("");
          setEmail("");
          setPassword("");
          setError(error.message);
        }
      } else {
        setError("A user with this name has already been created!");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className="flex flex-col">
        <div className="instaSignUp border-[1px] bg-white p-4 mb-5 w-[25rem] border-gray-300">
          <div className="w-full">
            <img
              src="/images/instatext.png"
              className="mt-2 mx-auto my-2 w-full max-w-[8rem] object-cover"
              alt="instagram"
            />
          </div>
          <p className="text-center mb-3 font-bold  text-lg text-slate-800">
            Sign up to open Instagram
          </p>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div className="input-group">
             
              <input
                type="text"
                aria-label="Enter your email username"
                placeholder=" "
                className="signUpInput text-xs p-3 border-[1px] rounded bg-white w-full border-black outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
               <label for="name">Your Username</label>
            </div>
            <div className="input-group">
        
              <input
                type="text"
                aria-label=" Full name"
                placeholder=" "
                className=" signUpInput text-xs p-3 border-[1px] rounded bg-white w-full border-black outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
               <label for="name">Your Full Name</label>
            </div>
            <div className="input-group">   
              <input
                type="text"
                aria-label="Your email address"
                placeholder=" "
                className="signUpInput text-xs p-3  border-[1px] rounded bg-white w-full border-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="name">Your email address</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                aria-label="Enter your password"
                placeholder=" "
                className="signUpInput text-xs p-3 border-[1px] rounded bg-white w-full border-black outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="name">Enter your password</label>
            </div>
            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`login bg-blue-500  mt-4 cursor-pointer text-white rounded-2xl w-full h-8 font-bold ${
                  isInvalid && "opacity-50"
                }`}
              >
                Sign up
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
        <div className="instaFooter flex justify-center items-center flex-col w-full bg-white p-4 border-gray-300 border-[1px]">
          <p className="text-sm">
            Have an account?
            <Link to={LOGIN} className="font-semibold ml-1 text-blue-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
