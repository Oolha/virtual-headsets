import { configureStore } from "@reduxjs/toolkit";
import virtualHeadsetsReducer from "./virtual-headsets/slice";

export default configureStore({
  reducer: { virtualHeadsets: virtualHeadsetsReducer },
});
