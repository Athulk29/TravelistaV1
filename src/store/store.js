
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./slices/user-slice";
import itinerarySlice from "./slices/itinerary-slice";


const userPersistConfig = {
    key: "user",
    storage,
    blacklist: ["status", "error"],
};

const itineraryPersistConfig = {
    key: "itinerary",
    storage,
    whitelist: ["itineraryData", "flights", "hotels", "weather"],
};

//? ---- Combined reducer --------------
const appReducer = combineReducers({
    user: persistReducer(userPersistConfig, userSlice),
    itinerary: persistReducer(itineraryPersistConfig, itinerarySlice),
});

//?----- Root reducer with logout handling
const rootReducer = (state, action) => {
    if (action.type === "user/logout/fulfilled") {
        //? Clear redux state while keeping redux-persist from restoring old data
        state = {
            user: undefined,
            itinerary: undefined,
        };
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
