import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boards/BoardSlice";
import taskDetailsReducer from "../features/taskDetail/taskDetailsSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
    taskDetails: taskDetailsReducer,
  },
});

export default store;
