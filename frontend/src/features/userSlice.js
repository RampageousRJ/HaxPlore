import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: null,
        error: null,
        loading: false,
    },
    reducers: {
        reload: (state) => {
            state.userDetails = null,
            state.loading = false,
            state.error = null
        },
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess:(state, action) => {
            state.userDetails=action.payload;
            state.loading=false
            state.error=false
        },
        signInFailure: (state) => {
            state.loading=false
            state.error=true
        },
        signOutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signOutSuccess:(state) => {
            state.error=false
            state.userDetails=null
            state.loading=false
        },
        signOutFailure: (state) => {
            state.error=true
            state.loading=false
        },
    }
})

// Action creators are generated for each case reducer function
export const { reload,signInFailure,signInStart,signInSuccess,signOutFailure,signOutStart,signOutSuccess } = userSlice.actions

export default userSlice.reducer