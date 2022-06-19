export type actionType<P> = {
   type: string;
   payload: P;
};

export type stateType<D> = {
   data: D;
   loading: boolean;
   // lastFetch: any;
   error: string;
};

export type apiBodyType = {
   onStart?: string;
   onSuccess: string;
   onError: string;
   method: string;
   data?: any;
   url: string;
   needAuthorization?: boolean;
};
