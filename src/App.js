import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import * as ROUTE from "./constantsFile/routes";
import Layout from "./RegisterPages/Layout.js";
import ProtectedRoute from "./FileHelpers/LoginNavigate";
import SettingUser from "./SettingsUserProfile/SettingUser";
import IsUserLoggedIn from "./FileHelpers/NavigateHome";
import useAuthListener from './hooks/useAuthListener';
import UserContext from "./context/user";
import ReactLoading from 'react-loading';




const LogIn = React.lazy(() => import ("./Auth/LogInPage.js"));
const ForgotPasswordPage = React.lazy(() => import ("./Auth/ForgotPasswordPage"));
const SignUp = React.lazy(() => import ("./Auth/SignUpPage.js"));
const UserPage = React.lazy(() => import ("./pages/UserPage/UserPage"));
const HomePage = React.lazy(() => import ("./pages/HomePage/HomePage"));


function App() {
  const { user } = useAuthListener();


  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <React.Suspense fallback={(
          <div className="flex items-center justify-center h-screen">    <ReactLoading type={"spin"} color={"#000"} height={'5%'} width={'5%'} />  </div>
        )}>
          <Routes>
            {/* <Route> */}
             {/* Layout */}
            <Route
              path={ROUTE.HOME}
              element={
                <ProtectedRoute user={user}> 
  
                <Layout/> </ProtectedRoute>
                 // </Layout> //
              }
            >
              {/* HomePage */}
              <Route index element={<HomePage/>}/>
               {/* </HomePage  */}
               {/* <UserPage> */}
              <Route path={ROUTE.PROFILE} element={<UserPage/>} /> 
                {/* </UserPage> */}
                {/* <SettingUser> */}
              <Route path={ROUTE.EDIT_PROFILE} element={<SettingUser/>} />
                {/* </SettingUser> */}
              </Route>
              {/* </Route>  */}
            <Route
              path={ROUTE.LOGIN}
              element={
                <IsUserLoggedIn user={user}> 
                 {/* LogIn */}
                 <LogIn/>  </IsUserLoggedIn>
                 // </LogIn> //
              }
            />
            <Route
              path={ROUTE.FORGOTPASSWORD}
              element={
                <IsUserLoggedIn user={user}>  
                {/* ForgotPasswordPage */}
                <ForgotPasswordPage/>  </IsUserLoggedIn>
                // </ForgotPasswordPage> //
                }
            />
            <Route
              path={ROUTE.SIGN_UP}
              element={
                <IsUserLoggedIn> 
                {/* SignUp */}
                <SignUp/>  </IsUserLoggedIn>
                // SignUp //
              }
            />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
