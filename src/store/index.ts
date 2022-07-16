import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import parcelReducer from "./reducers/parcel";
import sessionReducer from "./reducers/session";

const combinedReducers = combineReducers({
    session: sessionReducer,
    parcel: parcelReducer,
})
const store = configureStore({
    reducer: (state, action) => {
        if (action.type === 'reset') {
            state = undefined;
        }
        return combinedReducers(state, action);
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;