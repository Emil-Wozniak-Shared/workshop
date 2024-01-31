import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {userSlice} from "@/state/features/user/userSlice";
import {postsSlice} from "./features/posts/postSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            [userSlice.name]: userSlice.reducer,
            [postsSlice.name]: postsSlice.reducer,
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
