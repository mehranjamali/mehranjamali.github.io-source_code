import authService from "../services/authService";
import { actionType } from "../types/type";
import { userAuthUpdateTokenCommand, userAuthLogoutCommand } from "../slices/user";
import showToast from "../../utiles/toast";

// maybe check user token or other stuff,....
const authMiddleware =
   ({ dispatch, getState }: any) =>
   (next: any) =>
   async (action: actionType<any>) => {
      if (action.payload?.needAuthorization) {
         // from store
         const { accessTokenInStore, lastCheckTime } = getState().user.auth;
         // from service
         const { accessToken, userIsLogin, newToken }: any = await authService.checkToken(
            accessTokenInStore,
            lastCheckTime
         );
         // check response
         if (accessToken && userIsLogin) {
            next(action);
            // write new token in store
            if (newToken) dispatch(userAuthUpdateTokenCommand(accessToken));
         } else {
            dispatch(userAuthLogoutCommand());
            showToast("شما باید وارد حساب کاربری خود شوید", "error", 3000);
         }
      } else return next(action);
   };

export default authMiddleware;
