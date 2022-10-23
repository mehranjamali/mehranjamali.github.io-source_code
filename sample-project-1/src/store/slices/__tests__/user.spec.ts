import { describe, test, expect, beforeEach } from "@jest/globals";
import { testStore } from "../../configureStore";
import {
   userAuthCheckTokenCommand,
   userAuthLoginCommand,
   userAuthLogoutCommand,
   loginFormInputType,
   userAuthType,
   userAuthReadStateSelector,
} from "../user";

describe("userSlice", () => {
   let store: any;

   beforeEach(() => {
      store = testStore();
   });

   const createUserState = (): { user: { auth: userAuthType } } => ({
      user: {
         auth: {
            id: 1,
            email: "mehranjamali115",
            lastCheckTime: Date.now(),
            accessToken: "weHaveAccessToken",
            firstName: "مهران",
            lastName: "جمالی",
            error: "",
         },
      },
   });

   const userSlice = () => store.getState().user.auth;

   // login/logout
   describe("login/logout", () => {
      // login 200
      test("should be recive token from the server if request was successfull", async () => {
         const loginFormData: loginFormInputType = {
            userNameForLogin: "mehranjamali115@gmail.com",
            passwordForLogin: "1234",
         };

         await store.dispatch(userAuthLoginCommand(loginFormData));

         expect(userSlice().accessToken.length).not.toBe(0);
      });
      // login 500
      test("should not be recive token from the server if request was not successfull", async () => {
         const loginFormData: loginFormInputType = {
            userNameForLogin: "",
            passwordForLogin: "1234",
         };

         await store.dispatch(userAuthLoginCommand(loginFormData));

         expect(userSlice().accessToken.length).toBe(0);
      });
      // logout
      test("1.first we must login then 2.logout and should be clear token if logout command called", async () => {
         const loginFormData: loginFormInputType = {
            userNameForLogin: "mehranjamali115@gmail.com",
            passwordForLogin: "1234",
         };

         await store.dispatch(userAuthLoginCommand(loginFormData));
         await store.dispatch(userAuthLogoutCommand());

         expect(userSlice().accessToken.length).toBe(0);
      });
   });

   // check token user is not login
   test("initial check token, user is not login", () => {
      store.dispatch(userAuthCheckTokenCommand());

      expect(userSlice().accessToken.length).toBe(0);
   });

   // check token after user is login
   test("initial check token, after user is login", async () => {
      const loginFormData: loginFormInputType = {
         userNameForLogin: "mehranjamali115@gmail.com",
         passwordForLogin: "1234",
      };

      await store.dispatch(userAuthLoginCommand(loginFormData));
      await store.dispatch(userAuthCheckTokenCommand());
      await store.dispatch(userAuthCheckTokenCommand());

      expect(userSlice().accessToken.length).not.toBe(0);
   });

   // selectors
   describe("user selector", () => {
      test("select user state", () => {
         const state = createUserState();

         const result = userAuthReadStateSelector(state);

         expect(result).toEqual(state.user.auth);
      });
   });
});
