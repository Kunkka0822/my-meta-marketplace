import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store"
import { getWallet } from "../store/reducers/wallet";
import { walletSelector } from "../store/selectors/wallet";

const useAppInit = (): [boolean, () => void] => {
    const dispatch = useAppDispatch();
    const { initial: walletInitial } = useAppSelector(walletSelector);

    const init = useCallback(() => {
        if (walletInitial) {
            dispatch(getWallet());
        }
    }, [dispatch, walletInitial])
    return [!walletInitial, init];
}
export default useAppInit;