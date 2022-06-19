import httpService from "../services/httpService";
import _ from "lodash";

// maybe check user token or other stuff,....
const authMiddleware =
   ({ dispath, getState }: any) =>
   (next: any) =>
   async (action: any) => {
      // if (_.has(action.payload, 'needAuthorization')) {
      if (action.payload?.needAuthorization) {
         console.log("need authorization");
      } else {
         console.log("don't need authorization");
      }
      next(action);
   };

export default authMiddleware;
