import {createSlice} from "@reduxjs/toolkit";
import {AppState} from '../../store'

// Type for our state
export interface AuthState {
    authenticated: boolean;
}

// Initial state
const initialState: AuthState = {
    authenticated: false,
};

// Actual Slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Action to set the authentication status
        setAuthenticated(state, action) {
            state.authenticated = action.payload;
        },
    },
});

export const {setAuthenticated} = userSlice.actions;

export const selectAuthState = (state: AppState) => state.user.authenticated;

export default userSlice.reducer;