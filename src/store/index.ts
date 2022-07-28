import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import mymetaReducer from "./reducers/mymeta";
import sessionReducer from "./reducers/session";
// import walletReducer from "./reducers/wallet";

const combinedReducers = combineReducers({
    session: sessionReducer,
    // wallet: walletReducer,
    mymeta: mymetaReducer
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