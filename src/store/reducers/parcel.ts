import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import parcelApi from "../../modules/api/parcel";
import { addAsyncCases, AsyncState, reducerUtils } from "../../modules/lib/reducerUtils";
import { PageParam, ID } from "../../types/common";
import { ParcelData } from "../../types/models/parcel";

export type ParcelState = AsyncState<ParcelData | Array<ParcelData>>;

const initialState = reducerUtils.initial() as ParcelState;

export const getListParcels = createAsyncThunk<Array<ParcelData>, PageParam>(
    'parcel/list',
    parcelApi.getListParcels
)

export const getParcelById = createAsyncThunk<ParcelData, ID>(
    'parcel/retrieve',
    parcelApi.getParcelById
)

export const parcelSlice = createSlice({
    name: 'parcel',
    initialState,
    reducers: {
        reset() {
            return { ... initialState };
        }
    },
    extraReducers: (builder) => {
        addAsyncCases(builder, getListParcels);
        addAsyncCases(builder, getParcelById);
    },
});
const parcelReducer = parcelSlice.reducer;
export default parcelReducer;

export const { reset } = parcelSlice.actions;