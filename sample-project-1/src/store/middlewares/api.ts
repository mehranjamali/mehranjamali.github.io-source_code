import httpService from "../services/httpService";
import { apiCallBegan } from "../services/apiService";
// import apiServiceType from "../services/apiService";
const apiMiddleware =
   ({ dispatch, getState }: any) =>
   (next: any) =>
   async (action: any) => {
      // console.log("api middleware called! : ", action.type);
      if (action.type !== apiCallBegan.type) return next(action);
      const { url, method, onStart, onSuccess, onError, data } = action.payload;
      next(action);
      if (onStart) dispatch({ type: onStart });
      try {
         const response = await httpService.request({
            baseURL: process.env.REACT_APP_API_URL,
            url,
            // url:'sdsd',
            method,
            data,
         });
         dispatch({ type: onSuccess, payload: response.data });
      } catch ({ message }) {
         dispatch({ type: onError, payload: message });
      }
   };

export default apiMiddleware;
