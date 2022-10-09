/* eslint-disable import/no-anonymous-default-export */
import httpService from "./httpService";
import moment from "moment";

const checkToken = async (accessToken: string, lastCheckTime: any) => {
   // - access token is empty
   if (!accessToken) {
      return await getAccessToken();
   }
   // + access token isn't empty
   else {
      const timeDiff = moment().diff(lastCheckTime, "minutes");
      // + if time of last check access token Less than 30 minutes
      if (timeDiff < 30) {
         return Promise.resolve({ accessToken, newToken: false, userIsLogin: true });
      }
      // - if time of last check access token More than 30 minutes
      else {
         // Check Validation Of Access Token
         //  const accessTokenIsValid = await httpService.post("checkValidationOfAccessToken", accessToken);
         // -----> response from server (fake) => accessTokenIsValid
         const accessTokenIsValid = { status: 200 };
         if (accessTokenIsValid.status === 200)
            return Promise.resolve({ accessToken, newToken: false, userIsLogin: true });
         else return await getAccessToken();
      }
   }
};

const getAccessToken = async () => {
   const refreshToken = localStorage.getItem("refreshToken");
   // -----> Get Access Token From Server Using Refresh Token
   // -----> const getAccessTokenResponse = await httpService.post("getAccessTokenFromServerUsingRefreshToken", refreshToken);
   // -----> response from server (fake) => getAccessTokenResponse
   let getAccessTokenResponse =
      refreshToken === "weHaveValidRefreshToken"
         ? { status: 200, data: { accessToken: "weHaveValidAccessToken", refreshToken } }
         : { status: 500, data: { accessToken: "", refreshToken } };
   // + response was successfull
   if (getAccessTokenResponse.status === 200 && getAccessTokenResponse.data.accessToken) {
      return Promise.resolve({
         accessToken: getAccessTokenResponse.data.accessToken,
         newToken: true,
         userIsLogin: true,
      });
   }
   // - response wasn't successfull
   else {
      return Promise.resolve({ accessToken: "", newToken: false, userIsLogin: false });
   }
};

export default { checkToken };
