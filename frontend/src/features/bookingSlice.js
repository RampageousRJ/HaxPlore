import { createSlice } from '@reduxjs/toolkit'

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookingDetails: null,
        error: null,
        loading: false,
    },
    reducers: {
        bookingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        bookingDetailsUpdate: (state, action) => {
            state.loading = false
            state.error = false
            state.bookingDetails = action.payload
        },
        bookingSuccess: (state) => {
            state.bookingDetails = null;
            state.loading = false
            state.error = false
        },
        bookingFailure: (state) => {
            state.loading = false
            state.error = true
        },
    }
})

// Action creators are generated for each case reducer function
export const { bookingDetailsUpdate, bookingFailure, bookingStart, bookingSuccess } = bookingSlice.actions

export default bookingSlice.reducer