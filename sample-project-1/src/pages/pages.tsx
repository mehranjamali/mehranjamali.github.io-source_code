import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./home/home";
import LoginPage from "./login/login";
import NotFoundPage from "./notFound/notFound";
import Author from "./author/author";
import SavedPosts from "./savedPosts/savedPosts";
import ProtectedRoute from "../components/protectedRoute/protectedRoute";

function Pages() {
   return (
      <div
         data-name="pages-routes"
         className="min-h-screen h-full min-w-full pt-18 pb-5 text-lg flex flex-row justify-center items-center
       bg-gray-50 text-slate-800 dark:bg-slate-700 dark:text-white transition-03"
      >
         <div
            data-name="pages-routes-container"
            className="w-full h-full xs:max-w-xl sm:max-w-xl 
                       md:max-w-3xl lg:max-w-5xl xl:max-w-6xl"
         >
            <Routes>
               <Route index element={<HomePage />} />
               <Route path="home" element={<Navigate to="/" />} />
               <Route element={<ProtectedRoute />}>
                  <Route path="Author" element={<Author />} />
                  <Route path="saved-posts" element={<SavedPosts />} />
               </Route>
               <Route path="login" element={<LoginPage />} />
               <Route path="register" element={<LoginPage />} />
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </div>
      </div>
   );
}

export default Pages;
