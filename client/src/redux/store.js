import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { errorsSlice } from "./reducers/errors";
import { usersSlice } from "./reducers/users";
import { tasksSlice } from "./reducers/tasks";
import { commonSlice } from "./reducers/commons";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    tasks: tasksSlice.reducer,
    errors: errorsSlice.reducer,
    commons: commonSlice.reducer
  },
});
