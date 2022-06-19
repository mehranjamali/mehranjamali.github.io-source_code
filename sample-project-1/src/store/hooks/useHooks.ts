import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../configureStore";

export const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector;
export const useDispatchHook = () => useDispatch<AppDispatch>();
