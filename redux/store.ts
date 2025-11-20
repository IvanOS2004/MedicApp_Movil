import { configureStore } from "@reduxjs/toolkit";
import doctorRegisterReducer from "./slices/doctorSlice";

export const store = configureStore({
  reducer: {
    doctorRegister: doctorRegisterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
