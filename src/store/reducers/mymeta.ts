import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export type MyMetaState = {
    mmcBalance: number | string;
}

export const mymetaSlice = createSlice<MyMetaState, SliceCaseReducers<MyMetaState>>({
    name: 'mymeta',
    initialState: { mmcBalance: 0 },
    reducers: {
        setMMCBalance(state: MyMetaState, action: PayloadAction<number | string>) {
            return { ...state, mmcBalance: action.payload}
        }
    }
})
const mymetaReducer = mymetaSlice.reducer;
export default mymetaReducer;
export const { setMMCBalance } = mymetaSlice.actions;