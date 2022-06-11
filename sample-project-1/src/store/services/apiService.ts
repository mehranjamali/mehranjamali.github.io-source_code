import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<any>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");
