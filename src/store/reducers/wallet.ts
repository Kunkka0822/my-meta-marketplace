import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncState, reducerUtils, addAsyncCases } from "../../modules/lib/reducerUtils";
import { getCurrentWalletConnected } from "../../modules/web3/wallet";
import { WalletAddress } from "../../types/models/wallet";


export type WalletAddressState = AsyncState<WalletAddress>;

const initialState = reducerUtils.initial() as WalletAddressState;

export const getWallet = createAsyncThunk<any, void>(
    'wallet/address',
    getCurrentWalletConnected
);

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletAddress(state: WalletAddressState, action: PayloadAction<WalletAddress>) {
            return { ...state, data: action.payload}
        },
        setWalletLoading(state: WalletAddressState, action: PayloadAction<boolean>) {
            return { ...state, loading: action.payload}
        }
    },
    extraReducers: (builder) => {
        addAsyncCases(builder, getWallet)
    },
})

const walletReducer = walletSlice.reducer;
export default walletReducer;

export const { setWalletAddress, setWalletLoading } = walletSlice.actions;