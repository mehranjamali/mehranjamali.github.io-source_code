export type IAction<P> = {
   type: string;
   payload: P;
};

export type IState<D> = {
   data: D[];
   loading: boolean;
   lastFetch: any;
   error: string;
};

export type IApiBody = {
   onStart?: string;
   onSuccess: string;
   onError: string;
   method: string;
   data?: any;
   url: string;
};
