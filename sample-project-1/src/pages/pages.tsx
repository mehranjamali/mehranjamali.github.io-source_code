import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./home/home";
import LoginPage from "./login/login";
import RegisterPage from "./register/register";
import UsersPage from "./users/users";
import UserPage from "./user/user";
import ProfilePage from "./profile/profile";
import NotFoundPage from "./notFound/notFound";

function Pages() {
   return (
      <div
         className="
      min-h-screen min-w-full pt-20 pb-5 font-bold text-lg
      flex flex-row justify-center items-center
      bg-gray-100 text-slate-800 
      dark:bg-slate-700 dark:text-white
      "
      >
         <div className="w-full xs:max-w-xl sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
            <Routes>
               <Route index element={<HomePage />} />
               <Route path="home" element={<Navigate to="/" />} />
               <Route path="login" element={<LoginPage />} />
               <Route path="register" element={<RegisterPage />} />
               <Route path="users/:id" element={<UserPage />} />
               <Route path="users" element={<UsersPage />} />
               <Route path="profile" element={<ProfilePage />} />
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </div>
      </div>
   );
}

export default Pages;
