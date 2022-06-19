import { createAction } from "@reduxjs/toolkit";
import { apiBodyType } from "../types/type";

export const apiCallBegan = createAction<apiBodyType>("api/callBegan");
