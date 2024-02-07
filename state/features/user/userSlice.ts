import {createSlice} from "@reduxjs/toolkit";
import {AppState} from '../../store'

// Type for our state
export interface UserState {
    id: number | null
    name?: string | null
    email?: string | null
}

// Initial state
const initialState: UserState = {
    id: null,
};

// Actual Slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Action to set the authentication status
        setUserState(state, action) {
            if (action.payload !== null) {
                state = {...action.payload}
            } else {
                state = initialState
            }
            state
        },
        getUser(state, action) {
            state
        }
    },
});

export const {setUserState} = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;