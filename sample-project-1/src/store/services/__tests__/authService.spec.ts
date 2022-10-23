import { describe, test, expect } from "@jest/globals";
import authService from "../../services/authService";

describe("authService", () => {
   describe("if access token is not avalible", () => {
      test("check token service if refresh token is avalible", async () => {
         localStorage.setItem("refreshToken", "weHaveValidRefreshToken");
         const expected = {
            accessToken: "weHaveValidAccessToken",
            newToken: true,
            userIsLogin: true,
         };

         const result = await authService.checkToken("", null);
         localStorage.setItem("refreshToken", "");

         expect(result).toEqual(expected);
      });
      test("check token service if refresh token is not avalible", async () => {
         localStorage.setItem("refreshToken", "");
         const expected = { accessToken: "", newToken: false, userIsLogin: false };

         const result = await authService.checkToken("", null);

         expect(result).toEqual(expected);
      });
   });
   describe("if access token is avalible", () => {
      test("if last check time is less then 30 minutes then should not be get new token from the server", async () => {
         const lastCheckTime = Date.now();
         const expected = { accessToken: "weHaveValidAccessToken", newToken: false, userIsLogin: true };

         const result = await authService.checkToken("weHaveValidAccessToken", lastCheckTime);

         expect(result).toEqual(expected);
      });
      test("if last check time is greater then 30 minutes then should be get new token from the server", async () => {
         const date = new Date();
         const lastCheckTime = date.setDate(date.getDate() - 1);
         const expected = { accessToken: "weHaveValidAccessToken", newToken: false, userIsLogin: true };

         const result = await authService.checkToken("weHaveValidAccessToken", lastCheckTime);

         expect(result).toEqual(expected);
      });
   });
});
