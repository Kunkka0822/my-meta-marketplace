import {
    ActionReducerMapBuilder,
    AsyncThunk,
    SerializedError,
} from '@reduxjs/toolkit';

export type AsyncState<T = any> = {
    data: T | null;
    loading: boolean;
    initial: boolean;
    error: Error | SerializedError | string | null;
};

const initialAsyncState = () => ({
    loading: false,
    initial: true,
    data: null,
    error: null,
});

const loadingAsyncState = <T>(preserve: Partial<AsyncState<T>>) => ({
    loading: true,
    initial: false,
    data: null,
    error: null,
    ...preserve,
});

const errorAsyncState = <T>(
    e: Error | SerializedError | string,
    preserve: Partial<AsyncState<T>> | null = null
) => ({
    loading: false,
    initial: false,
    data: null,
    error: e,
    ...preserve,
});

const successAsyncState = <T>(payload: T) => ({
    loading: false,
    initial: false,
    data: payload,
    error: null,
});

export const reducerUtils = {
    initial: initialAsyncState,
    loading: loadingAsyncState,
    error: errorAsyncState,
    success: successAsyncState,
};

export const addAsyncCases = <
    State = Record<string, any>,
    Data = any,
    Payload = any
>(
    builder: ActionReducerMapBuilder<State>,
    asyncAction: AsyncThunk<Data, Payload, {}>,
    responseKey: string = ''
) => {
    builder.addCase(
        asyncAction.fulfilled,
        (state: Record<string, any>, { payload }) => {
            const newState = reducerUtils.success(payload);
            if (responseKey) {
                state[responseKey] = newState;
            } else {
                return newState as any as State;
            }
        }
    );
    builder.addCase(asyncAction.pending, (state: Record<string, any>) => {
        if (responseKey) {
            state[responseKey] = reducerUtils.loading({
                initial: state[responseKey].initial,
                data: state[responseKey].data,
            });
        } else {
            return reducerUtils.loading({
                initial: state.initial,
                data: state.data,
            }) as any as State;
        }
    });
    builder.addCase(
        asyncAction.rejected,
        (state: Record<string, any>, action) => {
            const newState = reducerUtils.error(action.error);
            if (responseKey) {
                state[responseKey] = newState;
            } else {
                return newState as any as State;
            }
        }
    );
};
