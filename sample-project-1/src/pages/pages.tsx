import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./home/home";
import LoginPage from "./login/login";
import RegisterPage from "./register/register";
import UsersPage from "./users/users";
import UserPage from "./user/user";
import ProfilePage from "./profile/profile";
import NotFoundPage from "./notFound/notFound";

function Pages() {
   return (
      <Routes>
         <Route index element={<HomePage />} />
         <Route path="home" element={<HomePage />} />
         <Route path="login" element={<LoginPage />} />
         <Route path="register" element={<RegisterPage />} />
         <Route path="users/:id" element={<UserPage />} />
         <Route path="users" element={<UsersPage />} />
         <Route path="profile" element={<ProfilePage />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}

export default Pages;
