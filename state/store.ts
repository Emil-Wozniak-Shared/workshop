import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {authSlice} from "@/state/features/user/authSlice";
import {postsSlice} from "./features/posts/postSlice";
import {userSlice} from "@/state/features/user/userSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [postsSlice.name]: postsSlice.reducer,
            [userSlice.name]: userSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;
