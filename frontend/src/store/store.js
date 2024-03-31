import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bookingReducer from "../features/bookingSlice.js"
import userReducer from "../features/userSlice.js"
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/lib/persistReducer'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
    user: userReducer,
    bookings: bookingReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: false,
        })
    )
})

export const persistor=persistStore(store)