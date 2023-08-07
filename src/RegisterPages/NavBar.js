
import React, {createContext, useContext, useState, useEffect, useRef } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { EDIT_PROFILE, HOME, LOGIN } from "../constantsFile/routes";
import { SlHome } from "react-icons/sl";
import { FaTelegramPlane } from "react-icons/fa";
import UserContext from "../context/user";
import FirebaseContext from "../context/firebase";
import { SIGN_UP } from "../constantsFile/routes";
import CreatePost from "../components/createPost/CreatePost";
import useUser from "../hooks/useUser";
import "./layouts.css";
import SearchBar from "./SearchBar";
import { MdLogout } from "react-icons/md";
import logo from './Instagram_logo.svg.png'

export const ThemeContext = createContext(null);

const NavBar = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const navbarRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    user: { avatarSrc, username, fullName},
  } = useUser();




  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const isSticky = (e) => {
    const header = navbarRef.current;
    const scrollTop = window.scrollY;
    scrollTop >= 90
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  return (
    <>
      <CreatePost open={open} setOpen={setOpen} />
      <div className="border-b h-20 " ref={navbarRef}>
        <div className="flex items-center h-full justify-between container mx-auto max-w-screen-lg relative">
          <div
            className="navbar-logo cursor-pointer"
            onClick={() => navigate(HOME)}
          >
            <Link to="/"> 
            <img src={logo} className="logo h-9 w-auto object-cover"  alt="" />
            </Link>
          </div>
          <div className="w-60">
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                type="text"
                className="search bg-[#EFEFEF] searchText text-gray-900 outline-none text-sm rounded-sm w-full px-4 py-2"
                placeholder="Search..."
              />
            </div>
            {focused && (
              <div
                className="searchCon absolute top-14 max-h-30 overflow-auto h-40 bg-white border rounded py-3 px-4"
                ref={searchRef} 
              >
                <SearchBar searchInput={search} />
              </div>
            )}
          </div>

          <div>
            <div className="flex">
              
              {user ? (
                <>
                  <div className="navbarIcons mb-2 p-2 mt-6 mr-2 h-90 text-black " >
                    <div className="icon">
                    <Link to="/">
                    <SlHome className="tooltip text-[1.8rem] icon mb-2.5" />
                    </Link>
                    </div>
                    
                  </div>
                
                 
                  <div
                    className=" cursor-pointer flex items-center justify-center "
                    onClick={() => setOpen(true)}
                  >
                    
                    <div className="navbarIcons mt-5 mr-2 text-black">
                      {/* <SquarePlus /> */}
                      <div className="icon">
                      <MdOutlineAddBox className="tooltip text-[1.8rem] icon mb-2.5" />
                      </div>
                    </div>
                  
                  </div>
        

                  <div
                    className="main mt-7 rounded-full border-2 p-0.5 border-red-600 cursor-pointerflex items-center justify-center w-8 h-8 relative select-none"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    <img
                      className=" rounded-full w-full h-full"
                      src={avatarSrc}
                      alt={""}
                    />
                    <div
                      className={
                        !dropdownOpen
                          ? "hidden"
                          : "" +
                            " bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow absolute top-10 right-0"
                      }
                    >
                           <div className="ml-10 items-center px-4 py-2">
                            <div className=" items-center mr-2 logoName">
                            <img
                      className="imgAva rounded-full w-full h-full"
                      src={avatarSrc}
                      alt={""}
                    />
                             
                            </div>
                            <div>
                            <p className="sign userName font-bold text-sm text-black">{ username }</p>
                            </div>
                          </div>
                        
                      <ul className="py-1 navbarCon" aria-labelledby="dropdown">
                        <li
                          className="
                           hover:bg-gray-300 text-gray-900"
                          onClick={() => navigate(`/${username}`)}
                        >
                          <div className="mt-5 border-t flex items-center px-4 py-2">
                           
                            <div className="flex items-center mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                               
                                className="w-8 h-8"
                               
                              >
                                <path
                                
                                 vector-effect="non-scaling-stroke"
                                 stroke="var(--icon-color, #001e00)"
                                     stroke-linecap="round"
                                     stroke-linejoin="round" 
                                     stroke-miterlimit="10"
                                     stroke-width="1.5"
                                 
                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                            <span className=" text-sm text-gray-700 block">
                              Profile
                            </span>
                          </div>
                          
                        </li>
                        <li
                          className="border-t hover:bg-gray-300 text-gray-900"
                          onClick={() => navigate(EDIT_PROFILE)}
                        >
                          <div className="flex items-center px-4 py-2 pr-10">
                            <div className="flex items-center mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                              >
                                <path
                                   vector-effect="non-scaling-stroke"
                                   stroke="var(--icon-color, #001e00)"
                                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                                />
                                <path
                                 vector-effect="non-scaling-stroke"
                                 stroke="var(--icon-color, #001e00)"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" 
                                  stroke-miterlimit="10"
                                  stroke-width="1.5"
                                />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700 block">
                              Settings
                            </span>
                          </div>
                          </li>
                        
                        <li className="border-b border-t hover:bg-gray-300 text-gray-900" onClick={() => firebase.auth().signOut()}>
                          <div className="flex items-center px-3 py-2">
                            <div className="flex items-center ml-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24" 
                                id="IconChangeColor" 
                                height="30" 
                                
                                width="30">
                              <path 
                               vector-effect="non-scaling-stroke"
                               stroke="var(--icon-color, #001e00)"
                               stroke-linecap="round"
                               stroke-linejoin="round" 
                               stroke-miterlimit="10"
                               stroke-width="1.5"
                              d="M5.8 5.8c0-1.7 1.3-3 3-3h8c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3h-8c-1.7 0-3-1.3-3-3m8-6h-10"
                              id="mainIconPathAttribute">

                              </path>
                              </svg>
                              <span className="text-sm hover:bg-gray-300 text-gray-900 block mr-3 ml-3">
                            Log Out
                          </span>
                            </div>
                          
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to={LOGIN}>
                    <button
                      className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                      type="button"
                    >
                      Log In
                    </button>
                  </Link>
                  <Link to={SIGN_UP}>
                    <button
                      className="text-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
