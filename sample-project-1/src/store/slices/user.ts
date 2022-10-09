import { actionType } from "./../types/type";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import showToast from "../../utiles/toast";

// type
type userAuthType = {
   id?: number;
   firstName?: string;
   lastName?: string;
   email?: string;
   accessToken?: string;
   lastCheckTime?: any;
   error?: string;
};

type loginFormInputType = {
   userNameForLogin: string;
   passwordForLogin: string;
};

// slice
const userAuthSlice = createSlice({
   name: "userAuth",
   initialState: {
      accessToken: "",
      lastCheckTime: null,
      firstName: "",
      lastName: "",
      id: 0,
      email: "",
      error: "",
   } as userAuthType,
   reducers: {
      userAuthLogin: (state: userAuthType, action: actionType<userAuthType>) => {
         localStorage.setItem("refreshToken", "weHaveValidRefreshToken");
         window.location.replace("http://localhost:3000/");
         return { error: "", ...action.payload };
      },
      userAuthLoginError: (state: userAuthType, action: actionType<string>) => {
         state.error = action.payload;
         state.accessToken = "";
         state.lastCheckTime = null;
         showToast(action.payload, "error");
      },
      userAuthLogout: (state: userAuthType, action: actionType<undefined>) => {
         state.accessToken = "";
         state.lastCheckTime = null;
         state.error = "";
         localStorage.setItem("refreshToken", "");
      },
      userAuthUpdateToken: (state: userAuthType, action: actionType<userAuthType>) => {
         return { error: "", ...action.payload };
      },
      userAuthCheckToken: (state: userAuthType, action: actionType<{ needAuthorization: boolean }>) => {
         // do nothing ...
      },
   },
});

// commands
// --login command
const userAuthLoginCommand = (formData: loginFormInputType) => (dispatch: any) => {
   const loginObj: userAuthType = {
      id: 1,
      email: formData.userNameForLogin,
      lastCheckTime: Date.now(),
      accessToken: "weHaveAccessToken",
      firstName: "مهران",
      lastName: "جمالی",
      error: "",
   };
   // dispatch(apiCallBegan({onSuccess, onError, onStart}))
   if (loginObj.email === "mehranjamali115@gmail.com") return dispatch(userAuthSlice.actions.userAuthLogin(loginObj));
   else return dispatch(userAuthSlice.actions.userAuthLoginError("کاربری با این مشخصات وجود ندارد."));
};

// --logout command
const userAuthLogoutCommand = () => {
   return userAuthSlice.actions.userAuthLogout();
};

// --write token command
const userAuthUpdateTokenCommand = (token: string) => {
   const loginObj: userAuthType = {
      id: 1,
      email: "mehranjamali115@gmail.com",
      lastCheckTime: Date.now(),
      accessToken: token,
      firstName: "مهران",
      lastName: "جمالی",
   };
   return userAuthSlice.actions.userAuthUpdateToken(loginObj);
};

// --check token command
const userAuthCheckTokenCommand = () => {
   return userAuthSlice.actions.userAuthCheckToken({ needAuthorization: true });
};

// selectors
// --read state selector
const userAuthReadStateSelector = createSelector(
   (state: any) => state.user.auth,
   (auth: any) => auth
);

// exports
// --type
export type { userAuthType, loginFormInputType };
// --command
export { userAuthLoginCommand, userAuthUpdateTokenCommand, userAuthLogoutCommand, userAuthCheckTokenCommand };
// --selector
export { userAuthReadStateSelector };
// --slice
export default userAuthSlice.reducer;
