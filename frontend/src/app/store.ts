import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import propertyReducer from "../features/property/propertySlice";
import investorReducer from "../features/investors/investorSlice";
import contactReducer from "../features/investors/contactSlice";
import blogReducer from "../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    property: propertyReducer,
    investor: investorReducer,
    contact: contactReducer,
    blog: blogReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
