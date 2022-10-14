/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

// react-router-dom
import { Navigate, Outlet } from "react-router-dom";

// toast
import showToast from "../../utiles/toast";

// -- custom hooks
import { RootState, useSelectorHook } from "../../store/hooks/useHooks";
import { userAuthReadStateSelector, userAuthType } from "../../store/slices/user";

function ProtectedRoute() {
   useEffect(() => {
      !userState.accessToken && showToast("برای دسترسی به این بخش ابتدا شما باید لاگین کنید.", "error", 4000);
   }, []);
   // user state
   const userState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));

   return userState.accessToken ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
