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
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set the authentication status
        setAuthState(state, action) {
            state = action.payload
        },
    },
});

export const {setAuthState} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;
export default authSlice.reducer;